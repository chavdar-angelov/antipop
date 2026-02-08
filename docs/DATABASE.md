# Database Schema (Document DB)

This is a visual, high-level representation of the collections and relationships.

## Roles (User Capabilities)

```mermaid
flowchart TB
  U[User]
  U --> C[customer<br/>browse & purchase]
  U --> M[manager<br/>manage brands]
  U --> MOD[moderator<br/>add products<br/>fulfill orders]
  U --> SA[superadmin<br/>admin all]
```

## Collections and Relations (Overview)

```mermaid
flowchart LR
  USERS[users]
  BRANDS[brands]
  PRODUCTS[products]
  CARTS[carts]
  ORDERS[orders]

  USERS -->|owns| BRANDS
  BRANDS -->|has| PRODUCTS
  USERS -->|has| CARTS
  USERS -->|places| ORDERS
  PRODUCTS -->|line items| ORDERS
```

## Document Structure (Tree View)

```mermaid
mindmap
  root((database))
    users
      roles
        customer
        manager
        moderator
        superadmin
    brands
      ownerUserId
    products
      brandId
      variants
        sku
        price
        attributes
        inventory
    carts
      userId
      items
        productId
        variantSku
        priceSnapshot
    orders
      userId
      items
        productId
        brandId
        titleSnapshot
        variantSnapshot
        priceSnapshot
      payment
```

## Notes

- Relations are references by ID (document DB style).
- Orders store snapshots to keep history immutable.
- Role permissions are enforced in application logic.
