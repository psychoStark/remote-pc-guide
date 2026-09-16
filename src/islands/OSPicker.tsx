import { useState } from 'react';

const instructions: Record<string, string> = {
  windows: 'Download the Tailscale installer from tailscale.com and run it. It will appear in your system tray.',
  mac: 'Install via the Mac App Store, or run: brew install tailscale',
  linux: 'Run: curl -fsSL https://tailscale.com/install.sh | sh',
};

export default function OSPicker() {
  const [os, setOs] = useState<keyof typeof instructions>('windows');

  return (
    <div className="rounded-[var(--radius-lg)] border border-black/10 dark:border-white/10 p-5 my-6">
      <div className="flex gap-2 mb-4">
        {(['windows', 'mac', 'linux'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setOs(key)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${
              os === key
                ? 'bg-[var(--primary)] text-white'
                : 'bg-black/5 dark:bg-white/10'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <p>{instructions[os]}</p>
    </div>
  );
}
