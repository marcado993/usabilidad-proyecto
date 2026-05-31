/**
 * TEMPLATES — Fluento Design System
 * Page-level layout structures. No business logic.
 */
import { Sidebar, PageHeader } from '../organisms'

// ── AppLayout: sidebar + sticky header + scrollable content ─────────
// Used by all authenticated pages (student + teacher)
export function AppLayout({ user, nav, activeNav, navItems, title, parent, children }) {
  return (
    <div className="app-layout">
      <Sidebar user={user} activeNav={activeNav} nav={nav} items={navItems} />
      <div className="main-content">
        <PageHeader title={title} parent={parent} user={user} nav={nav} />
        <div className="page-inner">{children}</div>
      </div>
    </div>
  )
}

// ── AuthLayout: hero panel + form panel ─────────────────────────────
// Used by Login and Register pages
export function AuthLayout({ heroContent, formContent }) {
  return (
    <main className="auth-layout">
      <div className="auth-hero" aria-hidden="true">
        {heroContent}
      </div>
      <section className="auth-form-area">
        {formContent}
      </section>
    </main>
  )
}
