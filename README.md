
# Fuel Bill Generator

A modern web application for generating professional fuel station receipts with customizable branding and formats.

## Features

- **Custom Branding**: Upload your own logo or select from popular fuel brands (Shell, HP, Indian Oil, Bharat Petroleum, Reliance)
- **Flexible Input**: Enter fuel details by amount or litres
- **Multiple Fuel Types**: Support for Petrol, Diesel, and CNG
- **Professional Receipts**: Generate clean, printable receipts with proper formatting
- **Export Options**: 
  - Print directly
  - Download as PNG image
  - Download as PDF
- **Real-time Preview**: See your receipt update as you type
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Wouter** for routing
- **React Hook Form** with Zod validation
- **Radix UI** components
- **html2canvas** for image export
- **Lucide React** icons

### Backend
- **Express.js** with TypeScript
- **Node.js 20**
- **Vite** for development and building

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository or fork this Repl
2. Install dependencies (automatically handled by Replit)
3. Click the Run button to start the development server

The application will be available at `http://localhost:5000`

### Development

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run check      # Type check with TypeScript
```

## Usage

1. **Select Brand**: Choose a fuel brand or upload your own logo
2. **Enter Station Details**: Add station name and location
3. **Choose Fuel Type**: Select Petrol, Diesel, or CNG
4. **Input Type**: Toggle between entering by amount or litres
5. **Enter Values**: Fill in the rate and quantity
6. **Generate**: The receipt updates in real-time
7. **Export**: Print, download as PNG, or save as PDF

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and helpers
│   │   └── App.tsx        # Main app component
├── server/
│   ├── index.ts          # Express server
│   ├── routes.ts         # API routes
│   └── vite.ts           # Vite integration
├── shared/
│   └── schema.ts         # Shared TypeScript types
└── design_guidelines.md  # Design specifications
```

## Key Components

- **BillForm**: Main form for entering fuel bill details
- **BrandSelector**: UI for selecting or uploading brand logos
- **ReceiptPreview**: Real-time receipt preview with proper formatting
- **ActionBar**: Export and print controls

## Design Guidelines

The application follows a clean, professional design with:
- Monospace fonts for receipt display
- Proper alignment for amounts and labels
- Dashed separators between sections
- Responsive layout for all screen sizes

See [design_guidelines.md](design_guidelines.md) for detailed design specifications.

## API Endpoints

Currently, this is a client-side application with no backend storage. All data is managed in the browser.

## License

MIT License - Feel free to use this template for your projects

## Contributing

1. Fork the Repl
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues or questions, please create an issue in the repository or contact the maintainer.

## Acknowledgments

- Built with [Replit](https://replit.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

Made with ❤️ on Replit
