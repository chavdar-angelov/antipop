# Database Schema (Document DB)

## Collections


### Users

* email
* password

### Profiles

* belongs to user
* firstname
* lastname
* role - customer, influencer, brand owner, moderator, super admin
* slug - valid for brands and influencers only
* company name
* company address
* VAT number

### Brands

* belongs to profile with brand owner role
* name
* description
* links
* ...

### Products

* belongs to brand
* name
* description
* variants
* category
* tags

### Inventory

* belongs to product variant (SKU-level)
* count

### Orders

* belongs to profile
* items (snapshot of product variant: name, price, size, color, quantity)
* status
* shipping address
* total
* timestamps (created, updated)

### Campaigns

* belongs to brand
* start_date
* end_date
* discount (%)
* participants (references to profiles with influencer role)

> If querying "which campaigns is influencer X in?" becomes common, consider a separate CampaignParticipants collection.

### Subscribers

* email
