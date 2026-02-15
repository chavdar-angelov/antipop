# Antipop Phase 1: Architecture Foundation

## Context

The project is a greenfield SvelteKit 5 app. We're building a CQRS-lite + event-driven architecture where all client communication happens over WebSocket. Commands come in via a single HTTP endpoint, get processed by handlers that publish domain events, and results are pushed to clients via WebSocket.

## Key Decisions

| Decision         | Choice                          | Why                                                                                                  |
| ---------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Communication    | WebSocket for all responses     | Real-time, event-driven architecture. HTTP endpoint is fire-and-forget.                              |
| WebSocket lib    | `ws` (raw)                      | Lightweight, no socket.io overhead. Upgrade handling + per-connection state is all we need.          |
| WS shared state  | `globalThis` for connection map | Bridges Vite plugin / custom server context with SvelteKit SSR bundle in same process.               |
| Command routing  | Single `/command` POST endpoint | All commands dispatched through one gateway. Returns 200 (accepted) or 400 (unknown command).        |
| MongoDB driver   | Native `mongodb` (not Mongoose) | Lighter, full control over document mapping, no schema duplication.                                  |
| Password hashing | `@node-rs/argon2`               | Argon2 is the industry standard. `@node-rs/argon2` is a fast Rust-backed binding.                    |
| Event bus        | Custom in-process (plain TS)    | Simple pub/sub, no external deps. Sufficient for MVP.                                                |
| Persistence      | MongoDB (Atlas)                 | Native `mongodb` driver, connection via `MONGODB_URI` env var. Collections: `users`, `events`.       |
| Event storage    | Transactional dual-write        | Each event handler writes the view model update + appends the event in a single MongoDB transaction. |

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
      → event handler: updates view model + appends event (in a transaction)

Client ← WS: (future: custom events will push data to clients)
```

Key separation:

- **Command handlers** — validate, produce events. Return only `{ ok: true }` or `{ ok: false, error }`. No persistence, no data in response.
- **Event handlers** — per-event listeners. Each handler writes the view model update and appends the event in a single MongoDB transaction.
- **Handler registration** — central wiring in `core/register-handlers.ts`, all handlers registered in one place.

## Current Folder Structure

```
src/
  hooks.server.ts                        # Server init: connects to MongoDB, ensures indexes, registers handlers
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
        mongo.ts                         # MongoDB connection singleton (initDatabase, getDb, closeDatabase)
        indexes.ts                       # Ensures MongoDB indexes on startup
        event-store.ts                   # Event store utilities (query, clear)
      core/
        event-bus.ts                     # EventBus class (on, onAll, publish, clear)
        register-handlers.ts             # Central handler registration
      events/
        identity/
          on-user-created.ts            # Event handler: UserCreated → users + events (transaction)
      ws/
        connections.ts                   # Connection manager (userId → Set<WebSocket>)
        server.ts                        # WebSocket server (upgrade, auth, disconnect)
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
- [x] Event store (MongoDB `events` collection)
- [x] User view model (MongoDB `users` collection) + UserCreated event handler
- [x] Duplicate email validation in CREATE_USER
- [x] Tests for CREATE_USER (command returns ok/error, validation)
- [x] Event metadata (userId, correlationId) threaded through command pipeline
- [x] WebSocket server (`ws`) with connection manager and auth handshake
- [x] ~~Event bus → WebSocket bridge~~ (removed — custom events will be added when needed)
- [x] Vite plugin for dev (attaches WS to Vite's HTTP server via ssrLoadModule)
- [x] Custom production server (server.js wraps build/handler.js + WS)
- [x] Client-side WebSocket helper (connect, onEvent, auto-reconnect)
- [x] Server init via hooks.server.ts (central handler registration)
- [x] Tests for connection manager
- [x] Unit tests for event handlers (on-user-created, event-store)

### Next

- [x] MongoDB integration (replace JSON file stores)
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
