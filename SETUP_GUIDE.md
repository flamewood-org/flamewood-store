# Flame Wood - Quick Setup Guide

## 🎯 MVP Status

The core Flame Wood platform is now functional with:
- ✅ Homepage with categories and features
- ✅ Product listing pages (firewood, coconut, biomass)
- ✅ Product detail pages with weight selector
- ✅ Shopping cart with shipping estimator
- ✅ Shopify checkout integration
- ✅ Responsive design system

## ⚙️ Setup Steps

### 1. Shopify Store Configuration

You need to set up a Shopify store first:

1. **Create Shopify Partner Account**
   - Visit: https://partners.shopify.com
   - Sign up for free

2. **Create Development Store**
   - From Partner Dashboard → Stores → Add store → Development store
   - Choose "Development store" type

3. **Create Custom App**
   - Go to Settings → Apps and sales channels → Develop apps
   - Click "Create an app"
   - Name it "Flame Wood Storefront"

4. **Configure Storefront API**
   - In the app, go to Configuration → Storefront API integration
   - Enable permissions:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`
   - Save and install the app

5. **Get API Credentials**
   - After installation, copy:
     - Store domain (e.g., `your-store.myshopify.com`)
     - Storefront API access token

6. **Add Products**
   - Create products with multiple variants (different weights)
   - Example product structure:
     ```
     Product: Premium Firewood Logs
     Variants:
       - 5kg - ₹500
       - 10kg - ₹900 (bulk discount)
       - 25kg - ₹2000 (best value)
     Tags: firewood, cooking, hardwood
     Product Type: Firewood
     ```

### 2. Local Development Setup

1. **Clone and Install**
   ```bash
   cd "c:\workspace\My Works\FlameWood"
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN=shpat_xxxxxxxxxxxxx
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:3000

### 3. Testing the Platform

Since you don't have real products yet, you can:

1. **Test UI Components**
   - Homepage renders correctly
   - Navigation works
   - Cart page shows empty state

2. **Add Test Products in Shopify**
   - Create 2-3 sample products
   - Add variants with different weights
   - Refresh the frontend to see them

3. **Test Cart Flow**
   - Add product to cart
   - Update quantities
   - Check shipping calculator
   - Proceed to Shopify checkout

### 4. Common Issues & Solutions

**Issue**: Products not showing
- **Solution**: Verify Storefront API token has correct permissions
- Check browser console for API errors

**Issue**: Cart not working
- **Solution**: Ensure `unauthenticated_write_checkouts` permission is enabled
- Clear browser localStorage and refresh

**Issue**: Shipping calculation wrong
- **Solution**: Check pincode ranges in `src/lib/shipping.ts`
- Adjust rates as needed

### 5. Production Deployment

1. **Prepare for Vercel**
   - Push code to GitHub repository
   - Connect to Vercel

2. **Set Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN
   ```

3. **Deploy**
   - Vercel auto-deploys on push to main branch
   - Custom domain can be configured in Vercel dashboard

## 📊 Next Steps for Full Launch

1. **Add Real Products**
   - Upload product images
   - Write compelling descriptions
   - Set competitive pricing

2. **Configure Shopify Payments**
   - Set up Razorpay in Shopify admin
   - Enable COD (Cash on Delivery)
   - Configure UPI payments

3. **Shipping Configuration**
   - Fine-tune shipping rates in `src/lib/shipping.ts`
   - Or integrate Shiprocket API for real-time rates

4. **Legal Pages**
   - Privacy Policy
   - Terms of Service
   - Refund Policy
   - Contact page

5. **SEO Optimization**
   - Add meta descriptions
   - Submit sitemap to Google
   - Set up Google Analytics

## 🆘 Need Help?

Check these files for reference:
- `src/lib/shopify.ts` - Shopify API integration
- `src/lib/shipping.ts` - Shipping logic
- `src/store/CartContext.tsx` - Cart state management
- `src/app/globals.css` - Design tokens

## 🎉 You're Ready!

Your Flame Wood platform is ready for testing. Start by adding products in Shopify and watch them appear on your Next.js frontend!
