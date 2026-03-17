# DESIGN_SYSTEM.md - Design Standards

> Internal design standards for AI-generated interfaces

---

## Colors

| Role | Color | Usage |
|------|-------|-------|
| Primary | `#007AFF` | Buttons, links, accents |
| Background | `#FFFFFF` | Main background |
| Surface | `#F8F9FA` | Cards, secondary areas |
| Text | `#1C1C1E` | Primary text |
| Text Secondary | `#6B7280` | Secondary text |

---

## Spacing

8pt Grid System: `4, 8, 16, 24, 32, 48, 64`

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

---

## UI Guidelines

- **Framework**: Use Shadcn/ui or Tailwind CSS
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG AA (contrast ratio ≥ 4.5:1)
- **Border Radius**: 8px standard, 12px for cards
- **Typography**: System sans-serif (Inter, SF Pro)

---

## Implementation Rules

1. Always use existing component libraries before creating new ones
2. Maintain visual consistency with existing codebase
3. Test responsive layout before completing
4. Provide proper loading/empty/error states

---

*This file defines design standards for all AI-generated interfaces*
