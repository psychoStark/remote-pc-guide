/**
 * Centralized, subtle haptics utility for interactive feedback.
 * Respects user's reduced-motion preference and throttles rapid triggers.
 */

type HapticType = 'light' | 'selection' | 'success' | 'warning';

let lastHapticTime = 0;
const THROTTLE_MS = 60;

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
      case 'light':
        // Barely perceptible tap
        navigator.vibrate(6);
        break;
      case 'selection':
        // Subtle click
        navigator.vibrate(12);
        break;
      case 'success':
        // Crisp double tap
        navigator.vibrate([10, 30, 10]);
        break;
      case 'warning':
        // Slightly firmer pulse
        navigator.vibrate(25);
        break;
    }
  } catch {
    // Ignore any browser vibration permission restrictions
  }
}
