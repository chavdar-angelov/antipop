# Database Schema (Document DB)

## Collections


### Users

* email
* password

### Profiles

* belongs to user
* role - customer, influencer, brand owner, moderator, super admin
* firstname
* lastname
* company details...

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

* belongs to product
* size
* color
* count

### Orders

* belongs to profile
* has many items of product variant

### Campaigns

* belongs to brand
* start_date
* end_date
* discount (%)
* participants of type profile with role influencer

### Subscribers

* email
