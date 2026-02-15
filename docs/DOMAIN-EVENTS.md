# Domain Events

All events the system can emit, grouped by bounded context.

## Event Metadata

Every domain event can carry optional metadata:

| Field           | Type      | Purpose                                                                         |
| --------------- | --------- | ------------------------------------------------------------------------------- |
| `userId`        | `string?` | The user who triggered the command. Used to route the event back via WebSocket. |
| `correlationId` | `string?` | Client-provided ID to match a command to its resulting events.                  |

Metadata is set by the `/command` endpoint and threaded through command handlers into the published event. `userId` identifies who triggered the command. `correlationId` lets the client match a command to its resulting events.

## Identity

| Event                 | Trigger                                                              |
| --------------------- | -------------------------------------------------------------------- |
| `UserCreated`         | User signs up with email & password                                  |
| `UserUpdated`         | User changed personal info                                           |
| `UserDeleted`         | User deleted their profile                                           |
| `UserPasswordUpdated` | User changed their password                                          |
| `UserRoleAdded`       | Role granted (self-upgrade to manager, or moderator invite accepted) |
| `UserRoleRemoved`     | Role revoked (removed as moderator)                                  |

<!-- UserLoggedIn / UserLoggedOut — not recorded as domain events -->

## Catalog — Brands

| Event                    | Trigger                                             |
| ------------------------ | --------------------------------------------------- |
| `BrandCreated`           | User creates a new brand                            |
| `BrandUpdated`           | Brand profile info edited (name, description, etc.) |
| `BrandDeleted`           | Brand owner deletes the brand                       |
| `BrandModeratorInvited`  | Brand owner invites a user as moderator             |
| `BrandModeratorAccepted` | Invited user accepts the moderator role             |
| `BrandModeratorRemoved`  | Brand owner removes a moderator                     |

## Catalog — Products

| Event                     | Trigger                                           |
| ------------------------- | ------------------------------------------------- |
| `ProductCreated`          | Brand owner/moderator creates a new product       |
| `ProductUpdated`          | Product info edited (title, description, images)  |
| `ProductVariantAdded`     | A variant (size + color combo) added to a product |
| `ProductVariantUpdated`   | Variant details changed (price, attributes)       |
| `ProductVariantRemoved`   | Variant removed from a product                    |
| `ProductInventoryUpdated` | Stock count changed for a variant                 |
| `ProductPublished`        | Product goes live on the storefront               |
| `ProductUnpublished`      | Product taken off the storefront                  |

## Orders — Cart

<!-- Cart events are not recorded at this point -->

| Event             | Trigger                                       |
| ----------------- | --------------------------------------------- |
| `CartItemAdded`   | Customer adds a product variant to cart       |
| `CartItemUpdated` | Customer changes quantity of a cart item      |
| `CartItemRemoved` | Customer removes an item from cart            |
| `CartCleared`     | Cart emptied (after order placed or manually) |

## Orders — Orders

| Event                | Trigger                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| `OrderPlaced`        | Customer places an order from their cart                                       |
| `OrderStatusChanged` | Brand owner/moderator updates status (purchased → processed → fulfilled, etc.) |
| `OrderCancelled`     | Order cancelled (by customer or brand owner)                                   |

## Favourites

| Event                 | Trigger                                    |
| --------------------- | ------------------------------------------ |
| `ProductFavourited`   | Customer adds a product to favourites      |
| `ProductUnfavourited` | Customer removes a product from favourites |

## Campaigns (brand owner + influencer)

| Event                       | Trigger                                           |
| --------------------------- | ------------------------------------------------- |
| `CampaignCreated`           | Brand owner creates a campaign                    |
| `CampaignUpdated`           | Campaign details edited                           |
| `CampaignClosed`            | Campaign ended                                    |
| `CampaignInfluencerAdded`   | Brand owner adds an influencer to a campaign      |
| `CampaignInfluencerRemoved` | Brand owner removes an influencer from a campaign |
