# CUSTOMER

## Customer buys product(s)

1. A user arives to the site
2. He can browse the homepage, a category page, open a product, check brand details or other brand products, check influencer pictures and navigate to tagged products
3. He adds product(s) to cart
4. Go to checkout
  4.1 He's forced to sign-up if he is not
  4.2 He's forced to sign-in if not
5. Fill in the address data
6. Complete the order

## Customer checks orders

1. Signs-in if not
2. Goes to his profile page
3. Clicks "Orders" and sees a list of al the orders he made with status (suggest possible statuses)

## Customer returns order

1. Signs-in if not
2. Goes to his profile page
3. Clicks "Orders" and sees a list of al the orders he made
4. Clicks "Return order"
5. Gets information on how to return orders

## Customer adds products to favourite

1. Customer browse products
2. Opens a product page and clicks heart icon (shows only if signed-in)

## Customer checks favourite products

1. Signs-in if not
2. Goes to his profile page
3. Clicks favourite products

## Customer - delete profile
WIP


# BRAND OWNER

## Brand owner creates a brand

1. Signs-up as a regular customer
2. Goes to profile settings
3. Changes role to brand owner
4. Fills in company details (company name, address, VAT number)
5. Creates a brand (name, description, links)
6. Brand profile page is now live with a unique slug

## Brand owner adds a product

1. Signs-in if not
2. Goes to brand dashboard
3. Clicks "Add product"
4. Fills in product details (name, description, category, tags)
5. Adds variants (size, color, price)
6. Sets inventory per variant (stock count or marks as untracked)
7. Publishes the product

## Brand owner edits/removes a product

1. Signs-in if not
2. Goes to brand dashboard
3. Clicks on a product from the product list
4. Edits product details, variants, or inventory
5. Can also remove the product entirely

## Brand owner manages orders

1. Signs-in if not
2. Goes to brand dashboard
3. Clicks "Orders" and sees a list of all orders for their brand with status (pending, confirmed, processing, shipped, delivered, cancelled, returned)
4. Clicks on an order to view details
5. Changes order status as the order progresses

## Brand owner manages moderators

1. Signs-in if not
2. Goes to brand dashboard settings
3. Clicks "Add moderator"
4. Enters moderator's email — an invite is sent
5. Can remove existing moderators from the same page

## Brand owner creates a campaign

1. Signs-in if not
2. Goes to brand dashboard
3. Clicks "Campaigns" then "Create campaign"
4. Sets campaign details (start date, end date, discount %)
5. Adds influencers to the campaign by searching their profiles
6. Publishes the campaign

## Brand owner manages campaigns

1. Signs-in if not
2. Goes to brand dashboard
3. Clicks "Campaigns" and sees a list of all campaigns
4. Can edit campaign details, add/remove influencers, or end a campaign early

# INFLUENCER

## Influencer sets up profile

1. Signs-up as a regular customer
2. Goes to profile settings
3. Changes role to influencer
4. Sets up a personal slug for their profile page

## Influencer posts a photo

1. Signs-in if not
2. Goes to their influencer dashboard
3. Clicks "Post photo"
4. Uploads a photo
5. Tags products from the platform in the photo
6. Publishes the post — it appears on their profile page

## Influencer joins a campaign

1. Signs-in if not
2. Goes to their influencer dashboard
3. Sees available campaigns (or receives an invitation from a brand)
4. Clicks on a campaign to view details (brand, discount, dates)
5. Joins the campaign

# MODERATOR

## Moderator onboarding

1. Receives an invite email from a brand owner
2. Signs-up using the invite link (or signs-in if already registered)
3. Gets moderator access to the brand dashboard

## Moderator manages products

1. Signs-in if not
2. Goes to the brand dashboard
3. Can add, edit, and remove products (same as brand owner)
4. Can manage inventory

## Moderator manages orders

1. Signs-in if not
2. Goes to the brand dashboard
3. Clicks "Orders" and sees a list of all orders
4. Can view order details and change order status

## Moderator manages campaigns

1. Signs-in if not
2. Goes to the brand dashboard
3. Can create campaigns, add/remove influencers
4. Cannot add/remove moderators

# SUPER ADMIN

## Super admin manages the platform

1. Signs-in (account set at database level)
2. Can view all brands, products, orders, and users
3. Can manage user roles
4. Can remove/suspend brands or profiles
