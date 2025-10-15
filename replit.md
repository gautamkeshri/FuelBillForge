# Fuel Bill Generator

## Overview

A fully functional React-based web application that generates realistic Indian fuel station receipts for major brands (Indian Oil, Bharat Petroleum, HP Oil, Essar Oil). The application creates thermal printer-style bills with authentic formatting, supports custom branding with logo upload, and provides export functionality (print and PNG download). It's a client-side only application with no backend persistence - all data processing happens in the browser.

## Recent Updates (October 2025)

- ✅ Implemented auto-calculation logic (Amount ↔ Volume based on rate)
- ✅ Added custom logo upload functionality with preview
- ✅ Brand template switching with pre-configured values
- ✅ Realistic receipt styling with paper texture and zigzag edges
- ✅ Print and download (PNG) functionality using html2canvas
- ✅ Comprehensive README with installation instructions
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

**Receipt Generation Strategy:**
- Real-time preview using React state updates
- Monospace fonts (Courier New) for authentic thermal printer appearance
- CSS-based paper texture with zigzag edges
- Base64 encoding for logo images to enable easy export
- Print-optimized CSS for thermal printers

**Export Functionality:**
- Browser print API for direct printing
- HTML-to-canvas (html2canvas) conversion for PNG export
- Component reference system for capturing receipt DOM

### Application Flow

1. User loads the single-page application
2. BillForm component renders with default values for a sample bill
3. User selects fuel brand (IndianOil/Bharat/HP/Essar) or Custom for logo upload
4. Form inputs update local state with auto-calculations:
   - Amount preset: Volume = Amount ÷ Rate
   - Litres preset: Amount = Volume × Rate
5. ReceiptPreview component renders in real-time based on state
6. ActionBar provides export options (print/download/reset)

### Component Architecture

**Core Components:**
- `BillForm`: Main input form with validation and auto-calculation logic
  - Includes logo upload section (visible when Custom brand selected)
  - Smart calculation based on preset type
- `BrandSelector`: Brand template selection (4 brands + Custom option)
  - Uses Lucide Upload icon for Custom option
- `ReceiptPreview`: Thermal printer-style receipt renderer
  - Displays custom logo when available
  - Realistic paper texture and styling
- `ActionBar`: Sticky header with export/reset actions

**Calculation Logic:**
- Amount mode: calculates volume from amount and rate
- Litres mode: calculates amount from volume and rate
- Real-time updates on any input change
- Auto-generation of transaction codes (ATOT, VTOT - 6 digit random numbers)

**Brand Templates:**
- IndianOil, Bharat Petroleum, HP Oil, Essar Oil
- Each template has pre-configured station name
- Custom template allows logo upload via FileReader API

### External Dependencies

**UI & Styling:**
- Radix UI primitives (@radix-ui/*) - Accessible component primitives
- Tailwind CSS - Utility-first CSS framework
- class-variance-authority - CSS variant management
- Lucide React - Icon library

**Export & Canvas:**
- html2canvas - For PNG export functionality

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
