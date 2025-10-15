# Fuel Bill Generator

## Overview

A fully functional React-based web application that generates realistic Indian fuel station receipts for major brands (Indian Oil, Bharat Petroleum, HP Oil, Essar Oil). The application creates thermal printer-style bills with authentic formatting, supports custom branding with logo upload, and provides export functionality (print and PNG download). It's a client-side only application with no backend persistence - all data processing happens in the browser.

## Recent Updates (October 2025)

- ✅ Implemented auto-calculation logic (Amount ↔ Volume based on rate)
- ✅ Added custom logo upload functionality with preview
- ✅ Brand template switching with pre-configured values
- ✅ Realistic receipt styling with paper texture and torn paper edges
- ✅ Print and download (PNG) functionality using html2canvas
- ✅ Comprehensive README with installation instructions
- ✅ Reorganized receipt layout to match real Indian fuel bills
- ✅ Added new fields: Local ID, FCC Date, FCC Time
- ✅ Enhanced regulatory section with CSI/LST/VAT numbers
- ✅ Brand logos added for all fuel brands (Indian Oil, BPCL, HP, Essar)
- ✅ Separate templates for each brand with unique field sequences
- ✅ Location and Station Code displayed centered without labels
- ✅ Local ID always shows after Receipt No
- ✅ All features tested and verified

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- React Hook Form with Zod for form validation and schema definition

**UI Component System:**
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Custom receipt styling to mimic thermal printer output
- Lucide React icons (no emojis in UI)

**State Management:**
- Local React state for form data and UI interactions
- FileReader API for logo upload and base64 encoding
- Real-time calculation logic embedded in form handlers
- No persistent storage - all state is ephemeral

**Key Design Patterns:**
- Component-based architecture with clear separation of concerns
- Controlled components pattern for form inputs
- Ref forwarding for receipt export functionality
- Callback props for parent-child communication
- Template-based rendering for brand-specific layouts

**Receipt Generation Strategy:**
- Real-time preview using React state updates
- Monospace fonts (Courier New) for authentic thermal printer appearance
- CSS-based paper texture with torn paper edges (mimics POS device tear)
- Base64 encoding for logo images to enable easy export
- Print-optimized CSS for thermal printers
- Brand-specific logos and field sequences

**Export Functionality:**
- Browser print API for direct printing
- HTML-to-canvas (html2canvas) conversion for PNG export
- Component reference system for capturing receipt DOM

### Multi-Template System

Each fuel brand has a **unique receipt template** with different field sequences to match authentic brand receipts:

#### **Indian Oil Template (Standard Layout)**
1. TEL NO
2. Receipt Details (RECEIPT NO, LOCAL ID, FIP NO, NOZZLE NO, PRODUCT)
3. Transaction Details (PRESET TYPE, RATE, VOLUME, AMOUNT, ATOT, VTOT)
4. Customer Info (VEHICLE NO, MOBILE NO)
5. Date & Time
6. Regulatory Info

#### **Bharat Petroleum Template (Date First)**
1. Date/Time/Tel No (DATE, TIME, TEL NO)
2. Product & Receipt (PRODUCT, NOZZLE NO, RECEIPT NO, LOCAL ID, FIP NO)
3. Transaction (RATE, VOLUME, AMOUNT, PRESET TYPE)
4. Codes (ATOT, VTOT)
5. Customer Info (VEHICLE NO, MOBILE NO)
6. Regulatory Info

#### **HP Oil Template (Customer Info Early)**
1. Receipt & Contact (RECEIPT NO, LOCAL ID, TEL NO)
2. Customer Info Early (VEHICLE NO, MOBILE NO)
3. Product Details (PRODUCT, NOZZLE NO, FIP NO, PRESET TYPE)
4. Transaction (RATE, VOLUME, AMOUNT)
5. Codes (ATOT, VTOT)
6. Date & Time
7. Regulatory Info

#### **Essar Oil Template (Date at Top)**
1. Date & Time (DATE, TIME) - FIRST
2. Receipt & Contact (RECEIPT NO, LOCAL ID, FIP NO, TEL NO)
3. Product & Customer (PRODUCT, NOZZLE NO, VEHICLE NO, MOBILE NO)
4. Transaction (PRESET TYPE, RATE, VOLUME, AMOUNT)
5. Codes (ATOT, VTOT)
6. Regulatory Info

#### **Custom Template**
- Uses Indian Oil template layout
- Shows "Fuel Station" as default station name
- Allows custom logo upload
- Fully editable fields

### Receipt Layout Structure

All receipts share a common header and footer, with brand-specific body layouts:

**Common Header:**
- Brand Logo (auto-loaded for brands, uploadable for custom)
- Station Name
- Welcome Message (editable)
- Divider Line
- Location (centered, no label)
- Station Code (centered, no label)

**Brand-Specific Body:**
- Different field sequences per brand (see Multi-Template System above)
- All fields optional and conditionally displayed
- Torn paper effect on top and bottom edges

**Common Footer:**
- Regulatory Information (CSI, LST, VAT, Attendant ID, FCC Date/Time)
- Customizable closing message
- Border line separator

### Component Architecture

**Core Components:**
- `BillForm`: Main input form with validation and auto-calculation logic
  - Includes logo upload section (visible when Custom brand selected)
  - Smart calculation based on preset type
  - Organized in logical sections matching receipt layout
- `BrandSelector`: Brand template selection (4 brands + Custom option)
  - Uses Lucide Upload icon for Custom option
  - Switches station name and template on selection
- `ReceiptPreview`: Thermal printer-style receipt renderer
  - Template switching based on selected brand
  - Displays brand-specific logos
  - Realistic paper texture and torn paper styling
  - Conditional field display (only shows filled fields)
- `ActionBar`: Sticky header with export/reset actions

**Calculation Logic:**
- Amount mode: calculates volume from amount and rate
- Litres mode: calculates amount from volume and rate
- Real-time updates on any input change
- Recalculates when preset type is changed
- Auto-generation of transaction codes (ATOT, VTOT - 6 digit random numbers)

**Brand Templates:**
- IndianOil, Bharat Petroleum, HP Oil, Essar Oil
- Each template has pre-configured station name and logo
- Unique field sequence per brand
- Custom template allows logo upload and full customization

**Form Fields Available:**
- Station: Name, Location, Code, Phone Number
- Bill: Receipt Number, Local ID, FIP Number, Nozzle Number
- Transaction: Product Type, Preset Type, Rate/Litre, Volume, Amount, ATOT, VTOT
- Customer: Vehicle Number, Mobile Number
- DateTime: Bill Date, Bill Time
- Regulatory: CSI Number, LST Number, VAT Number, Attendant ID, FCC Date, FCC Time
- Messages: Welcome Message, Footer Message

### External Dependencies

**UI & Styling:**
- Radix UI primitives (@radix-ui/*) - Accessible component primitives
- Tailwind CSS - Utility-first CSS framework
- class-variance-authority - CSS variant management
- Lucide React - Icon library

**Export & Canvas:**
- html2canvas - For PNG export functionality

**Assets:**
- Brand logos stored in attached_assets/stock_images/

**Development Tools:**
- Vite plugins for Replit integration (@replit/vite-plugin-*)
- TypeScript for type checking
- PostCSS with Autoprefixer for CSS processing

**Note:** The application is fully client-side with no backend API. The Express server only serves the Vite application and has no custom routes or data persistence.

## Installation & Running

See [README.md](README.md) for detailed installation instructions.

**Quick Start:**
```bash
npm install
npm run dev
```

Application runs on http://localhost:5000

## Key Features

1. **Multi-Brand Support**: Each fuel brand has its own authentic receipt template
2. **Brand Logos**: Auto-loaded logos for Indian Oil, BPCL, HP, and Essar
3. **Custom Branding**: Upload your own logo for custom fuel stations
4. **Smart Calculations**: Auto-calculate amount or volume based on preset type
5. **Realistic Design**: Torn paper effect mimics thermal printer POS devices
6. **Export Options**: Print or download as PNG
7. **Mobile-Friendly**: Responsive design works on all devices
8. **No Login Required**: Fully client-side application
