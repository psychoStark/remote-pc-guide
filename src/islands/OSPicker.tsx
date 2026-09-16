import { useMemo, useState } from 'react';

type PlatformKey = 'windows' | 'mac' | 'linux';

type PlatformConfig = {
  label: string;
  summary: string;
  steps: string[];
  code?: string;
};

const platformInstructions: Record<PlatformKey, PlatformConfig> = {
  windows: {
    label: 'Windows',
    summary: 'Install Tailscale with the official Windows package and sign in to your tailnet.',
    steps: [
      'Download the Tailscale installer from tailscale.com.',
      'Run the installer and complete the setup prompts.',
      'Open the Tailscale icon in the system tray and sign in with your account.',
    ],
    code: 'winget install --id Tailscale.Tailscale -e',
  },
  mac: {
    label: 'macOS',
    summary: 'Use the native app or a quick Homebrew install depending on your preference.',
    steps: [
      'Install the macOS app from the official Tailscale site or App Store.',
      'Open the app, sign in, and approve the system extension prompt.',
      'Verify the device appears in the Tailscale admin console.',
    ],
    code: 'brew install tailscale',
  },
  linux: {
    label: 'Linux',
    summary: 'Use the quick install script for Debian/Ubuntu-based systems or your distro package manager.',
    steps: [
      'Run the official install script to add the Tailscale package repository.',
      'Enable the Tailscale service and authenticate the device.',
      'Check that your node shows up in the admin panel and is connected.',
    ],
    code: 'curl -fsSL https://tailscale.com/install.sh | sh',
  },
};

const platformKeys = Object.keys(platformInstructions) as PlatformKey[];

export default function OSPicker() {
  const [platform, setPlatform] = useState<PlatformKey>('windows');
  const selected = useMemo(() => platformInstructions[platform], [platform]);

  const handleSelect = (next: PlatformKey) => {
    setPlatform(next);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(30);
    }
  };

  return (
    <div className="my-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap gap-2">
        {platformKeys.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSelect(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              platform === key
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'bg-[var(--surface-muted)] text-[var(--on-surface)] hover:bg-[var(--surface-muted)]/80'
            }`}
            aria-pressed={platform === key}
          >
            {platformInstructions[key].label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{selected.label}</p>
          <p className="mt-2 text-[var(--on-surface-muted)]">{selected.summary}</p>
        </div>

        <ol className="list-decimal space-y-2 pl-5 text-[var(--on-surface)]">
          {selected.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        {selected.code && (
          <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-[#111827] p-4 text-sm text-[#e5e7eb]">
            <code>{selected.code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
