# Flame Wood - Launch Checklist

## Pre-Launch Tasks

### Shopify Setup
- [ ] Create Shopify Partner account
- [ ] Set up development/production store
- [ ] Create custom app with Storefront API
- [ ] Generate Storefront API token
- [ ] Configure `.env.local` with credentials
- [ ] Add at least 5-10 products with variants
- [ ] Upload product images (optimized, WebP preferred)
- [ ] Write compelling product descriptions
- [ ] Set competitive pricing with bulk discounts
- [ ] Configure product tags and types
- [ ] Create collections (Firewood, Coconut, Biomass)

### Payment Configuration (in Shopify Admin)
- [ ] Enable Razorpay payment gateway
- [ ] Configure UPI payments
- [ ] Set up Cash on Delivery (COD)
- [ ] Test payment flow with test mode
- [ ] Configure automatic order confirmation emails

### Shipping & Fulfillment
- [ ] Review shipping rates in `src/lib/shipping.ts`
- [ ] Adjust pincode ranges if needed
- [ ] Test shipping calculator with various pincodes
- [ ] Configure manual fulfillment process
- [ ] Set up Shiprocket integration (optional, future)
- [ ] Define packaging standards

### Testing
- [ ] Test homepage loads correctly
- [ ] Verify all category pages work
- [ ] Test product detail page with different variants
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Remove items from cart
- [ ] Test shipping calculator with valid pincodes
- [ ] Test shipping calculator with invalid pincodes
- [ ] Proceed to Shopify checkout
- [ ] Complete test purchase (use Shopify test mode)
- [ ] Verify order appears in Shopify admin
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test on tablets
- [ ] Test on desktop (Chrome, Firefox, Safari, Edge)
- [ ] Check page load speeds (<2s target)
- [ ] Verify no console errors

### Content & Legal
- [ ] Create Privacy Policy page
- [ ] Create Terms of Service page
- [ ] Create Refund/Return Policy page
- [ ] Create Contact Us page
- [ ] Add company information
- [ ] Add customer support contact details
- [ ] Create FAQ page (optional)
- [ ] Add "About Us" page

### SEO & Analytics
- [ ] Update meta titles and descriptions
- [ ] Add Open Graph tags for social sharing
- [ ] Create sitemap.xml
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics 4
- [ ] Configure conversion tracking
- [ ] Add Facebook Pixel (if running ads)
- [ ] Verify robots.txt configuration

### Performance Optimization
- [ ] Compress all product images
- [ ] Enable Next.js image optimization
- [ ] Test Lighthouse scores (>90 target)
- [ ] Check Core Web Vitals
- [ ] Verify caching works correctly
- [ ] Test with slow network (3G simulation)

### Deployment
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables in Vercel
- [ ] Deploy to production
- [ ] Configure custom domain (flamewood.com or similar)
- [ ] Set up SSL certificate (automatic with Vercel)
- [ ] Test production deployment
- [ ] Set up monitoring (Vercel Analytics)

### Post-Deployment
- [ ] Test complete purchase flow in production
- [ ] Verify email confirmations are sent
- [ ] Test order tracking
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Create backup plan for Shopify issues
- [ ] Document operational procedures

### Marketing Readiness
- [ ] Prepare social media accounts
- [ ] Create launch announcement
- [ ] Set up WhatsApp Business account
- [ ] Prepare product photography for marketing
- [ ] Create promotional materials
- [ ] Plan initial marketing campaign
- [ ] Set up customer support channels

## Go-Live Decision

Once all checkboxes above are complete:

- [ ] Final review with stakeholders
- [ ] Confirm inventory is ready to ship
- [ ] Customer support team briefed
- [ ] Launch! 🚀

## Post-Launch Monitoring (First Week)

- [ ] Monitor order volume
- [ ] Track conversion rate
- [ ] Watch for errors in Vercel logs
- [ ] Monitor Shopify order fulfillment
- [ ] Collect customer feedback
- [ ] Address any urgent bugs
- [ ] Optimize based on analytics

---

**Target Launch Date**: _______________  
**Launch Manager**: _______________  
**Status**: In Progress ⏳
