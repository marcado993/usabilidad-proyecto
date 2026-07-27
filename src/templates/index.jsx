/**
 * TEMPLATES — Fluento Design System
 * Page-level layout structures. No business logic.
 */
import { Sidebar, PageHeader } from '../organisms'

// ── AppLayout: sidebar + sticky header + scrollable content ─────────
// Used by all authenticated pages (student + teacher)
// WCAG 2.2 SC 2.4.1 Bypass Blocks: the skip-link lets keyboard/screen-reader
// users jump past the repeated sidebar+header nav straight to <main>.
export function AppLayout({ user, nav, activeNav, navItems, title, parent, children }) {
  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Sidebar user={user} activeNav={activeNav} nav={nav} items={navItems} />
      <div className="main-content">
        <PageHeader title={title} parent={parent} user={user} nav={nav} />
        {/* tabIndex={-1} is what makes the skip link actually work. Browsers
            only move focus to focusable elements, so without it "Skip to main
            content" just scrolls: focus stays behind and the next Tab walks
            back through the whole sidebar — the exact block the link exists to
            bypass. WCAG 2.2 SC 2.4.1 Bypass Blocks. */}
        <main id="main-content" className="page-inner" tabIndex={-1}>{children}</main>
      </div>
    </div>
  )
}

// ── AuthLayout: hero panel + form panel ─────────────────────────────
// Used by Login and Register pages
// WCAG 2.2 SC 2.4.1 Bypass Blocks: skip-link to the form heading.
// SC 1.3.1 Info and Relationships / SC 4.1.2 Name, Role, Value: the
// decorative hero is never marked aria-hidden here — it holds the page's
// only <h1> (see LoginPage/RegisterPage), so hiding it would remove the
// page's heading and the feature carousel from assistive tech entirely.
export function AuthLayout({ heroContent, formContent }) {
  return (
    <main className="auth-layout">
      <a href="#auth-form-heading" className="skip-link">Skip to form</a>
      <div className="auth-hero">
        {heroContent}
      </div>
      <section className="auth-form-area">
        {formContent}
      </section>
    </main>
  )
}
