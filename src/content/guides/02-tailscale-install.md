---
title: "Install Tailscale on Host & Clients"
section: "network"
order: 2
description: "Install Tailscale on your PC and every device you'll connect from."
interactive: "os-picker"
platforms:
  windows:
    label: "Windows"
    badge: "Host & Client"
    summary: "Install Tailscale with the official installer or using the Windows Package Manager."
    code: "winget install --id Tailscale.Tailscale -e"
    steps:
      - "Run the installer or execute the winget command above."
      - "Launch Tailscale from the Windows notification area and log in using your SSO identity provider."
      - "Verify that your Host PC appears in the Tailscale Admin Console."
  mac:
    label: "macOS"
    badge: "Client"
    summary: "Install the standalone app from the Mac App Store or using Homebrew."
    code: "brew install --cask tailscale"
    steps:
      - "Install Tailscale via the Mac App Store or Homebrew."
      - "Launch Tailscale, grant network extension permissions, and sign in."
      - "Confirm your Mac shows connected to your tailnet."
  linux:
    label: "Linux"
    badge: "Host / Subnet"
    summary: "One-line automated installation script for all major Linux distributions."
    code: "curl -fsSL https://tailscale.com/install.sh | sh"
    steps:
      - "Run the official one-line install script in your terminal."
      - "Authenticate and connect by running: sudo tailscale up"
      - "Verify that your machine gets assigned a 100.x.y.z IP address."
  android:
    label: "Android"
    badge: "Mobile"
    summary: "Official high-performance mobile client available on Google Play."
    steps:
      - "Install the Tailscale app from the Google Play Store."
      - "Sign in with the same SSO provider account."
      - "Toggle the connection switch on to join your private mesh."
  ios:
    label: "iOS / iPadOS"
    badge: "Mobile"
    summary: "Native iOS client with on-demand VPN tunnel support."
    steps:
      - "Download Tailscale from the Apple App Store."
      - "Sign in and allow iOS to install the WireGuard VPN configuration profile."
      - "Toggle the VPN switch to connect to your PC remotely."
---

## 1. Connect the Host PC

Your Host PC is the primary gaming or workstation machine you want to access remotely. Use the interactive platform selector above to install Tailscale for your operating system.

Once installed:
1. Launch Tailscale on your host machine.
2. It will open a browser window requesting authentication.
3. Log in using the exact same identity provider you used in Step 1.

Your PC is now part of your secure mesh network (your "tailnet") and receives a dedicated, static Tailscale IP address (typically `100.x.y.z`).

---

## 2. Connect Your Client Devices

Clients are the devices you will use when away from home—your laptop, smartphone, iPad, or Steam Deck. 

Install the Tailscale client on each device and log in with the identical SSO account. Within seconds, all your machines will discover each other over an end-to-end encrypted WireGuard tunnel without needing any router port forwarding.

---

## 3. Crucial: Disable Key Expiry on the Host

By default, Tailscale requires devices to re-authenticate every 180 days for security. If your Host PC's key expires while you are traveling, you will be locked out until you get back home. We need to disable key expiry for the Host.

1. Open the [Tailscale Admin Console](https://login.tailscale.com/admin/machines) in your web browser.
2. Locate your **Host PC** in the machines list.
3. Click the three-dot menu icon (`...`) on the far right of its row.
4. Select **Disable key expiry**.

Your host machine will now stay continuously reachable on your tailnet indefinitely. Next, we will configure a subnet router so you can reach sleeping devices and smart home hardware.