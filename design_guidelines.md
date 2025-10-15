# Design Guidelines: Indian Fuel Station Bill Generator

## Design Approach

**Selected Approach:** Hybrid - Design System (Material Design) with Custom Receipt Styling

**Justification:** This is a utility-focused application requiring efficient data entry forms (standard patterns) combined with pixel-perfect receipt replication (custom styling). Material Design provides the structure for forms while custom CSS recreates authentic thermal printer aesthetics.

**Key Principles:**
- Authenticity: Receipt must precisely match real Indian fuel bills
- Efficiency: Quick data entry with smart defaults
- Clarity: Clear visual separation between input and output
- Print-Ready: Thermal printer optimization is paramount

---

## Core Design Elements

### A. Color Palette

**Light Mode (Primary Interface):**
- Background: 0 0% 98%
- Surface/Cards: 0 0% 100%
- Primary (IndianOil inspired): 14 85% 50% (Orange-red)
- Text Primary: 0 0% 15%
- Text Secondary: 0 0% 45%
- Borders: 0 0% 88%
- Input Focus: 14 85% 50%

**Receipt Area:**
- Receipt Background: 0 0% 100% (Pure white for print)
- Receipt Text: 0 0% 0% (Pure black for thermal contrast)
- Border/Dividers: 0 0% 20%

**Brand Colors (Preset Templates):**
- IndianOil: 14 85% 50% (Orange-red)
- Bharat Petroleum: 140 65% 42% (Green)
- HP Oil: 0 85% 45% (Red)
- Custom: User-defined

### B. Typography

**Interface (Form Area):**
- Primary Font: 'Inter' or 'Roboto' from Google Fonts
- Headings: 600 weight, sizes from text-2xl to text-sm
- Body: 400 weight, text-sm to text-base
- Labels: 500 weight, text-sm, uppercase tracking

**Receipt Area (Critical):**
- Font Family: 'Courier New', 'Courier', monospace (thermal printer authenticity)
- Base Size: 12px (adjustable for 58mm/80mm thermal widths)
- Line Height: 1.4 for proper spacing
- Weight: 400 (normal) with 700 (bold) for headers and totals
- Character Spacing: Normal (monospaced handles alignment)

### C. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, and 12
- Form padding: p-6 on desktop, p-4 on mobile
- Section spacing: space-y-6 for form groups
- Input spacing: space-y-4 within sections
- Receipt margins: mx-auto with max-width constraints

**Grid Structure:**
- Desktop: Two-column layout (40% form, 60% preview) using grid or flex
- Tablet: Two-column maintained with adjusted ratios (45%/55%)
- Mobile: Single column, stacked (form above preview, sticky preview header)

**Container Widths:**
- Form Container: max-w-md to max-w-lg
- Receipt Container: Fixed widths for thermal sizes (58mm ≈ 220px, 80mm ≈ 300px)
- Overall Wrapper: max-w-7xl centered

### D. Component Library

**Form Components:**
- **Input Fields:** Outlined style with rounded corners (rounded-md), focus ring in primary color, floating labels or top-aligned labels with helper text below
- **Select Dropdowns:** Custom styled with brand icons for fuel types, arrow indicators
- **Brand Selector:** Visual card grid showing logos with radio behavior, hover states with subtle scale
- **Logo Upload:** Drag-drop zone with preview, rounded avatar display
- **Toggle Switches:** For Preset Type (Amount/Litres), modern iOS-style switches
- **Buttons:** Primary (filled, brand color), Secondary (outline), with appropriate hover/active states

**Receipt Components:**
- **Header Zone:** Logo centered, welcome text, station name in caps, border below
- **Info Sections:** Left-aligned labels with right-aligned values using tab stops (visual spacing)
- **Divider Lines:** Dashed or solid borders using dashes/equals characters
- **Product Grid:** Aligned columns for Rate, Volume, Amount using monospace advantage
- **Footer:** Centered "Thank You" message, zigzag top border (using CSS or Unicode triangles)
- **Transaction Codes:** Small text in brackets, gray tone

**Navigation/Actions:**
- **Action Bar:** Sticky at top or bottom with Print, Download PNG, Download PDF, Reset buttons
- **Quick Fill:** Dropdown preset for common fuel types with auto-populated rates
- **Copy/Duplicate:** Icon button to clone last receipt details

**Special Elements:**
- **Thermal Printer Zigzag Edge:** CSS clip-path or SVG pattern for authentic top/bottom edges
- **Receipt Shadow:** Subtle shadow to lift receipt from page (disabled for print)
- **Auto-code Generator:** Animated shuffle effect when generating Atot/Vtot codes

### E. Responsive Behavior

**Desktop (≥1024px):**
- Side-by-side layout, form left, receipt right
- Receipt scales to fit viewport height with scroll if needed
- Full feature visibility

**Tablet (768px-1023px):**
- Maintain two columns with tighter spacing
- Receipt slightly smaller but fully readable
- Collapsible sections for advanced fields

**Mobile (<768px):**
- Stack layout: form then receipt
- Sticky receipt header that expands to show preview
- Form sections in accordion panels
- Receipt fixed at 58mm width (scrollable horizontally if needed)
- Large touch targets (min-h-12 for inputs and buttons)

### F. Print Optimization

**Print Styles (Critical):**
```
@media print:
- Hide all UI elements except receipt
- Remove shadows, borders, colors (except essential)
- Set receipt to exact thermal width (58mm or 80mm)
- Page margins: 0
- Font size adjustments for legibility
- Ensure black text on white background
- Page breaks: avoid inside receipt
```

**Receipt Sizing:**
- 58mm thermal: max-width: 220px
- 80mm thermal: max-width: 300px
- Auto-scaling for character fit (test with longest content)

### G. Animations & Interactions

**Minimal, Purposeful Animations:**
- Form field focus: Smooth border color transition (150ms)
- Receipt update: Subtle fade-in when values change (200ms)
- Logo upload: Scale preview on success (300ms ease-out)
- Code generation: Number flip animation (400ms)
- No scroll animations or parallax
- No hover effects on receipt (interferes with authenticity)

---

## Special Features

**Brand Templates:** Pre-built cards with logo, colors, and default values for IndianOil, BPCL, HPCL, Essar - user clicks to apply instantly

**Smart Defaults:** 
- Auto-fill current date/time with manual override
- "Not Available" for optional fields
- "Not Entered" for empty customer mobile

**Receipt Variants:**
- Toggle between detailed and simplified views
- Language option (English/Hindi for labels)
- GST compliance fields (togglable)

**Accessibility:**
- High contrast for receipt text (pure black on white)
- Clear label-input associations
- Keyboard navigation through form
- Screen reader friendly (ARIA labels for icons)

---

## Images

**No hero images required.** This is a functional tool focused on form input and receipt output.

**Logo Assets:**
- Pre-loaded brand logos (IndianOil, BPCL, HPCL) as SVG or PNG with transparent backgrounds
- Logo placeholder: Circular avatar with initials fallback
- Upload icon: Outlined upload cloud symbol from icon library

**Icon Library:** Heroicons (outline variant) for form icons, file operations, and UI controls

---

## Key Success Metrics

1. **Receipt Authenticity:** Pixel-perfect match to real Indian fuel bills
2. **Print Quality:** Clean, readable thermal printer output
3. **Input Efficiency:** Minimal clicks to generate complete bill (≤8 fields for basic bill)
4. **Mobile Usability:** Full functionality on phones with clear preview
5. **Brand Flexibility:** Easy switching between fuel brands maintaining layout consistency