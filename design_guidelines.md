# AI Request Desk - Design Guidelines

## Design Approach
**Reference-Based:** Modern SaaS internal tool (inspired by Linear, Notion, and enterprise dashboards)
**Core Principle:** Clean, professional, productivity-focused interface with subtle modern enhancements

---

## Color Palette

### Primary Colors
- **Background Gradient:** `#1a2942` → `#2d3f5f` (diagonal 135deg)
- **Accent:** `#00d9ff` (cyan for highlights, CTAs, and interactive elements)
- **Accent Glow:** `#00d9ff` at 20% opacity with blur for atmospheric depth

### Supporting Colors
- **Text Primary:** White on dark backgrounds
- **Text Secondary:** `rgba(255, 255, 255, 0.7)` for muted text
- **Floating Chips:** Semi-transparent `rgba(255, 255, 255, 0.05)` with `backdrop-blur`
- **Borders:** `rgba(255, 255, 255, 0.1)` for subtle definition
- **Form Fields:** White backgrounds with `#e5e7eb` borders
- **Card Backgrounds:** White for content cards

---

## Typography

### Font Family
**Inter** (Google Fonts) - weights: 300, 400, 500, 600, 700

### Hierarchy
- **H1 (Hero):** Large, bold, product-focused (56-64px desktop, 36-42px mobile)
- **H2 (Section Headers):** 32-40px, font-weight 600-700
- **Body Text:** 16px, font-weight 400
- **Supporting Text:** 14px, font-weight 400, reduced opacity
- **Floating Chips:** 14px, font-weight 500

---

## Layout System

### Spacing Units (Tailwind)
Primary spacing: `p-4`, `p-6`, `p-8`, `py-12`, `py-20`
Gaps: `gap-4`, `gap-6`, `gap-8`

### Container Strategy
- **Max-width:** `max-w-7xl` for main content
- **Hero Section:** Full viewport height with centered content
- **Form Section:** Contained width with generous padding
- **Section Padding:** `py-12` to `py-20` for vertical rhythm

---

## Component Specifications

### Navigation Banner
- **Position:** Fixed top, full-width
- **Height:** Slim (64px)
- **Layout:** Logo left, navigation center, user profile right
- **Links:** Dashboard | Submit Request | My Requests | Guidelines | Help/Admin
- **Styling:** Semi-transparent background with backdrop-blur
- **Behavior:** Keyboard accessible, responsive collapse on mobile

### Hero Section
- **Background:** Diagonal gradient with accent glow (top-right)
- **Layout:** Centered content, full-width
- **Elements:**
  - Large H1 title
  - Supporting tagline text
  - Primary CTA button: "Start an AI Request Desk request"
  - Floating animated department chips (Sales, Customer Success, Marketing, Product, AI Tool Customization, AI Agents)

### CTA Button
- **Background:** `#00d9ff`
- **Text:** Dark (`#1a2942`)
- **Padding:** `px-8 py-4`
- **Border Radius:** `rounded-lg`
- **Hover:** Scale `1.03-1.05` + soft shadow
- **Shadow:** `shadow-lg shadow-[#00d9ff]/20`

### Floating Chips
- **Count:** 5-6 chips
- **Position:** Absolute, scattered across hero
- **Animation:** Vertical float `translateY(6-10px)`, duration 18-24s with staggered delays
- **Styling:** `bg-white/5`, `backdrop-blur-md`, `border border-white/10`, `rounded-full`, `px-4 py-2`
- **Colors:** Varied pastel tints (cyan, purple, pink, emerald, blue)
- **Constraint:** Must not obstruct primary text

### Progress Bar
- **Label:** "Request completeness"
- **Position:** Above main form
- **Width:** Full container width
- **Height:** 8-12px with rounded corners
- **Fill Color:** `#00d9ff`
- **Background:** `rgba(255, 255, 255, 0.1)`
- **Percentage Display:** Show numeric value (0%, 25%, 50%, 75%, 100%)
- **Logic:** Track 4 form fields, update dynamically on input

### Request Form
- **Fields:** Business Problem, Existing Inputs/Data, Constraints/Risks, Success Criteria
- **Input Style:** White backgrounds, `border border-gray-300`, `rounded-lg`, `p-4`
- **Textarea Height:** Generous (150-200px minimum)
- **Focus State:** Border color `#00d9ff`, subtle glow
- **Labels:** Font-weight 600, margin-bottom 8px

### Flip Cards (Comparison Section)
- **Count:** 2 cards (Weak Request ❌ | Strong Request ✅)
- **Layout:** Side-by-side on desktop, stacked on mobile
- **Dimensions:** Height ~320px, consistent width
- **Animation:** CSS 3D flip `rotateY(180deg)`, `transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1)`
- **Trigger:** Hover (desktop), tap (mobile with JS)
- **Front Face:** White background, example submission text
- **Back Face:** Dark background (`#1a2942`), explanation text
- **Styling:** Rounded corners, subtle shadow, `preserve-3d` transform

---

## Animations

### Principles
- **Minimal and Professional:** Subtle enhancements only
- **Performance:** CSS transforms preferred over JS
- **Duration:** 0.2-0.6s for interactions, 18-24s for ambient animations

### Specific Animations
- **Floating Chips:** Continuous vertical float with easing
- **Button Hover:** Scale + shadow transition (200ms)
- **Flip Cards:** 3D rotation on hover (600ms)
- **Progress Bar:** Smooth width transition on value change

---

## Responsive Behavior

### Breakpoints
- **Mobile:** < 768px
- **Desktop:** ≥ 768px

### Mobile Adaptations
- Navigation collapses to hamburger menu
- Hero title reduces from 64px to 36-42px
- Flip cards stack vertically
- Floating chips reduce in number or size
- Form fields full-width with increased touch targets

---

## Images
**No hero image required** - the gradient background with floating chips provides sufficient visual interest. All visual impact comes from gradient, accent colors, and typography.