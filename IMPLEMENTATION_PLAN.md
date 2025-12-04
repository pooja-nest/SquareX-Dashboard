# Implementation Plan: Lists Page (About Us Page)

## Design Analysis

### Figma Design Overview
Based on the Figma design (node-id: 3958-25967), this is a **Lists Management Page** with the following structure:

1. **Full Page Layout** (1440px × 1024px viewport)
   - Left Sidebar Navigation (256px width)
   - Main Content Area (remaining width)

2. **Left Sidebar Components:**
   - Logo container (SquareX logo + text)
   - Search component
   - Navigation sections (Monitor, Manage, Configure)
   - Bottom action buttons (Avatar, Notifications, Help)

3. **Main Content Area:**
   - Page Header Section
     - Title: "Lists" (40px font, Bold)
     - Documentation button (with icon)
     - Tab Navigation (3 tabs: "20 Lists", "5 Categories", "19 DLP Categories")
   
   - Two-Panel Layout:
     - **Left Panel** (272px width): Lists Navigation Panel
     - **Right Panel** (flexible width): Selected List Details

### Design Specifications from Figma

#### Typography
- **Title Page (Small)**: `var(--sds-typography-title-page-size-small, 40px)`, Bold, `Host_Grotesk:Bold`
- **Heading (Base)**: `var(--sds-typography-heading-size-base, 24px)`, Medium, `Host_Grotesk:Medium`
- **Body (Large)**: `var(--sds-typography-body-size-large, 20px)`, Medium, `Host_Grotesk:Medium`
- **Body (Medium)**: `var(--sds-typography-body-size-medium, 14px)`, Regular/Medium
- **Code (Base)**: `var(--sds-typography-code-size-base, 14px)`, Regular, `Host_Grotesk:Regular`
- **Code (Large)**: `var(--sds-typography-code-size-large, 20px)`, Medium

#### Colors (CSS Variables)
- **Text Default**: `var(--sds-color-text-default-default, #2f353b)`
- **Text Secondary**: `var(--sds-color-text-default-secondary, #768494)`
- **Text Brand Tertiary**: `var(--sds-color-text-brand-tertiary, #4432bf)`
- **Text Danger Secondary**: `var(--sds-color-text-danger-secondary, #f04e4c)`
- **Background Default**: `var(--sds-color-background-default-default, #4432bf)`
- **Background Neutral Tertiary**: `var(--sds-color-background-neutral-tertiary, #f1f3f4)`
- **Background Utilities Scrim**: `var(--sds-color-background-utilities-scrim, rgba(255,255,255,0.45))`
- **Border Neutral Default**: `var(--sds-color-border-neutral-default, #c8ced4)`
- **Border Neutral Secondary**: `var(--sds-color-border-neutral-secondary, #e4e6ea)`

#### Spacing (CSS Variables)
- **Space 0**: `var(--sds-size-space-0, 0px)`
- **Space 100**: `var(--sds-size-space-100, 4px)`
- **Space 150**: `var(--sds-size-space-150, 6px)`
- **Space 200**: `var(--sds-size-space-200, 8px)`
- **Space 300**: `var(--sds-size-space-300, 12px)`
- **Space 400**: `var(--sds-size-space-400, 16px)`
- **Space 600**: `var(--sds-size-space-600, 24px)`
- **Space 800**: `var(--sds-size-space-800, 32px)`

#### Border Radius
- **Radius 200**: `var(--sds-size-radius-200, 8px)`
- **Radius 400**: `var(--sds-size-radius-400, 12px)`

#### Effects
- **Glass Light**: backdrop-blur(10px), shadow: `0px 4px 24px 0px rgba(0,0,0,0.06)`
- **On Glass Light**: backdrop-blur(10px), shadow: `0px 8px 20px 0px rgba(0,0,0,0.12)`

---

## Component Mapping

### Existing Components to Reuse

1. **Search Component** (`/components/ui/Search/Search.jsx`)
   - Used in: Sidebar search, Left panel search
   - Props needed: `placeholder="Search"`, `state="default"`

2. **Dropdown Component** (`/components/ui/Dropdown/Dropdown.jsx`)
   - Used in: Left panel "All Lists" dropdown trigger
   - Props needed: `value="All Lists"`, `state="selected"`, `hasLabel={false}`, `hasDescription={false}`

3. **Button Component** (`/components/ui/Button/Button.jsx`)
   - Used in: "Create new list" button, "Use in Policy" button, Documentation button
   - Props needed: Various styles and states

4. **ItemRow Component** (`/components/ui/ItemRow/ItemRow.jsx`)
   - Used in: Left panel list items, nested dropdown items
   - Props needed: `label`, `showBody={true}`, `body`, `type` (for selected state), `showLeftIcon={true}`

5. **ListOfItems Component** (`/components/ui/ListOfItems/ListOfItems.jsx`)
   - Used in: Nested dropdown structure for expandable categories
   - Props needed: `type="variant2"`, `withTitle={true}`, `title`, `items`, `open`

6. **DropdownNested Component** (`/components/ui/DropdownNested/DropdownNested.jsx`)
   - **Note**: This is a two-column dropdown, not suitable for this use case
   - Will NOT be used for the Lists page dropdown

7. **DropdownNestedColumn Component** (`/components/ui/DropdownNestedColumn/DropdownNestedColumn.jsx`)
   - **Note**: Part of the two-column dropdown structure
   - Will NOT be used for the Lists page dropdown

### New Components to Create

1. **SidebarNavigation** (`/components/SidebarNavigation/SidebarNavigation.jsx`)
   - Logo section
   - Search bar
   - Navigation sections with expand/collapse
   - Bottom action buttons

2. **PageHeader** (`/components/PageHeader/PageHeader.jsx`)
   - Page title
   - Documentation button
   - Tab navigation

3. **ListsPanel** (`/components/ListsPanel/ListsPanel.jsx`)
   - Create button
   - Search component
   - Dropdown filter (with nested dropdown)
   - List of list items

4. **ListDetailsPanel** (`/components/ListDetailsPanel/ListDetailsPanel.jsx`)
   - List title with actions
   - Info cards (Created by, Updated by, Regex Support)
   - URL List Items table

5. **InfoCard** (`/components/InfoCard/InfoCard.jsx`)
   - Reusable card for metadata display
   - Title, body, date, optional icon

6. **DataTable** (`/components/DataTable/DataTable.jsx`)
   - Table component for URL list items
   - Header row with columns: "#", "Item Name"
   - Data rows

7. **DropdownMaster** (`/components/ui/DropdownMaster/DropdownMaster.jsx`) ⭐ **NEW UI COMPONENT**
   - Nested dropdown structure matching Figma design (node-id: 3958-26759)
   - Structure:
     - Top-level item: "All lists" (non-expandable)
     - Expandable categories: "Default Category", "Your Category"
     - Nested items under each category with icons
   - Uses `ListOfItems` component pattern for expandable sections
   - Uses `ItemRow` for nested items
   - Props: `categories`, `onItemClick`, `onCategoryToggle`

---

## File Structure

```
src/
├── pages/
│   └── ListsPage/
│       ├── ListsPage.jsx
│       └── ListsPage.module.css
├── components/
│   ├── SidebarNavigation/
│   │   ├── SidebarNavigation.jsx
│   │   └── SidebarNavigation.module.css
│   ├── PageHeader/
│   │   ├── PageHeader.jsx
│   │   └── PageHeader.module.css
│   ├── ListsPanel/
│   │   ├── ListsPanel.jsx
│   │   └── ListsPanel.module.css
│   ├── ListDetailsPanel/
│   │   ├── ListDetailsPanel.jsx
│   │   └── ListDetailsPanel.module.css
│   ├── InfoCard/
│   │   ├── InfoCard.jsx
│   │   └── InfoCard.module.css
│   ├── DataTable/
│   │   ├── DataTable.jsx
│   │   └── DataTable.module.css
│   └── ui/
│       └── DropdownMaster/          ⭐ NEW UI COMPONENT
│           ├── DropdownMaster.jsx
│           └── DropdownMaster.module.css
```

---

## Implementation Steps

### Phase 1: Setup & Base Layout
1. Create `ListsPage` component in `/src/pages/ListsPage/`
2. Set up base layout structure:
   - Full viewport container (1440px × 1024px)
   - Background with gradient blobs and noise texture
   - Two-column layout (sidebar + main content)

### Phase 2: Sidebar Navigation
1. Create `SidebarNavigation` component
2. Implement logo section (30px × 30px icon + "SquareX" text)
3. Add search component (40px height)
4. Build navigation sections:
   - Monitor (collapsed)
   - Manage (expanded, with sub-items)
   - Configure (collapsed)
5. Add bottom action buttons (Avatar, Notifications with badge, Help)

### Phase 3: Page Header
1. Create `PageHeader` component
2. Add page title "Lists" (40px, Bold)
3. Add Documentation button (with book icon)
4. Implement tab navigation:
   - "20 Lists" (active, purple border-bottom 2px)
   - "5 Categories" (inactive)
   - "19 DLP Categories" (inactive)

### Phase 4: Lists Panel (Left)
1. Create `ListsPanel` component
2. Add "Create new list" button (primary style, 40px height)
3. Add search component
4. Create `DropdownMaster` component in `/components/ui/DropdownMaster/`:
   - Structure: "All lists" (top-level) + expandable categories
   - Each category uses `ListOfItems` pattern with `variant2` type
   - Nested items use `ItemRow` with file icons
   - Categories: "Default Category" and "Your Category"
   - Support expand/collapse with chevron icons
5. Add dropdown trigger using `Dropdown` component ("All Lists", selected state)
6. Build list items using `ItemRow`:
   - Each item has title and subtitle
   - Selected item has background highlight
   - Dividers between items

### Phase 5: List Details Panel (Right)
1. Create `ListDetailsPanel` component
2. Add header section:
   - Title "BlackList-Generative AI" (24px, Medium)
   - "Use in Policy" button
   - Three-dot menu icon
3. Create `InfoCard` component for metadata:
   - "Created by" card
   - "Updated by" card
   - "Regex Support" card (with danger state)
4. Add "URL List Items" section title (20px, Medium)
5. Create `DataTable` component:
   - Header row (52px height, grey background)
   - Data rows (54.67px height each)
   - Two columns: "#" (48px max-width) and "Item Name" (flex)

### Phase 6: Styling & Polish
1. Apply exact spacing from Figma:
   - Gaps: 8px, 16px, 24px, 32px as specified
   - Padding: 12px, 16px as specified
   - Margins: 24px for main content offset
2. Apply CSS variables for colors, fonts, spacing
3. Add backdrop-blur effects where needed
4. Add shadows and borders per design
5. Ensure responsive text truncation

---

## Critical Design Specifications

### Exact Measurements from Figma

#### Sidebar (256px width)
- Padding: 16px horizontal, 24px top, 35px bottom
- Logo container: 40px height
- Search: 40px height, 8px gap below
- Navigation sections: 12px gap between
- Nav item height: 40px
- Bottom buttons: 48px height

#### Main Content Area
- Top offset: 24px
- Left offset: 24px
- Width: 1136px total
- Page header gap: 32px below title
- Tab height: 40px
- Tab border-bottom: 2px when active

#### Lists Panel (272px width)
- Padding: 12px
- Border radius: 12px
- Gap between sections: 16px
- Create button: 40px height, full width
- List items: 12px padding left/right, 12px padding top/bottom
- Item gap: 4px between title and subtitle

#### List Details Panel (flexible width, min 435px)
- Padding: 16px
- Border radius: 12px
- Gap between sections: 32px
- Info cards: 16px padding, border 1px
- Table header: 52px height
- Table rows: 54.67px height
- Table cell padding: 12px

### Background Elements
- Base: `#ecedef` with backdrop-blur(10px)
- Gradient blobs: opacity 0.65, positioned absolutely
- Middle layer: gradient from `rgba(245,245,252,0.6)` to `rgba(245,245,252,0.8)`, opacity 0.3
- Noise texture: `opacity: 0.08`, `mix-blend-mode: soft-light`, `background-size: 512px 512px`

---

## Component Props & Data Structure

### ListsPage Component
```javascript
{
  // Navigation data
  navigationSections: [
    {
      id: 'monitor',
      label: 'Monitor',
      icon: '/icons/Icon (from Tabler.io).svg',
      expanded: false,
      items: []
    },
    {
      id: 'manage',
      label: 'Manage',
      icon: '/icons/Frame.svg',
      expanded: true,
      items: [
        { id: 'policies', label: 'Policies', icon: '/icons/Frame1.svg' },
        { id: 'lists', label: 'Lists', icon: '/icons/Frame2.svg', active: true },
        { id: 'users', label: 'Users', icon: '/icons/Frame3.svg' },
        // ... more items
      ]
    }
  ],
  
  // Lists data
  lists: [
    {
      id: '1',
      name: 'BlackList-Generative AI',
      type: 'URLs',
      selected: true,
      createdBy: { email: 'emma@sqrx.com', date: '1st June, 2025 at 12:32 PM' },
      updatedBy: { email: 'anant@sqrx.com', date: '1st June, 2025 at 12:32 PM' },
      regexSupport: false,
      items: [
        { id: 1, name: 'chatgpt.com' },
        { id: 2, name: 'claude.ai' },
        // ... more items
      ]
    },
    // ... more lists
  ],
  
  // Dropdown Master categories (for nested dropdown)
  dropdownCategories: [
    {
      id: 'all-lists',
      label: 'All lists',
      expandable: false,
      items: []
    },
    {
      id: 'default-category',
      label: 'Default Category',
      expandable: true,
      expanded: true,
      items: [
        { id: 'url', label: 'URL', icon: '/icons/File.svg' },
        { id: 'filename', label: 'File Name', icon: '/icons/File.svg' },
        { id: 'fileextension', label: 'File Extension', icon: '/icons/File.svg' },
        { id: 'filehash', label: 'File Hash', icon: '/icons/File.svg' },
        { id: 'extension', label: 'Extension', icon: '/icons/File.svg' }
      ]
    },
    {
      id: 'your-category',
      label: 'Your Category',
      expandable: true,
      expanded: true,
      items: [
        { id: 'advertising', label: 'Advertising', icon: '/icons/Icon.svg' },
        { id: 'entertainment', label: 'Entertainment', icon: '/icons/Icon.svg' },
        { id: 'invoice', label: 'Invoice', icon: '/icons/Icon.svg' },
        { id: 'music', label: 'Music', icon: '/icons/Icon.svg' },
        { id: 'marketing', label: 'Marketing Team', icon: '/icons/Icon.svg' }
      ]
    }
  ],
  
  // Active tab
  activeTab: 'lists', // 'lists' | 'categories' | 'dlpCategories'
}
```

---

## Styling Approach

### CSS Modules Pattern
- Each component has its own `.module.css` file
- Use CSS custom properties (variables) for design tokens
- Follow existing component patterns:
  - BEM-like naming: `.component`, `.component_element`, `.component_modifier`
  - State classes: `.state_default`, `.state_selected`, `.state_hover`
  - Type classes: `.type_medium`, `.type_small`

### Design Token Usage
- Import or define CSS variables matching Figma tokens
- Use `var(--sds-*)` syntax throughout
- Fallback values from Figma specifications

### Responsive Considerations
- Fixed viewport size: 1440px × 1024px (as per design)
- No responsive breakpoints needed (design phase only)

---

## Potential Challenges & Solutions

### Challenge 1: Background Effects
**Issue**: Complex gradient blobs and noise texture
**Solution**: 
- Use absolute positioning for gradient blobs
- Use CSS `background-image` with `url()` for noise texture
- Apply `mix-blend-mode` and opacity as specified

### Challenge 2: Glass Morphism Effects
**Issue**: Backdrop blur and semi-transparent backgrounds
**Solution**:
- Use `backdrop-filter: blur(10px)`
- Apply `rgba()` colors with appropriate opacity
- Ensure proper z-index layering

### Challenge 3: Nested Dropdown Structure
**Issue**: Dropdown master component with expandable categories (Figma node-id: 3958-26759)
**Solution**:
- Create new `DropdownMaster` component in `/components/ui/DropdownMaster/`
- Structure:
  - Top-level item: "All lists" (non-expandable, uses `ItemRow`)
  - Expandable categories: Use `ListOfItems` with `variant2` type
  - Nested items: Use `ItemRow` with `showLeftIcon={true}` and file icons
- Each category has:
  - Title with chevron (up when expanded, down when collapsed)
  - List of items with 24px left padding (indentation)
  - File icons (14px size) for each item
- Match exact styling from Figma:
  - Background: `rgba(255,255,255,0.6)` with `backdrop-blur(10px)`
  - Border: `1px solid rgba(255,255,255,0.85)`
  - Border radius: `12px`
  - Shadow: `0px 8px 20px 0px rgba(0,0,0,0.12)`

### Challenge 4: Table Styling
**Issue**: Exact row heights (54.67px) and column widths
**Solution**:
- Use fixed heights in CSS
- Use `max-width: 48px` for "#" column
- Use flex for "Item Name" column

### Challenge 5: Icon Integration
**Issue**: Multiple icon types and sizes
**Solution**:
- Use existing `/icons/` directory structure
- Import SVGs as needed
- Match exact sizes from Figma (16px, 20px, 24px, etc.)

---

## Testing Checklist

### Visual Accuracy
- [ ] All spacing matches Figma exactly (use browser dev tools to measure)
- [ ] All colors match design tokens
- [ ] All typography sizes and weights match
- [ ] All border radius values match
- [ ] All shadows and effects match
- [ ] All icon sizes and positions match

### Component Functionality
- [ ] Sidebar navigation expand/collapse works
- [ ] Search components are interactive
- [ ] Dropdown opens/closes correctly
- [ ] List item selection works
- [ ] Tab switching works
- [ ] Buttons have proper hover/focus states

### Code Quality
- [ ] Follows existing component patterns
- [ ] Uses CSS Modules correctly
- [ ] Props are properly typed (if using TypeScript) or documented
- [ ] No hardcoded values (use CSS variables)
- [ ] Clean, minimal code structure

---

## DropdownMaster Component Specification

### Component Location
`/src/components/ui/DropdownMaster/DropdownMaster.jsx`

### Design Reference
Figma node-id: **3958-26759** - "dropdown master 1"

### Structure
```
DropdownMaster
├── "All lists" (ItemRow - non-expandable)
├── "Default Category" (ListOfItems variant2 - expandable)
│   ├── URL (ItemRow with File icon, 24px left padding)
│   ├── File Name (ItemRow with File icon, 24px left padding)
│   ├── File Extension (ItemRow with File icon, 24px left padding)
│   ├── File Hash (ItemRow with File icon, 24px left padding)
│   └── Extension (ItemRow with File icon, 24px left padding)
└── "Your Category" (ListOfItems variant2 - expandable)
    ├── Advertising (ItemRow with Icon, 24px left padding)
    ├── Entertainment (ItemRow with Icon, 24px left padding)
    ├── Invoice (ItemRow with Icon, 24px left padding)
    ├── Music (ItemRow with Icon, 24px left padding)
    └── Marketing Team (ItemRow with Icon, 24px left padding)
```

### Props Interface
```javascript
{
  categories: [
    {
      id: string,
      label: string,
      expandable: boolean,
      expanded?: boolean,
      items: [
        {
          id: string,
          label: string,
          icon: string, // path to icon
        }
      ]
    }
  ],
  onItemClick: (item) => void,
  onCategoryToggle: (categoryId) => void,
  className?: string
}
```

### Styling Requirements
- Container: `backdrop-blur(10px)`, `background: rgba(255,255,255,0.6)`, `border: 1px solid rgba(255,255,255,0.85)`, `border-radius: 12px`, `shadow: 0px 8px 20px 0px rgba(0,0,0,0.12)`
- Top-level item: 8px padding (12px horizontal, 8px vertical)
- Category headers: 36px height, 12px horizontal padding, 8px vertical padding
- Nested items: 24px left padding (indentation), 8px gap between icon and text
- Icons: 14px size for nested items, positioned with 3px horizontal padding, 2px vertical padding

### Implementation Notes
- Use `ListOfItems` component with `type="variant2"` and `withTitle={true}` for expandable categories
- Use `ItemRow` for all items (top-level and nested)
- Top-level "All lists" item does NOT have expand/collapse functionality
- Category chevrons rotate: up (180deg) when expanded, down (0deg) when collapsed
- Match exact spacing and padding from Figma design

---

## Notes

1. **No Implementation Yet**: This is a design/planning phase document only
2. **Figma as Source of Truth**: All measurements, colors, and spacing must match Figma exactly
3. **Component Reuse**: Maximize use of existing components before creating new ones
4. **Design Tokens**: All design values should reference CSS variables, not hardcoded
5. **DropdownMaster Location**: Must be created in `/components/ui/DropdownMaster/` folder (not in regular components folder)
6. **Accessibility**: Consider adding proper ARIA labels and keyboard navigation (future phase)
7. **Performance**: Consider lazy loading for large lists (future optimization)

---

## Next Steps (After Approval)

1. Review and approve this plan
2. Set up file structure
3. Implement components in order (Phase 1 → Phase 6)
4. Test against Figma design
5. Refine and polish
6. Code review
7. Integration testing

