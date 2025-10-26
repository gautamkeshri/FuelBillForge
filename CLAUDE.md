# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FuelBillForge is a realistic Indian fuel station bill generator that creates authentic-looking thermal printer receipts for major Indian fuel brands (IndianOil, Bharat Petroleum, HP Oil, and Essar Oil). The application is a full-stack TypeScript/React application with minimal backend, focusing on client-side bill generation, printing, and image export.

## Common Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:5000
npm run check        # Run TypeScript type checking
```

### Building
```bash
npm run build        # Build both frontend (Vite) and backend (esbuild)
npm run build:pages  # Build frontend only for Cloudflare Pages deployment
npm start            # Start production server (requires build first)
```

### Deployment
```bash
npm run build:pages  # Build for Cloudflare Pages
wrangler pages deploy dist/public --project-name=fuel-bill-forge  # Manual deploy
```

See `DEPLOYMENT.md` for complete Cloudflare Pages deployment guide.

### Database
```bash
npm run db:push      # Push database schema changes using Drizzle
```

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript, Tailwind CSS, Shadcn UI components, Wouter (routing), html2canvas (image export)
- **Backend**: Express.js (minimal, primarily serves frontend)
- **Build Tools**: Vite (frontend), esbuild (backend)
- **State Management**: React useState (no global state management)
- **Form Handling**: React Hook Form with Zod validation

### Project Structure
```
├── client/src/              # Frontend application
│   ├── components/          # React components
│   │   ├── BillForm.tsx            # Form inputs for receipt data
│   │   ├── ReceiptPreview.tsx      # Receipt display with brand templates
│   │   ├── BrandSelector.tsx       # Brand template selection
│   │   └── ActionBar.tsx           # Print/Download/Reset actions
│   ├── pages/               # Page components
│   │   └── Home.tsx                # Main application page with state
│   ├── lib/                 # Utilities and helpers
│   └── hooks/               # Custom React hooks
├── server/                  # Backend Express server
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes (minimal/empty)
│   ├── storage.ts           # Database storage interface
│   └── vite.ts              # Vite dev server integration
├── shared/                  # Shared types and schemas
│   └── schema.ts            # Zod schemas for validation
└── attached_assets/         # Static assets (fuel brand logos)
```

### Path Aliases
The project uses TypeScript path aliases configured in both `vite.config.ts` and `tsconfig.json`:
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

Always use these aliases when importing files from these directories.

## Key Architecture Patterns

### State Management Pattern
All application state lives in `Home.tsx` (client/src/pages/Home.tsx:10-43) and is passed down to child components via props. The main state object (`formData`) contains all receipt fields. State updates trigger automatic calculations based on preset type (Amount vs Litres).

### Auto-Calculation Logic
Located in `Home.tsx` (client/src/pages/Home.tsx:50-66):
- **Amount Preset**: When amount or rate changes → `volume = amount / rate`
- **Litres Preset**: When volume or rate changes → `amount = volume * rate`

This calculation happens automatically in the `handleFormChange` function whenever related fields are updated.

### Brand Template System
Each fuel brand has a unique receipt layout defined in `ReceiptPreview.tsx`:
- `renderIndianOilTemplate()` - Standard layout (client/src/components/ReceiptPreview.tsx:53-136)
- `renderBharatTemplate()` - Product-first layout (client/src/components/ReceiptPreview.tsx:139-222)
- `renderHPTemplate()` - Customer info early (client/src/components/ReceiptPreview.tsx:225-311)
- `renderEssarTemplate()` - Date/time at top (client/src/components/ReceiptPreview.tsx:314-397)

Each template renders receipt fields in a different order to match authentic fuel station receipts.

### Receipt Styling Architecture
The receipt preview uses inline styles (client/src/components/ReceiptPreview.tsx:494-626) to achieve thermal printer aesthetics:
- Monospace font (Courier New) for authenticity
- Zigzag torn edges (`.torn-top` and `.torn-bottom` CSS classes)
- Paper texture via repeating linear gradients
- Print-optimized CSS media queries that hide everything except the receipt

### Print and Export System
- **Print**: Uses native `window.print()` with print-specific CSS (client/src/pages/Home.tsx:125-127)
- **Download**: Dynamically imports `html2canvas` to convert receipt to PNG (client/src/pages/Home.tsx:129-148)

Both operations target the receipt element via a ref (`receiptRef`).

## Development Notes

### When Adding New Features

1. **New Form Fields**:
   - Add to `formData` state in `Home.tsx`
   - Add input component in `BillForm.tsx`
   - Display in appropriate brand template(s) in `ReceiptPreview.tsx`

2. **New Brand Templates**:
   - Add logo to `attached_assets/stock_images/`
   - Import logo in `ReceiptPreview.tsx`
   - Add to `getBrandLogo()` function
   - Create new render function (e.g., `renderNewBrandTemplate()`)
   - Add case to template switch statement

3. **Custom Calculations**:
   - Implement in `handleFormChange` function in `Home.tsx`
   - Ensure calculations trigger on relevant field changes

### Server-Side Notes
The Express server (server/index.ts) is minimal by design:
- No authentication or session management currently implemented
- API routes are empty (server/routes.ts) - app is client-side only
- Drizzle ORM and storage interface exist but are unused
- Server primarily serves the Vite dev server in development, static files in production

### TypeScript Checking
Run `npm run check` before committing to catch type errors. The build will fail on TypeScript errors.

### Styling Conventions
- Uses Tailwind CSS utility classes throughout
- Shadcn UI components for consistent styling
- Receipt-specific styles are inline in ReceiptPreview.tsx (not in global CSS)
- Print styles must be in a `@media print` block

## Important Implementation Details

### Receipt Number Generation
Random 4-digit receipt numbers are auto-generated on mount and reset (client/src/pages/Home.tsx:161). ATOT/VTOT transaction codes are 6-digit random numbers (client/src/pages/Home.tsx:102-109).

### Date/Time Handling
Dates are stored as ISO strings, displayed in YYYY-MM-DD format. Times are in 24-hour format (HH:MM). Formatting happens in `ReceiptPreview.tsx` (client/src/components/ReceiptPreview.tsx:13-20).

### Logo Handling
Custom logos are stored as base64 data URLs in state when uploaded. Brand logos are imported as static assets from `attached_assets/stock_images/`.

### Responsive Layout
The app uses CSS Grid with `lg:grid-cols-2` (client/src/pages/Home.tsx:201) to display form and preview side-by-side on desktop, stacked on mobile.

## Deployment Architecture

### Cloudflare Pages (Production)
The application is deployed to Cloudflare Pages as a **static site** (client-side only):
- **Build command**: `npm run build:pages` (Vite frontend build only)
- **Output directory**: `dist/public`
- **Deployment method**: Automatic via GitHub push to `main` branch
- **No Workers needed**: All logic runs in the browser
- **No Storage needed**: No data persistence required

### Git Workflow for Major Changes
1. Make changes locally and test with `npm run dev`
2. Run `npm run check` to verify TypeScript
3. Commit changes: `git add . && git commit -m "Descriptive message"`
4. Push to GitHub: `git push origin main`
5. Cloudflare Pages automatically builds and deploys (2-5 minutes)

### URLs
- **Production**: `https://fuel-bill-forge.pages.dev`
- **GitHub**: `https://github.com/gautamkeshri/FuelBillForge`

See `DEPLOYMENT.md` for detailed deployment instructions and troubleshooting.

## Common Pitfalls

1. **Don't forget to update all brand templates** when adding new receipt fields
2. **Receipt styles must work in print mode** - test with browser print preview
3. **Path aliases must match in both vite.config.ts and tsconfig.json**
4. **Auto-calculation logic must handle division by zero** for rate per liter
5. **html2canvas is dynamically imported** to reduce initial bundle size
6. **Use `npm run build:pages` for Cloudflare deployment** - not `npm run build`
