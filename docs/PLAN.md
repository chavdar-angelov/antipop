# Antipop Phase 1: Architecture Foundation

## Context

The project is a greenfield SvelteKit 5 app. We're building a CQRS-lite + event-driven architecture where all client communication happens over WebSocket. Commands come in via a single HTTP endpoint, get processed by handlers that publish domain events, and results are pushed to clients via WebSocket.

## Key Decisions

| Decision | Choice | Why |
|---|---|---|
| Communication | WebSocket for all responses | Real-time, event-driven architecture. HTTP endpoint is fire-and-forget. |
| Command routing | Single `/command` POST endpoint | All commands dispatched through one gateway. Returns 200 (accepted) or 400 (unknown command). |
| MongoDB driver | Native `mongodb` (not Mongoose) | Lighter, full control over document mapping, no schema duplication. |
| Password hashing | `@node-rs/argon2` | Argon2 is the industry standard. `@node-rs/argon2` is a fast Rust-backed binding. |
| Event bus | Custom in-process (plain TS) | Simple pub/sub, no external deps. Sufficient for MVP. |
| Event storage | Dual-write (event store + view model) | Events stored in `domain_events` for audit/replay. View models are the read-optimized projections. |

## Architecture

```
Client → POST /command { command: 'CREATE_USER', payload: {...} }
Client ← HTTP 200 { ok: true }

Command handler:
  → validate payload
  → process (hash password, generate ID, etc.)
  → build domain event
  → eventBus.publish(event)
      → event store handler: appends to domain_events (event log)
      → view model handler: updates read model (e.g., users store)

Client ← WebSocket: { event: 'UserCreated', data: {...} }
```

Key separation:
- **Command handlers** — validate, process, produce events. No persistence.
- **Event store handler** — global listener, appends all events to the event log.
- **View model handlers** — per-event listeners, update read-optimized stores.

## Current Folder Structure

```
src/
  lib/
    types/
      events.ts                         # Domain event interfaces (DomainEvent, UserCreatedEvent)
    server/
      commands/
        registry.ts                     # Command registry (registerCommand, getHandler)
        create-user.ts                  # CREATE_USER handler + spec
      events/
        event-bus.ts                    # EventBus class (on, onAll, publish, clear)
        event-store.ts                  # Appends all events to in-memory log
      identity/
        user-store.ts                   # User view model (getUser, getUserByEmail, storeUser)
        on-user-created.ts             # Event handler: UserCreated → user view model
  routes/
    command/
      +server.ts                        # POST /command — fire-and-forget dispatcher
```

## Implementation Order

### Done
- [x] Command registry and `/command` endpoint
- [x] CREATE_USER command handler (validate, hash, publish event)
- [x] Event bus (publish/subscribe)
- [x] Event store (in-memory, appends all events)
- [x] User view model + UserCreated event handler
- [x] Tests for CREATE_USER (response, event store, view model, validation)

### Next
- [ ] WebSocket server for pushing events/results to clients
- [ ] MongoDB integration (replace in-memory stores)
- [ ] Auth commands (LOGIN_USER, LOGOUT_USER) + session management
- [ ] Role system (ADD_USER_ROLE, REMOVE_USER_ROLE)
- [ ] Brand commands (CREATE_BRAND, UPDATE_BRAND, DELETE_BRAND)
- [ ] Brand moderator invite flow (INVITE_MODERATOR → notification)
- [ ] Product commands (CREATE_PRODUCT, variants, inventory, publish/unpublish)
- [ ] Cart and order commands
- [ ] Notifications system (in-platform, triggered by events)

## Verification

```bash
npm run test:unit -- --run --project server   # All handler + event tests
npm run check                                  # TypeScript/Svelte type checking
npm run lint                                   # Prettier + ESLint
```
