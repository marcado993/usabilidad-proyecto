/**
 * useTabbableText — makes every block of text reachable with the Tab key.
 *
 * WCAG 2.2 SC 2.1.1 Keyboard: all functionality is operable through a keyboard.
 * WCAG 2.2 SC 2.4.3 Focus Order: elements receive focus in DOM reading order.
 * WCAG 2.2 SC 1.3.2 Meaningful Sequence: the tab sequence follows the same
 *   order a sighted user reads the page in.
 *
 * Why this exists: normally only interactive controls are in the tab order,
 * and screen-reader users read static text with virtual-cursor keys instead of
 * Tab. But a keyboard-only user who does NOT run a screen reader (or an
 * evaluator auditing the page with Tab alone) has no way to walk through
 * static content. This hook adds tabindex="0" to every *leaf* text element so
 * Tab steps through every heading, paragraph, list item, table cell, question,
 * answer and caption on the page — nothing is skipped.
 *
 * It only marks LEAF text nodes (elements whose own direct children include
 * real text), and never marks anything already focusable or anything inside an
 * interactive control, so no element ever gets two stops in the tab order.
 */
import { useEffect } from 'react'

const CONTROLS = 'a[href], button, input, select, textarea, summary, iframe, [role="button"], [role="link"], [role="switch"], [role="radio"], [role="checkbox"], [role="tab"], [role="menuitem"], [contenteditable]'

// The element itself must not already be focusable in any way.
const SELF_FOCUSABLE = `${CONTROLS}, [tabindex]`

// Ancestor check: text inside a control belongs to that control's accessible
// name, so it must not get a second tab stop. Note this deliberately matches
// [tabindex="0"] and NOT bare [tabindex] — wrappers like .modal-box carry
// tabindex="-1" purely to be programmatically focusable, and excluding those
// would wrongly skip every piece of text inside a dialog.
const INTERACTIVE_ANCESTOR = `${CONTROLS}, [tabindex="0"]`

// Candidate text containers, in rough order of specificity.
const TEXT_TAGS = 'h1, h2, h3, h4, h5, h6, p, li, dt, dd, td, th, caption, figcaption, blockquote, legend, label, span, div, strong, em, small'

const MARKER = 'data-tabbable-text'

function hasOwnText(el) {
  // True only if the element itself holds visible text directly, rather than
  // just wrapping other elements that hold it. This is what makes it a "leaf".
  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) return true
  }
  return false
}

function isHidden(el) {
  if (el.closest('[aria-hidden="true"]')) return true
  const style = window.getComputedStyle(el)
  return style.display === 'none' || style.visibility === 'hidden'
}

export function useTabbableText(activeKey) {
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll(TEXT_TAGS).forEach(el => {
        if (el.hasAttribute(MARKER)) return
        if (el.hasAttribute('tabindex')) return          // already focusable
        if (el.matches(SELF_FOCUSABLE)) return           // is a control itself
        if (el.closest(INTERACTIVE_ANCESTOR)) return      // label of a control
        if (!hasOwnText(el)) return                      // not a text leaf
        if (isHidden(el)) return

        el.setAttribute('tabindex', '0')
        el.setAttribute(MARKER, 'true')
      })
    }

    apply()

    // Modals, lesson content, quiz questions and answers all mount later —
    // re-scan whenever the DOM changes so those become tabbable too.
    const observer = new MutationObserver(apply)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [activeKey])
}
