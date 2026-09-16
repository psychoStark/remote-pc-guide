---
title: "Configure Sunshine / Apollo (Host)"
section: "stream"
order: 5
description: "Set up the low-latency encoding host on your PC."
---

## Why We Aren't Using "Original" Sunshine

While the original LizardByte Sunshine project laid the groundwork, the self-hosted streaming community has largely migrated to two powerful forks: **Foundation Sunshine** and **Apollo**. 

Traditional Sunshine often requires complex scripts and HDMI "dummy plugs" to change your PC's resolution to match your phone or TV. These modern forks include **built-in Virtual Display drivers**. The moment you connect, they generate a synthetic, invisible monitor that automatically perfectly matches your client device's resolution, refresh rate, and HDR capabilities.

---

## Step 1: Choose Your Host Software

Pick the one that best fits your needs. Both are free, open-source, and install identically.

### Option A: Apollo
*Best for multiple devices and ease of use.*
Apollo pairs perfectly with the Artemis client. It automatically remembers the resolution of each device you connect (e.g., your Steam Deck vs. your 4K TV) and assigns fixed identities so Windows natively remembers your display layout automatically. 
* **Download:** [Apollo on GitHub](https://github.com/ClassicOldSong/Apollo)

### Option B: Foundation Sunshine
*Best for OLED screens and advanced HDR.*
If you are streaming to high-end HDR devices, Foundation Sunshine is the way to go. It supports both standard HDR10 and HLG encoding at the encoding layer, which maps brightness perfectly to your client's screen, preventing crushed blacks or blown-out highlights. It also supports remote microphone passthrough.
* **Download:** [Foundation Sunshine on GitHub](https://github.com/AlkaidLab/foundation-sunshine)

---

## Step 2: Installation & The Web UI

Both forks share the same core architecture. 

1. Download the latest Windows `.exe` installer from the Releases page of your chosen project.
2. Run the installer. **Important:** When prompted, ensure you check the box to install the **Virtual Display Driver** (SudoVDA for Apollo, or ZakoVDD for Foundation).
3. Once installed, the host runs entirely in the background. It does not have a standard app window.
4. Open your web browser on the Host PC and navigate to: `https://localhost:47990`.
5. Your browser will warn you that the connection is not private (because it's a local self-signed certificate). Click **Advanced** and **Proceed to localhost**.
6. Create a username and password. You will use this to manage your stream settings later.

---

## Step 3: Enable the Virtual Display

To make sure your remote sessions are completely independent of your physical monitor:

1. Log into your new Web UI at `https://localhost:47990`.
2. Navigate to the **Configuration** tab, then find the **Audio/Video** section.
3. Enable **Virtual Display** (or **Headless Mode** if you are on a dual-GPU laptop).
4. Save your settings and restart the host service when prompted.

Your PC is now a low-latency, hardware-accelerated cloud gaming server. It's time to install the client app on your remote devices to complete the connection.