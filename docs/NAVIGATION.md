## Public

/ - homepage
/~acme - brand homepage (~ prefix for brands)
/@jane - influencer profile page (@ prefix for influencers)
/c/men - all products for men
/c/men/shoes - shoes for men category page
/t/winter - winter tag page
/p/{id or slug} - product page

## Auth

/sign-up - registration page
/sign-in - login page

## Customer

/dashboard - customer dashboard (redirects to purchases)
/dashboard/purchases - list of customer purchases with status
/dashboard/purchases/{id} - purchase details
/dashboard/returns - list of returns with status
/dashboard/favourites - favourite products
/dashboard/account - personal details, shipping address, delete profile
/cart - shopping cart
/checkout - checkout (address, order confirmation)

## Brand Dashboard

/dashboard - brand dashboard (redirects to brand-profile)
/dashboard/brand-profile - brand name, description, logo
/dashboard/products - manage products
/dashboard/products/{id} - edit a product
/dashboard/orders - brand orders list (customer orders received)
/dashboard/orders/{id} - order details, change status
/dashboard/campaigns - list campaigns
/dashboard/campaigns/{id} - edit a campaign
/dashboard/team - manage team members
/dashboard/settings - store settings, payout, return policy
/dashboard/affiliates - affiliate performance tracking

## Influencer Dashboard

/dashboard/posts - manage posts/photos
/dashboard/posts/new - upload a photo, tag products
/dashboard/campaigns - view and join campaigns

## Admin

/admin - super admin panel (users, brands, orders)