/**
 * Centralized, calibrated haptic feedback utility for all interactive elements.
 * Provides distinct haptic profiles tailored to each interaction type.
 * Automatically respects prefers-reduced-motion and throttles rapid triggers.
 */

export type HapticType =
  | 'tick'
  | 'selection'
  | 'navigation'
  | 'theme'
  | 'copy'
  | 'celebration'
  | 'warning';

let lastHapticTime = 0;
const THROTTLE_MS = 50;

export function triggerHaptic(type: HapticType = 'selection'): void {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) {
    return;
  }

  // Respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const now = Date.now();
  if (now - lastHapticTime < THROTTLE_MS) {
    return;
  }
  lastHapticTime = now;

  try {
    switch (type) {
      case 'tick':
        // Barely perceptible micro-tick (4ms) for minor chips/subtle interactions
        navigator.vibrate(4);
        break;

      case 'selection':
        // Crisp, tactile click (10ms) for tabs, segmented buttons, and option chips
        navigator.vibrate(10);
        break;

      case 'navigation':
        // Firm, directional impulse (16ms) for moving between guide steps and pages
        navigator.vibrate(16);
        break;

      case 'theme':
        // Snappy tactile double-flip [10ms, pause 40ms, 14ms] for sun/moon theme switch
        navigator.vibrate([10, 40, 14]);
        break;

      case 'copy':
        // Crisp double confirmation [12ms, pause 25ms, 12ms] for copying terminal commands
        navigator.vibrate([12, 25, 12]);
        break;

      case 'celebration':
        // Triumphant triple-pulse [14ms, pause 35ms, 10ms, pause 35ms, 18ms] for stack completion
        navigator.vibrate([14, 35, 10, 35, 18]);
        break;

      case 'warning':
        // Firmer, alert vibration (30ms)
        navigator.vibrate(30);
        break;
    }
  } catch {
    // Ignore any browser vibration permission restrictions
  }
}

/**
 * Initializes global event delegation for haptic feedback across all pages.
 * Handles buttons, links, cards, and data-haptic annotated elements automatically.
 */
export function initGlobalHaptics(): void {
  if (typeof document === 'undefined') return;

  // Prevent multiple bindings
  if ((window as any).__haptics_initialized) return;
  (window as any).__haptics_initialized = true;

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement)?.closest(
      '[data-haptic], a[href], button, input[type="radio"], input[type="checkbox"], summary'
    ) as HTMLElement | null;

    if (!target) return;

    // 1. Explicit data-haptic attribute takes highest priority
    const explicitHaptic = target.getAttribute('data-haptic') as HapticType | null;
    if (explicitHaptic) {
      triggerHaptic(explicitHaptic);
      return;
    }

    // 2. Specialized button types
    if (target.matches('[data-theme-toggle]')) {
      triggerHaptic('theme');
      return;
    }

    if (target.matches('.copy-btn, [data-copy-btn]')) {
      triggerHaptic('copy');
      return;
    }

    if (target.matches('[data-step-card-complete], [data-celebrate]')) {
      triggerHaptic('celebration');
      return;
    }

    // 3. Navigation links and cards
    if (target.matches('a[href], [data-next-step], [data-step-card]')) {
      triggerHaptic('navigation');
      return;
    }

    // 4. Interactive buttons and controls
    if (target.matches('button, [role="tab"], [role="button"]')) {
      triggerHaptic('selection');
      return;
    }
  }, { passive: true });
}
