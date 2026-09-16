---
title: "Create a Tailscale Account"
section: "network"
order: 1
description: "Set up your Tailscale account to establish a secure mesh VPN."
---

## The Foundation of Your Remote PC

Before we configure any streaming software, we need a way for your devices to talk to each other securely over the internet. Traditional methods require "port forwarding" on your router, which exposes your home network to malicious attacks. 

Instead, we will use **Tailscale**. Tailscale is a zero-config mesh VPN built on WireGuard. It creates a private, encrypted network (a "tailnet") that only your devices can access, no matter where they are in the world.

---

## Step 1: Choose an Identity Provider

Tailscale doesn't use custom passwords. Instead, it relies on secure Single Sign-On (SSO) providers.

1. Navigate to [Tailscale's website](https://tailscale.com).
2. Click the **Get Started for Free** or **Try for Free** button.
3. Choose your preferred Identity Provider to create your account:
   * Google
   * Microsoft
   * GitHub
   * Apple

> **Tip:** Use an account that you can easily access on both your Host PC and your mobile devices. Google or Apple are usually the most seamless for personal networks.

---

## Step 2: Welcome to the Admin Console

Once you authenticate, you will be dropped into the **Tailscale Admin Console**. 

Right now, your dashboard will look a bit empty. The Admin Console is your network's control room. From here, you will eventually be able to:
* See every device connected to your private network.
* View the dedicated Tailscale IP addresses assigned to each machine.
* Manage subnet routing and exit nodes.

Your account is now active. You are ready to start connecting your hardware to the mesh network.