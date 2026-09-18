---
title: "Set Up Moonlight on Your Clients"
section: "stream"
order: 6
description: "Install the client app and pair it to your host for remote streaming."
interactive: "latency-calculator"
platforms:
  windows:
    label: "Windows Client"
    badge: "Laptop / PC"
    summary: "Native low-latency client for Windows laptops and handhelds."
    code: "winget install --id CameronGutman.Moonlight -e"
    steps:
      - "Install the official Moonlight client for Windows."
      - "Moonlight will automatically discover your Sunshine/Apollo host on Tailscale."
      - "Click your host and enter the 4-digit pairing PIN into the Sunshine Web UI."
  android:
    label: "Android / Google TV"
    badge: "Phone / Shield TV"
    summary: "Best-in-class low latency streaming client for phones and smart TVs."
    steps:
      - "Install Moonlight from the Google Play Store."
      - "Ensure your phone is connected to Tailscale."
      - "Select your host and enter the pairing PIN shown on your host screen."
  ios:
    label: "iOS / iPadOS"
    badge: "iPhone / iPad"
    summary: "Supports high-refresh Promotion screens (120 Hz) and Bluetooth controllers."
    steps:
      - "Download Moonlight from the Apple App Store."
      - "Connect an Xbox, PlayStation, or Backbone controller via Bluetooth."
      - "Select your host and verify streaming quality."
  steamdeck:
    label: "Steam Deck"
    badge: "Handheld"
    summary: "Ideal for playing PC titles at full 60 or 90 FPS on Deck with battery efficiency."
    steps:
      - "Switch your Steam Deck to Desktop Mode and open the Discover Software Center."
      - "Search for Moonlight Game Streaming and click Install."
      - "Add Moonlight as a non-Steam game to launch it directly from Gaming Mode."
  mac:
    label: "macOS"
    badge: "MacBook"
    summary: "Hardware-accelerated decoding with low thermals on Apple Silicon."
    code: "brew install --cask moonlight"
    steps:
      - "Install Moonlight via Homebrew or DMG download."
      - "Pair with your Host PC using your 4-digit PIN."
---

## 1. Install the Client App

With your host running Sunshine or Apollo, the final piece is installing the **Moonlight** client on the device you want to play or work from. Moonlight is an open-source, ultra-low-latency implementation of NVIDIA's GameStream protocol, optimized for high framerates and minimal input delay.

Choose your client device from the platform selector above to get specific setup instructions.

---

## 2. Pair With Your Host

1. Ensure your client device is connected to your **Tailscale mesh network**.
2. Launch Moonlight on your client.
3. Your Host PC should appear automatically in Moonlight with a small lock icon.
4. Click your PC. Moonlight will display a unique **4-digit PIN**.
5. On your Host PC, open the Sunshine / Apollo web manager (`https://localhost:47990`), go to the **PIN** tab, enter the 4-digit PIN, and click **Send**.
6. The lock icon on Moonlight will turn green, and your desktop apps and games will appear!

---

## 3. Tune Settings for Minimal Latency

To achieve that imperceptible "local PC" feel when streaming over 5G or remote Wi-Fi, use the interactive calculator below to evaluate your latency budget and dial in the perfect bitrate:

* **Local Home Wi-Fi / Ethernet:** Set bitrate to **50–80 Mbps** (H.265 / AV1) for crystal-clear 1440p or 4K.
* **Remote 5G / Fiber:** Set bitrate to **25–40 Mbps** with a frame pacing setting of "Balanced with lowest latency".
* **Audio:** Enable 5.1 surround sound if your client supports it.
* **Input:** Enable "Optimize mouse for remote desktop" for work applications, or disable it for raw mouse input in shooters.