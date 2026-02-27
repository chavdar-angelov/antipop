# Database Schema (MongoDB)

## Collections

### users

- id
- email
- passwordHash
- createdAt

### profiles

- id
- type — `brand` | `influencer`
- slug
- createdAt

### user_profiles

- id
- userId
- profileId
- role — `owner` | `moderator`
- joinedAt

### products

- id
- profileId (brand profile)
- name
- description
- variants
- category
- tags

### posts

- id
- profileId (influencer profile)
- images
- taggedProducts
- caption

### orders

- id
- userId
- items (snapshot of product variant: name, price, size, color, quantity)
- status
- shippingAddress
- total
- createdAt
- updatedAt

### subscribers

- id
- email
- subscribedAt
