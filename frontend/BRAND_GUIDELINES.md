# MERIDIAN Foundation - Brand Guidelines

## Logo Usage

The MERIDIAN Foundation logo is located at `/public/meridian-logo.svg`.

### Logo Specifications
- **File**: `meridian-logo.svg`
- **Dimensions**: 400x400px (scalable SVG)
- **Clear Space**: Maintain clear space equal to the height of the letter 'M' around the logo
- **Do Not**: Distort, change colors, or modify the logo design

### Logo Components
- Golden sphere with 3D gradient effect
- White shield symbol for security and compliance
- Meridian lines representing global reach
- "MERIDIAN FOUNDATION" text in Montserrat Bold

## Color Palette

### Primary Colors

#### Gold (#FFD700)
- **Usage**: Premium highlights, accents, call-to-action buttons
- **CSS Variable**: `--meridian-gold`
- **Tailwind Class**: `meridian-gold`
- **Meaning**: Value, wealth, premium positioning

#### Deep Navy (#0A1F44)
- **Usage**: Primary text, headings, borders, backgrounds
- **CSS Variable**: `--meridian-navy`
- **Tailwind Class**: `meridian-navy`
- **Meaning**: Trust, professionalism, stability

### Supporting Colors

#### White (#FFFFFF)
- **Usage**: Backgrounds, text on dark backgrounds
- **CSS Variable**: `--meridian-white`
- **Tailwind Class**: `meridian-white`
- **Meaning**: Clarity, transparency

#### Light Gray (#F5F5F5)
- **Usage**: Neutral backgrounds, subtle sections
- **CSS Variable**: `--meridian-light-gray`
- **Tailwind Class**: `meridian-light-gray`
- **Meaning**: Neutral, clean

#### Gold Dark (#C5A200)
- **Usage**: Hover states for gold elements
- **CSS Variable**: `--meridian-gold-dark`
- **Tailwind Class**: `meridian-gold-dark`

## Typography

### Primary Font: Montserrat
- **Usage**: Headings, logo text, navigation, buttons
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- **CSS Variable**: `--font-montserrat`
- **Tailwind Class**: `font-montserrat`

```tsx
// Example usage in components
<h1 className="font-montserrat font-bold text-meridian-navy">
  Heading Text
</h1>
```

### Secondary Font: Open Sans
- **Usage**: Body text, descriptions, paragraphs
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold)
- **CSS Variable**: `--font-open-sans`
- **Tailwind Class**: `font-open-sans`

```tsx
// Example usage in components
<p className="font-open-sans text-gray-600">
  Body text content
</p>
```

## Component Styling Examples

### Buttons

#### Primary Button (Gold)
```tsx
<button className="px-6 py-2 bg-meridian-gold text-meridian-navy rounded-lg hover:bg-meridian-gold-dark transition-colors font-montserrat font-semibold">
  Purchase
</button>
```

#### Secondary Button (Navy Outline)
```tsx
<button className="px-6 py-2 border-2 border-meridian-navy text-meridian-navy rounded-lg hover:bg-meridian-light-gray transition-colors font-montserrat font-medium">
  Connect Wallet
</button>
```

### Cards
```tsx
<div className="p-6 border border-meridian-light-gray rounded-lg hover:border-meridian-gold transition-colors">
  <h3 className="text-xl font-semibold text-meridian-navy mb-3 font-montserrat">
    Card Title
  </h3>
  <p className="text-gray-600 font-open-sans">
    Card description text
  </p>
</div>
```

### Section Backgrounds
- **White backgrounds**: Main content sections
- **Light gray backgrounds**: Alternating sections for visual hierarchy
- **Gradient**: `bg-gradient-to-br from-meridian-light-gray to-white` for hero sections

## Design Principles

### 1. Premium & Professional
- Use gold accents sparingly for premium highlights
- Maintain clean, spacious layouts
- Prefer white or light gray backgrounds for clarity

### 2. Trust & Stability
- Deep navy conveys professionalism and trust
- Consistent spacing and alignment
- Clear hierarchy in typography

### 3. Institutional Grade
- Clean, minimal design
- Focus on transparency and clarity
- Regulatory compliance emphasis

### 4. Visual Hierarchy
```
Gold (Secondary/Accent) → Highlights, CTAs
Navy (Primary) → Headings, Important Text
Gray → Body Text
Light Gray → Backgrounds
White → Base Layer
```

## Accessibility

### Color Contrast
- Navy (#0A1F44) on White (#FFFFFF): AAA ✓
- Gold (#FFD700) on Navy (#0A1F44): AA ✓
- Gray text on White: AA minimum

### Typography
- Minimum font size: 16px for body text
- Line height: 1.5 for body text
- Clear visual hierarchy with size and weight

## Don'ts

❌ Don't change logo colors or proportions
❌ Don't use gold as a background color
❌ Don't mix other color palettes with MERIDIAN colors
❌ Don't use decorative or script fonts
❌ Don't overcrowd the design with gold accents

## Implementation

All colors and fonts are defined in:
- `app/globals.css` - CSS variables and global styles
- `app/layout.tsx` - Font configuration

Example usage in components:
```tsx
// Colors
className="bg-meridian-navy text-meridian-gold"

// Typography
className="font-montserrat font-bold"
className="font-open-sans"

// Combined
className="text-2xl font-bold text-meridian-navy font-montserrat"
```
