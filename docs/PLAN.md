# Antipop Phase 1: Architecture Foundation

## Context

The project is a greenfield SvelteKit 5 app. We're building a CQRS-lite + event-driven architecture where all client communication happens over WebSocket. Commands come in via a single HTTP endpoint, get processed by handlers that publish domain events, and results are pushed to clients via WebSocket.

## Key Decisions

| Decision         | Choice                                | Why                                                                                                |
| ---------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Communication    | WebSocket for all responses           | Real-time, event-driven architecture. HTTP endpoint is fire-and-forget.                            |
| WebSocket lib    | `ws` (raw)                            | Lightweight, no socket.io overhead. Upgrade handling + per-connection state is all we need.        |
| WS shared state  | `globalThis` for connection map       | Bridges Vite plugin / custom server context with SvelteKit SSR bundle in same process.             |
| Command routing  | Single `/command` POST endpoint       | All commands dispatched through one gateway. Returns 200 (accepted) or 400 (unknown command).      |
| MongoDB driver   | Native `mongodb` (not Mongoose)       | Lighter, full control over document mapping, no schema duplication.                                |
| Password hashing | `@node-rs/argon2`                     | Argon2 is the industry standard. `@node-rs/argon2` is a fast Rust-backed binding.                  |
| Event bus        | Custom in-process (plain TS)          | Simple pub/sub, no external deps. Sufficient for MVP.                                              |
| Persistence      | JSON files in `data/`                 | Simple file-based storage for MVP. Event log + view models persisted as JSON.                      |
| Event storage    | Dual-write (event store + view model) | Events stored in `data/event_log.json` for audit/replay. View models are the read-optimized projections. |

## Architecture

```
Client connects via WebSocket → authenticates (sends userId token) → server maps userId to connection

Client → POST /command { command: 'CREATE_USER', payload: {...}, correlationId: 'abc-123' }
Client ← HTTP 200 { ok: true }

Command handler:
  → validate payload
  → process (hash password, generate ID, etc.)
  → build domain event (with metadata: userId, correlationId)
  → eventBus.publish(event)
      → event store handler: appends to domain_events (event log)
      → view model handler: updates read model (e.g., users store)
      → WebSocket handler: forwards event to the originating client

Client ← WS: { type: 'event', event: 'identity.user_created', data: {...}, correlationId: 'abc-123' }
```

Key separation:

- **Command handlers** — validate, produce events. Return only `{ ok: true }` or `{ ok: false, error }`. No persistence, no data in response.
- **Event store handler** — global listener, appends all events to `data/event_log.json`.
- **View model handlers** — per-event listeners, update JSON file stores (e.g., `data/users.json`).
- **WebSocket handler** — global listener, routes events to the client that triggered the command. Strips sensitive fields (e.g., passwordHash) before sending.

## Current Folder Structure

```
src/
  hooks.server.ts                        # Server init: event store, user handlers, WS bridge
  lib/
    types/
      events.ts                          # Domain event interfaces (DomainEvent, EventMetadata)
    client/
      ws.ts                              # Client-side WS helper (connect, onEvent, disconnect)
    server/
      commands/
        registry.ts                      # Command registry (registerCommand, getHandler)
        create-user.ts                   # CREATE_USER handler
      database/
        event-store.ts                   # Appends all events to data/event_log.json
        user-store.ts                    # User view model (JSON file: data/users.json)
      core/
        event-bus.ts                     # EventBus class (on, onAll, publish, clear)
      events/
        identity/
          on-user-created.ts            # Event handler: UserCreated → user store
      ws/
        connections.ts                   # Connection manager (userId → Set<WebSocket>)
        server.ts                        # WebSocket server (upgrade, auth, disconnect)
        on-domain-event.ts              # Event bus → WebSocket bridge
  routes/
    command/
      +server.ts                         # POST /command — fire-and-forget dispatcher

server.js                                # Custom production server (HTTP + WS)
vite-ws-plugin.ts                        # Vite plugin: attaches WS server in dev
```

## Implementation Order

### Done

- [x] Command registry and `/command` endpoint
- [x] CREATE_USER command handler (validate, hash, publish event)
- [x] Event bus (publish/subscribe)
- [x] Event store (JSON file persistence: data/event_log.json)
- [x] User view model (JSON file persistence: data/users.json) + UserCreated event handler
- [x] Duplicate email validation in CREATE_USER
- [x] Tests for CREATE_USER (command returns ok/error, validation)
- [x] Event metadata (userId, correlationId) threaded through command pipeline
- [x] WebSocket server (`ws`) with connection manager and auth handshake
- [x] Event bus → WebSocket bridge (routes events to originating client, strips sensitive data)
- [x] Vite plugin for dev (attaches WS to Vite's HTTP server via ssrLoadModule)
- [x] Custom production server (server.js wraps build/handler.js + WS)
- [x] Client-side WebSocket helper (connect, onEvent, auto-reconnect)
- [x] Server init via hooks.server.ts (event store, user handlers, WS bridge)
- [x] Tests for connection manager and event → WS bridge

### Next

- [ ] MongoDB integration (replace JSON file stores)
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
