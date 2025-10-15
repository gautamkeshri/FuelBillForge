
# Fuel Bill Generator - Technical Documentation

## Architecture Overview

This application is built using a modern React + Express stack with TypeScript throughout. The architecture separates concerns between the client-side UI and server-side API, with shared types for type safety.

## Application Flow

1. User opens the application
2. BillForm component renders with default values
3. User selects/uploads brand logo
4. User enters fuel station and transaction details
5. ReceiptPreview updates in real-time using React state
6. User can export via ActionBar component (print/PNG/PDF)

## Component Architecture

### Core Components

#### BillForm (`client/src/components/BillForm.tsx`)
- Main form component using React Hook Form
- Manages all input fields for fuel bill generation
- Validates input using Zod schemas
- Props: `onFormChange` callback for real-time updates

**Key Features:**
- Brand selection/upload
- Station name and location inputs
- Fuel type selection (Petrol/Diesel/CNG)
- Toggle between amount/litres input
- Rate and quantity fields
- Vehicle number input

#### BrandSelector (`client/src/components/BrandSelector.tsx`)
- Allows selection from predefined fuel brands
- Supports custom logo upload with preview
- Stores logo as base64 data URL for easy export

**Supported Brands:**
- Shell
- HP (Hindustan Petroleum)
- Indian Oil
- Bharat Petroleum
- Reliance

#### ReceiptPreview (`client/src/components/ReceiptPreview.tsx`)
- Displays formatted receipt in real-time
- Uses monospace font for proper alignment
- Implements receipt design guidelines
- Includes reference ID for print tracking

**Receipt Sections:**
- Header with logo and welcome message
- Station details (name, location)
- Transaction details (date, time, vehicle)
- Product information (fuel type, rate, quantity, amount)
- Footer with thank you message

#### ActionBar (`client/src/components/ActionBar.tsx`)
- Provides export and utility actions
- Implements print, PNG download, and PDF download
- Reset functionality to clear form

**Export Methods:**
- **Print**: Uses browser's native print dialog
- **PNG**: Captures receipt using html2canvas
- **PDF**: Generates PDF using jsPDF library

## State Management

### Form State
- Managed by React Hook Form
- Real-time validation with Zod
- Form data passed to parent via callback

### Application State
- React useState for component-level state
- No global state management needed (small app)
- Props drilling for data flow

## Data Flow

```
User Input → BillForm (validation) → State Update → ReceiptPreview (render)
                                    ↓
                                ActionBar (export)
```

## Styling System

### Tailwind CSS
- Utility-first CSS framework
- Custom theme configuration in `tailwind.config.ts`
- Responsive design with mobile-first approach

### Design Tokens
- Colors: Primary brand colors, grays for text
- Typography: Sans-serif for UI, monospace for receipt
- Spacing: Consistent spacing scale
- Border radius: Rounded corners for modern look

## Type Safety

### Shared Schema (`shared/schema.ts`)
```typescript
// Define types here that are shared between client and server
export interface BillFormData {
  brand: string;
  logo?: string;
  stationName: string;
  location: string;
  fuelType: 'petrol' | 'diesel' | 'cng';
  inputType: 'amount' | 'litres';
  rate: number;
  quantity: number;
  vehicleNumber?: string;
}
```

## Server Configuration

### Express Server (`server/index.ts`)
- Serves the React application
- Provides API endpoints (if needed)
- Development: Uses Vite dev server
- Production: Serves static build files

**Port Configuration:**
- Default: 5000 (forwarded to 80/443 in production)
- Binds to 0.0.0.0 for external access

### Vite Integration (`server/vite.ts`)
- Sets up Vite middleware in development
- Hot module replacement (HMR)
- Serves static files in production

## Build Process

### Development
```bash
npm run dev
```
- Starts Express server with tsx
- Vite dev server for HMR
- TypeScript compilation on-the-fly

### Production
```bash
npm run build
```
- Vite builds client to `dist/client`
- esbuild bundles server to `dist/server`
- TypeScript type checking

## Environment Variables

```bash
NODE_ENV=development|production
PORT=5000
```

## File Upload Handling

Logo uploads are handled client-side:
1. User selects image file
2. FileReader converts to base64 data URL
3. Stored in component state
4. Rendered in receipt preview
5. Included in exported images/PDFs

## Export Implementation

### Print
```typescript
window.print()
```
- Uses browser's print dialog
- CSS print media queries for formatting

### PNG Export
```typescript
html2canvas(element).then(canvas => {
  canvas.toBlob(blob => {
    saveAs(blob, 'receipt.png')
  })
})
```

### PDF Export
```typescript
html2canvas(element).then(canvas => {
  const pdf = new jsPDF()
  pdf.addImage(canvas, 'PNG', 0, 0)
  pdf.save('receipt.pdf')
})
```

## Error Handling

- Form validation errors shown inline
- Network errors logged to console
- Fallback UI for missing data
- Type safety prevents runtime errors

## Performance Considerations

- React.memo for expensive components
- Debounced form updates
- Lazy loading for large dependencies
- Optimized bundle size with tree shaking

## Security Considerations

- Client-side only (no sensitive data)
- XSS prevention via React's escaping
- No user authentication required
- File upload size limits

## Testing Strategy

### Recommended Tests
- Component unit tests with React Testing Library
- Form validation tests
- Export functionality tests
- Responsive design tests
- Cross-browser compatibility

## Future Enhancements

- Backend storage for saved receipts
- Multiple receipt templates
- Batch receipt generation
- Email receipt functionality
- Multi-language support
- Dark mode theme
- Receipt history/search

## Deployment

### Replit Deployment
1. Click "Deploy" button in Replit
2. Application is automatically built
3. Served on autoscale infrastructure
4. Accessible via Replit URL

### Production Configuration
```json
{
  "build": ["npm", "run", "build"],
  "run": ["npm", "run", "start"]
}
```

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill process on port 5000
killall node
```

**Build Fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Type Errors:**
```bash
# Run type checking
npm run check
```

## Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)

## Maintenance

### Regular Updates
- Keep dependencies up to date
- Monitor for security vulnerabilities
- Update TypeScript and Node versions
- Review and update documentation

### Code Quality
- Follow TypeScript strict mode
- Use ESLint for code linting
- Prettier for code formatting
- Git hooks for pre-commit checks
