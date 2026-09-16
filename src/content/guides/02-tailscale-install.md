---
title: "Install Tailscale on Host & Clients"
section: "network"
order: 2
description: "Install Tailscale on your PC and every device you'll connect from."
interactive: "os-picker"
---

Pick your platform below for exact install steps.

*(The interactive OS picker will be rendered here automatically)*

## 1. Connect the Host PC

Your Host PC is the heavy-lifter you want to access remotely. After following the installation step from the picker above:

1. Launch Tailscale on your machine.
2. It will open a browser window requesting authentication.
3. Log in using the exact same identity provider you used to create your account.

Your PC is now part of your secure mesh network (your "tailnet"). 

---

## 2. Connect Your Client Devices

Clients are the devices you'll use while you are away (like your phone, tablet, or a thin-and-light laptop).

* **Android:** Download Tailscale from the Google Play Store.
* **iOS / iPadOS:** Download Tailscale from the Apple App Store.

Install the app, open it, and log in with your account. You will immediately see your Host PC listed on the screen along with its dedicated Tailscale IP address (which always starts with `100.x.x.x`). 

---

## 3. Crucial: Disable Key Expiry

For security, Tailscale requires devices to re-authenticate every 180 days by default. If your Host PC's key expires while you are traveling, you will be locked out until you get back home. We need to disable this for the Host.

1. Go to the [Tailscale Admin Console](https://login.tailscale.com/admin/machines) on the web.
2. Locate your **Host PC** in your machines list.
3. Click the three-dot menu icon (`...`) on the far right of its row.
4. Select **Disable key expiry**.

Your devices can now securely communicate from anywhere in the world. Next, we will set up a subnet node so you can wake your PC from sleep remotely.