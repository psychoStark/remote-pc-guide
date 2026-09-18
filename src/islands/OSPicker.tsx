import { useMemo, useState } from 'react';
import { triggerHaptic } from '../lib/haptics';

export type PlatformConfig = {
  label: string;
  badge?: string;
  summary?: string;
  steps: string[];
  code?: string;
};

export type PlatformsRecord = Record<string, PlatformConfig>;

interface OSPickerProps {
  platforms?: PlatformsRecord;
}

const defaultPlatforms: PlatformsRecord = {
  windows: {
    label: 'Windows',
    badge: 'Host & Client',
    summary: 'Install Tailscale with the official Windows package or quick winget command.',
    code: 'winget install --id Tailscale.Tailscale -e',
    steps: [
      'Download and run the official Windows installer (or use the winget command above).',
      'Open the Tailscale tray icon and log in using your preferred SSO identity provider.',
      'Confirm the device appears as connected in the Tailscale Admin Console.',
    ],
  },
  mac: {
    label: 'macOS',
    badge: 'Client',
    summary: 'Use the native App Store build or install via Homebrew.',
    code: 'brew install --cask tailscale',
    steps: [
      'Install Tailscale from the Mac App Store or via Homebrew.',
      'Launch the app, sign in, and approve the network extension prompt when requested.',
      'Verify your Mac shows up in your Tailscale mesh network.',
    ],
  },
  linux: {
    label: 'Linux',
    badge: 'Host / Subnet',
    summary: 'Single-line automated script for Debian, Ubuntu, Arch, and Fedora.',
    code: 'curl -fsSL https://tailscale.com/install.sh | sh',
    steps: [
      'Run the official one-line install script in your terminal.',
      'Start Tailscale and authenticate with: sudo tailscale up',
      'Confirm your Linux machine connects and displays its 100.x.y.z IP address.',
    ],
  },
  android: {
    label: 'Android',
    badge: 'Mobile Client',
    summary: 'Official high-performance mobile client available on Google Play.',
    steps: [
      'Install Tailscale from the Google Play Store.',
      'Open the app and authenticate with the same identity provider.',
      'Toggle the connection switch to active. Your phone is now part of the mesh.',
    ],
  },
  ios: {
    label: 'iOS / iPadOS',
    badge: 'Mobile Client',
    summary: 'Native iOS client with on-demand VPN tunnel support.',
    steps: [
      'Download Tailscale from the Apple App Store.',
      'Sign in and allow iOS to install the WireGuard VPN configuration profile.',
      'Toggle the VPN switch to connect to your PC remotely.',
    ],
  },
};

export default function OSPicker({ platforms }: OSPickerProps) {
  const activePlatforms = platforms && Object.keys(platforms).length > 0 ? platforms : defaultPlatforms;
  const platformKeys = useMemo(() => Object.keys(activePlatforms), [activePlatforms]);

  const [selectedKey, setSelectedKey] = useState<string>(platformKeys[0] || 'windows');
  const [copied, setCopied] = useState(false);

  const selected = useMemo(() => {
    return activePlatforms[selectedKey] || activePlatforms[platformKeys[0]];
  }, [activePlatforms, selectedKey, platformKeys]);

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    triggerHaptic('selection');
  };

  const handleCopy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      triggerHaptic('success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (!selected) return null;

  return (
    <section aria-label="Platform installation steps" className="my-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-container)] p-6 shadow-xl backdrop-blur-xl transition-all duration-300">
      {/* Segmented Platform Tabs (Rounded-Full Pills) */}
      <div className="flex flex-wrap items-center gap-2 pb-5 border-b border-[var(--border)]">
        {platformKeys.map((key) => {
          const item = activePlatforms[key];
          const isActive = key === selectedKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleSelect(key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                isActive
                  ? 'bg-gradient-to-r from-[var(--primary)] to-violet-600 text-white shadow-md shadow-[var(--primary)]/20'
                  : 'bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-highest)] hover:text-[var(--on-surface)]'
              }`}
              aria-pressed={isActive}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[var(--secondary-soft)] text-[var(--secondary)]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Platform Content */}
      <div className="mt-5 space-y-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-bold text-[var(--on-surface)]">{selected.label} Setup</h3>
            {selected.badge && (
              <span className="rounded-full bg-[var(--secondary-soft)] border border-[var(--secondary)]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--secondary)] uppercase tracking-wider">
                {selected.badge}
              </span>
            )}
          </div>
          {selected.summary && (
            <p className="mt-1.5 text-sm text-[var(--on-surface-muted)] leading-relaxed">{selected.summary}</p>
          )}
        </div>

        {/* Steps Ordered List with Rounded Numbers */}
        <ol className="space-y-3 text-sm text-[var(--on-surface)]">
          {selected.steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-container-high)] text-xs font-mono font-bold text-[var(--primary)] border border-[var(--border)]">
                {idx + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        {/* Command Code Block with Copy Action (Rounded-2xl) */}
        {selected.code && (
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[#07090e] p-4 text-white shadow-inner">
            <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
              <span className="font-mono text-[11px] tracking-wider uppercase text-emerald-400">Terminal Command</span>
              <button
                type="button"
                onClick={() => handleCopy(selected.code!)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/20 active:scale-95 focus-visible:outline-none"
                aria-label="Copy code snippet to clipboard"
              >
                {copied ? (
                  <>
                    <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto font-mono text-xs text-emerald-300/90 leading-relaxed">
              <code>{selected.code}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
