---
title: "Add a Subnet Node (Pi / Old Phone)"
section: "routing"
order: 3
description: "Route local network access through a lightweight always-on device."
---

## Why Do You Need a Subnet Node?

If your Host PC is turned off or asleep, its Tailscale connection is dead. You cannot connect to a sleeping PC over Tailscale to send a wake command. 

To fix this, we need a low-power, "always-on" device sitting physically inside your home network. This device acts as a bridge. When you are away from home, your mobile device connects to this bridge via Tailscale, and the bridge sends the Wake-on-LAN signal (or talks to your ESP32 SwitchBot) on your behalf.

---

## Option A: Using an Old Android Phone

If you have a spare Android phone, this is the easiest, zero-cost method.

1. Connect the phone to your home Wi-Fi and keep it plugged into a wall charger.
2. Install the **Tailscale app** from the Google Play Store and log in.
3. Tap the three-dot menu in the top right corner of the app.
4. Enable **Run as subnet router**.
5. The app will ask for your local subnet range. Usually, this is `192.168.1.0/24` or `10.0.0.0/24`. Check your router settings if you are unsure, and enter that value.

---

## Option B: Using a Raspberry Pi (Linux)

If you have a Raspberry Pi or an always-on Linux mini-PC, it makes the perfect, invisible subnet router.

1. Install Tailscale using the standard Linux command:
   ```bash
   curl -fsSL https://tailscale.com/install.sh | sh

```

2. Enable IP forwarding (this is required for Linux to route traffic):
```bash
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf

```


3. Start Tailscale and advertise your local subnet *(replace `192.168.1.0/24` with your actual network range)*:
```bash
sudo tailscale up --advertise-routes=192.168.1.0/24

```



---

## Final Step: Approve the Route

By default, Tailscale won't start routing your traffic until you explicitly approve it for security reasons.

1. Open the [Tailscale Admin Console](https://login.tailscale.com/admin/machines) on your web browser.
2. Find your Android Phone or Raspberry Pi in the list of machines.
3. Notice the blue **Subnets** badge beneath the machine name. Click the three-dot menu icon (`...`) on the right.
4. Select **Edit route settings**.
5. Under Subnet routes, check the box next to your local IP range to approve it.

> **Tip:** We highly recommend disabling **Key Expiry** for this node as well, just like you did for the Host PC, so it never disconnects while you are away.

Your subnet node is now active. You can now access any local smart device in your house from anywhere in the world, securely.