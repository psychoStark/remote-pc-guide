import { useMemo, useState } from 'react';
import { triggerHaptic } from '../lib/haptics';

interface Option {
  id: string;
  label: string;
  sublabel: string;
  latencyMs: number;
}

const GPU_ENCODERS: Option[] = [
  { id: 'nvenc', label: 'Nvidia RTX (NVENC)', sublabel: 'Fastest hardware encoder', latencyMs: 1.5 },
  { id: 'quicksync', label: 'Intel (QuickSync)', sublabel: 'Clean modern AV1/HEVC', latencyMs: 2.8 },
  { id: 'amf', label: 'AMD Radeon (AMF)', sublabel: 'Good HEVC performance', latencyMs: 3.8 },
];

const CONNECTIONS: Option[] = [
  { id: 'local', label: 'Home LAN / Wi-Fi 6', sublabel: 'Direct low-noise connection', latencyMs: 2.5 },
  { id: 'tailscale-direct', label: 'Tailscale Direct (5G / Remote Fiber)', sublabel: 'Peer-to-peer WireGuard', latencyMs: 18.0 },
  { id: 'tailscale-derp', label: 'Tailscale DERP Relay', sublabel: 'Strict symmetric NAT fallback', latencyMs: 48.0 },
];

const RESOLUTIONS: Option[] = [
  { id: '1080p60', label: '1080p @ 60 FPS', sublabel: 'Sweet spot for mobile phones', latencyMs: 5.0 },
  { id: '1440p120', label: '1440p @ 120 FPS', sublabel: 'High refresh rate smoothness', latencyMs: 2.5 },
  { id: '4k60', label: '4K UHD @ 60 FPS', sublabel: 'Maximum crispness for TV / tablet', latencyMs: 7.0 },
];

export default function LatencyCalculator() {
  const [gpu, setGpu] = useState<string>('nvenc');
  const [connection, setConnection] = useState<string>('tailscale-direct');
  const [resolution, setResolution] = useState<string>('1080p60');

  const selectedGpu = useMemo(() => GPU_ENCODERS.find((g) => g.id === gpu)!, [gpu]);
  const selectedConn = useMemo(() => CONNECTIONS.find((c) => c.id === connection)!, [connection]);
  const selectedRes = useMemo(() => RESOLUTIONS.find((r) => r.id === resolution)!, [resolution]);

  const totalLatency = useMemo(() => {
    return Math.round((selectedGpu.latencyMs + selectedConn.latencyMs + selectedRes.latencyMs) * 10) / 10;
  }, [selectedGpu, selectedConn, selectedRes]);

  const qualityBadge = useMemo(() => {
    if (totalLatency <= 16) {
      return {
        label: 'Esports Ready / Imperceptible',
        color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
        dot: 'bg-emerald-400',
        advice: 'Zero perceptible lag. Perfect for fast-paced shooters, fighting games, and precision desktop navigation.',
      };
    } else if (totalLatency <= 35) {
      return {
        label: 'Console Fluid / Seamless',
        color: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
        dot: 'bg-purple-400',
        advice: 'Feels identical to playing on a local Xbox or PS5. Highly recommended for Elden Ring, Cyberpunk, and productivity.',
      };
    } else {
      return {
        label: 'Playable / Turn-based & Media',
        color: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
        dot: 'bg-amber-400',
        advice: 'DERP relay mode detected. Check if your home router can open UDP ports so Tailscale switches to Direct Peer-to-Peer.',
      };
    }
  }, [totalLatency]);

  return (
    <div className="my-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-container)] p-6 shadow-xl backdrop-blur-xl transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--secondary)]">Interactive Tuning</span>
          <h3 className="text-xl font-bold text-[var(--on-surface)]">Streaming Latency Estimator</h3>
        </div>
        <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold ${qualityBadge.color}`}>
          <span className={`h-2 w-2 rounded-full ${qualityBadge.dot} animate-pulse`}></span>
          <span>{qualityBadge.label}</span>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* GPU Encoder Selection */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--on-surface-variant)] block mb-2.5">
            1. Host Graphics Encoder
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {GPU_ENCODERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setGpu(item.id);
                  triggerHaptic('selection');
                }}
                className={`rounded-2xl p-3 text-left border transition-all duration-200 active:scale-98 ${
                  gpu === item.id
                    ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--on-surface)] shadow-sm'
                    : 'border-[var(--border)] bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="font-semibold text-xs text-[var(--on-surface)]">{item.label}</div>
                <div className="text-[11px] text-[var(--on-surface-muted)] mt-0.5">{item.sublabel}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Network Connection Selection */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--on-surface-variant)] block mb-2.5">
            2. Network Path & Mesh Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CONNECTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setConnection(item.id);
                  triggerHaptic('selection');
                }}
                className={`rounded-2xl p-3 text-left border transition-all duration-200 active:scale-98 ${
                  connection === item.id
                    ? 'border-[var(--secondary)] bg-[var(--secondary-soft)] text-[var(--on-surface)] shadow-sm'
                    : 'border-[var(--border)] bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="font-semibold text-xs text-[var(--on-surface)]">{item.label}</div>
                <div className="text-[11px] text-[var(--on-surface-muted)] mt-0.5">{item.sublabel}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Resolution & FPS Selection */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--on-surface-variant)] block mb-2.5">
            3. Client Stream Target
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {RESOLUTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setResolution(item.id);
                  triggerHaptic('selection');
                }}
                className={`rounded-2xl p-3 text-left border transition-all duration-200 active:scale-98 ${
                  resolution === item.id
                    ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--on-surface)] shadow-sm'
                    : 'border-[var(--border)] bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="font-semibold text-xs text-[var(--on-surface)]">{item.label}</div>
                <div className="text-[11px] text-[var(--on-surface-muted)] mt-0.5">{item.sublabel}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Calculation Results Card (Rounded-2xl) */}
        <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-container-lowest)] p-5 mt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[var(--on-surface-muted)]">Estimated Total End-to-End Latency</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-3xl font-extrabold text-[var(--on-surface)]">{totalLatency}</span>
                <span className="font-mono text-base font-medium text-[var(--secondary)]">ms</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[var(--on-surface-variant)]">
              <div>
                <span className="text-[var(--on-surface-muted)] block text-[10px]">Encode</span>
                <span className="font-semibold text-[var(--on-surface)]">{selectedGpu.latencyMs}ms</span>
              </div>
              <span className="text-gray-500">+</span>
              <div>
                <span className="text-[var(--on-surface-muted)] block text-[10px]">Network</span>
                <span className="font-semibold text-[var(--on-surface)]">{selectedConn.latencyMs}ms</span>
              </div>
              <span className="text-gray-500">+</span>
              <div>
                <span className="text-[var(--on-surface-muted)] block text-[10px]">Decode</span>
                <span className="font-semibold text-[var(--on-surface)]">{selectedRes.latencyMs}ms</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-[var(--on-surface-muted)] leading-relaxed border-t border-[var(--border)] pt-3">
            💡 <strong className="text-[var(--on-surface)]">Tuning recommendation:</strong> {qualityBadge.advice}
          </p>
        </div>
      </div>
    </div>
  );
}
