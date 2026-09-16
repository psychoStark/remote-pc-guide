---
title: "Configure Wake-on-LAN (WoL)"
section: "routing"
order: 4
description: "Wake your PC remotely before starting a session."
---

## The Magic Packet

Now that your subnet node is securely bridging your remote devices to your local home network, you can wake your asleep or powered-off PC remotely. We do this by sending a "Magic Packet" over the network. 

Because WoL relies on your motherboard's hardware, it generally requires your PC to be connected to your router via an **Ethernet cable**, not Wi-Fi.

---

## Step 1: Enable WoL in your BIOS/UEFI

First, we need to tell your motherboard to listen for wake commands even when the PC is off.

1. Restart your PC and rapidly press **DEL** or **F2** (depending on your motherboard) to enter the BIOS.
2. Navigate to the **Power Management** or **Advanced** settings tab.
3. Look for a setting named **Wake on LAN**, **Power On By PCI-E**, or **Resume By MAC/LAN**.
4. Set this to **Enabled**.
5. Save your changes and boot into Windows.

---

## Step 2: Configure Windows Network Adapter

Next, Windows needs to be configured to allow the network adapter to wake the system.

1. Right-click the Windows Start button and select **Device Manager**.
2. Expand the **Network adapters** section and double-click your primary Ethernet controller (e.g., Realtek, Intel, or Killer).
3. Go to the **Advanced** tab. Scroll down to find **Wake on Magic Packet** and set its value to **Enabled**.
4. Switch to the **Power Management** tab.
5. Check the boxes for both **Allow this device to wake the computer** and **Only allow a magic packet to wake the computer**.
6. Click **OK**.

---

## Step 3: Waking the PC Remotely

Because your mobile device is connected to your home network via your Tailscale Subnet Node, sending a WoL packet works exactly as if you were sitting on your couch on your home Wi-Fi.

1. On your smartphone, download a standard Wake-on-LAN app (like *Wake On Lan* for Android or *Mocha WOL* for iOS).
2. Ensure you are connected to your Tailscale VPN on your phone.
3. Open the WoL app and add a new device.
4. Enter your Host PC's **Local IP address** (e.g., `192.168.1.6`) and its **MAC address**.
5. Tap the device in the app to send the wake command. 

Within a few seconds, you should hear your PC boot up!

> **Hardware Fallback:** Wake-on-LAN is great, but Windows updates or power outages can occasionally break it. If you want a 100% reliable, hardware-level backup to physically press your PC's power button over the network, proceed to the optional **ESP32 SwitchBot** section.