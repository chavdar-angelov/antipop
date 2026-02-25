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

/dashboard - customer dashboard (redirects to orders)
/dashboard/orders - list of customer orders with status
/dashboard/orders/{id} - order details
/dashboard/returns - list of returns with status
/dashboard/favourites - favourite products
/dashboard/account - personal details, shipping address, delete profile
/cart - shopping cart
/checkout - checkout (address, order confirmation)

## Brand Dashboard

/dashboard - brand dashboard overview
/dashboard/products - manage products
/dashboard/products/new - add a product
/dashboard/products/{id} - edit a product
/dashboard/orders - brand orders list
/dashboard/orders/{id} - order details, change status
/dashboard/moderators - manage moderators
/dashboard/campaigns - list campaigns
/dashboard/campaigns/new - create a campaign
/dashboard/campaigns/{id} - edit a campaign

## Influencer Dashboard

/dashboard/posts - manage posts/photos
/dashboard/posts/new - upload a photo, tag products
/dashboard/campaigns - view and join campaigns

## Admin

/admin - super admin panel (users, brands, orders)