---
title: "Set Up Moonlight on Your Clients"
section: "stream"
order: 6
description: "Install the client app and pair it to your host for remote streaming."
---

## Install the Client App

Once the host is ready, the final piece is installing the client that will receive the stream from your PC. The best-supported client is **Moonlight**, which is the official client for Sunshine/Sunshine-based hosts and is lightweight, fast, and easy to set up.

### Available clients

- **Moonlight** on Windows, Android, iPhone, and iPad
- **Artemis** for newer Android or Linux devices if you want a cleaner UI or additional tuning

For most users, **Moonlight** is the simplest and most reliable choice.

---

## Step 1: Install Moonlight

1. Download the client from the official app or release page for your device.
2. Install it on the device you plan to use remotely.
3. Launch the app after installation.

---

## Step 2: Pair With Your Host

1. On your host PC, confirm the Sunshine/Apollo web UI is running and reachable.
2. Open Moonlight on your client device.
3. It should automatically detect the host if both devices are on the same Tailscale network.
4. Select your host and sign in with the credentials you created in the host setup.

If the host does not appear automatically, add it manually with the host's Tailscale IP address and the pairing PIN displayed in the Sunshine/Apollo Web UI.

---

## Step 3: Tweak the Stream for Low Latency

Once connected:

- Use the lowest-latency mode available in Moonlight
- Prefer a wired connection when possible for faster response
- Set the display resolution to match your client device
- Enable hardware acceleration if supported by your GPU

You are now connected to your home PC from anywhere with a secure, low-latency remote session.

The last optional step is adding a hardware fallback if you want a guaranteed way to power the PC on without relying on software wake methods.