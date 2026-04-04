# Flame Wood - Premium Biomass & Coconut Products

A modern headless commerce platform for biomass fuel and coconut products, built with Next.js and Shopify.

## 🌟 Features

- **Headless Commerce**: Next.js frontend + Shopify backend
- **Smart Shipping Engine**: Weight and region-based shipping calculations
- **Product Catalog**: Firewood, coconut products, and biomass fuel
- **Cart Management**: Persistent cart with real-time updates
- **Mobile Responsive**: Optimized for all devices
- **Performance**: TanStack Query for efficient data fetching

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Shopify store with Storefront API access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FlameWood
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Shopify credentials:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN=your_storefront_access_token
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── cart/              # Cart page
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── product/          # Product-specific components
├── lib/                   # Utilities and API clients
│   ├── shopify.ts        # Shopify Storefront API
│   ├── shipping.ts       # Shipping calculation logic
│   └── queryClient.ts    # TanStack Query config
├── hooks/                 # Custom React hooks
├── store/                 # State management (Context)
├── types/                 # TypeScript type definitions
└── styles/               # Global styles
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query, React Context
- **Backend**: Shopify Storefront API
- **Deployment**: Vercel (recommended)

## 🔑 Key Components

### Shopify Integration
- Product fetching and filtering
- Cart management (create, update, remove)
- Checkout via Shopify's secure checkout

### Shipping Engine
- Region detection based on pincode
- Weight-based shipping tiers (Standard, Heavy, Freight)
- Real-time shipping cost calculation

### Design System
- Custom color palette (Fire-inspired)
- Reusable UI components (Button, Card, Input, Badge)
- Responsive layout system

## 📝 Shopify Setup

1. Create a Shopify Partner account
2. Set up a development store
3. Create a custom app with Storefront API permissions
4. Generate Storefront API access token
5. Add products with variants (different weights)
6. Configure collections: Firewood, Coconut Products, Biomass

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-production-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN=production_token
```

## 🎨 Design Tokens

Located in `src/app/globals.css`:

- Primary: `#C2410C` (Burnt Orange)
- Secondary: `#7C2D12` (Deep Wood Brown)
- Accent: `#F59E0B` (Amber Flame)
- Background: `#FAFAF9` (Warm Off-White)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔮 Future Enhancements

- [ ] B2B bulk ordering dashboard
- [ ] Subscription model for recurring orders
- [ ] Multi-language support (Malayalam, Hindi)
- [ ] WhatsApp integration
- [ ] Advanced analytics
- [ ] Product reviews
- [ ] AI-powered recommendations

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For questions or issues, please contact the development team.

---

Built with ❤️ for sustainable biomass commerce
