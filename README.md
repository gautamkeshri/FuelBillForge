# Fuel Bill Generator

A realistic Indian fuel station bill generator that creates authentic-looking receipts matching IndianOil, Bharat Petroleum, HP Oil, and Essar Oil formats. The app generates professional thermal printer-ready fuel bills with all standard Indian fuel station receipt details.

![Fuel Bill Generator](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

### 🎨 Brand Templates
- Pre-configured templates for major Indian fuel brands
  - IndianOil
  - Bharat Petroleum
  - HP Oil
  - Essar Oil
- Custom logo upload for personalized bills

### 📝 Comprehensive Bill Details
- **Station Information**: Name, location, code, phone number
- **Transaction Details**: Receipt number, nozzle, FIP number
- **Fuel Information**: Product type (Petrol/Diesel/CNG), rate per liter, volume, amount
- **Auto-generated Codes**: ATOT and VTOT transaction codes
- **Customer Information**: Vehicle number, mobile number
- **Date & Time**: Auto-filled with manual override option
- **Regulatory Details**: GST TIN, TXN numbers, attendant details

### 🧮 Smart Calculations
- **Auto-calculation** based on preset type:
  - **Amount Mode**: Automatically calculates volume when you enter amount and rate
  - **Litres Mode**: Automatically calculates amount when you enter volume and rate
- Real-time updates as you type

### 🖨️ Print & Download
- **Realistic Receipt Design**: Mimics actual thermal printer paper with:
  - Authentic monospaced font layout
  - Paper texture with subtle horizontal lines
  - Zigzag torn edges (top and bottom)
  - Professional shadow and depth effect
- **Print Optimized**: Ready for thermal printer (58mm/80mm width)
- **Download as PNG**: High-quality image export

### 📱 Responsive Design
- Mobile-friendly interface
- Desktop: Side-by-side form and preview
- Tablet/Mobile: Stacked layout with smooth scrolling

## Installation

### Prerequisites
- Node.js 18+ or Node.js 20+ (recommended)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd fuel-bill-generator
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React + TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- html2canvas for image export
- Express.js for the development server

### Step 3: Run the Application

#### Development Mode
```bash
npm run dev
```

The application will start on [http://localhost:5000](http://localhost:5000)

#### Production Build
```bash
npm run build
npm start
```

## Usage Guide

### Creating a Fuel Bill

1. **Select Brand Template**
   - Choose from IndianOil, Bharat Petroleum, HP Oil, or Essar Oil
   - Or select "Custom" to upload your own logo

2. **Enter Station Information**
   - Station name, location, code
   - Phone number

3. **Fill Bill Details**
   - Receipt number (auto-generated random number on reset)
   - Nozzle number, FIP number
   - Select fuel type: Petrol, Diesel, or CNG
   - Choose preset type:
     - **Amount**: Enter amount and rate → volume auto-calculates
     - **Litres**: Enter volume and rate → amount auto-calculates

4. **Transaction Codes**
   - Click "Generate Transaction Codes" for random ATOT/VTOT codes
   - Or manually enter custom codes

5. **Customer Information** (Optional)
   - Vehicle number
   - Mobile number
   - Displays "Not Entered" if left empty

6. **Date & Time**
   - Auto-filled with current date/time
   - Manually adjust if needed

7. **Regulatory Details** (Optional)
   - GST TIN, TXN Number
   - Attendant information

8. **Customize Messages**
   - Welcome message (e.g., "WELCOMES YOU")
   - Footer message (e.g., "Thank You! Visit Again")

### Actions

- **Print**: Opens browser print dialog optimized for thermal printers
- **Download**: Exports receipt as high-quality PNG image
- **Reset**: Clears form and generates new random receipt number and codes

## Project Structure

```
fuel-bill-generator/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── BillForm.tsx          # Form inputs
│   │   │   ├── ReceiptPreview.tsx    # Receipt display
│   │   │   ├── BrandSelector.tsx     # Brand selection
│   │   │   └── ActionBar.tsx         # Print/Download/Reset actions
│   │   ├── pages/
│   │   │   └── Home.tsx             # Main application page
│   │   ├── lib/                     # Utilities and helpers
│   │   └── index.css               # Global styles
│   └── index.html
├── server/                   # Backend server
│   ├── index.ts             # Express server entry
│   └── routes.ts            # API routes (minimal - client-side app)
├── shared/                  # Shared types and schemas
│   └── schema.ts
├── package.json
└── README.md
```

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** for component library
- **Wouter** for routing
- **html2canvas** for image export

### Backend
- **Express.js** (minimal - serves the frontend)
- **Vite** for development and bundling

## Features in Detail

### Auto Calculation
The app intelligently calculates missing values based on the preset type:

**Amount Preset:**
```
Volume = Amount ÷ Rate per Liter
```

**Litres Preset:**
```
Amount = Volume × Rate per Liter
```

### Receipt Authenticity
The receipt preview closely matches real Indian fuel station bills:
- Courier New monospaced font
- Proper spacing and alignment
- Dashed section dividers
- Bold totals section
- Regulatory information placement
- Zigzag paper edges

### Print Optimization
Print CSS ensures clean output:
- Hides all UI elements except receipt
- Removes shadows and backgrounds
- Sets exact thermal printer width
- Pure black text on white background

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Port 5000 Already in Use
```bash
# Kill the process using port 5000
npx kill-port 5000

# Or use a different port
PORT=3000 npm run dev
```

### Download Not Working
If PNG download fails:
1. Ensure you're using a modern browser
2. Try the Print option instead
3. Print to PDF using browser's print dialog

### Receipt Not Displaying Correctly
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser console for errors

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Made with ❤️ for Indian fuel station owners and operators**
