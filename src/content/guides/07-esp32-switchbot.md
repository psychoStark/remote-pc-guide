---
title: "DIY ESP32 SwitchBot Setup"
section: "hardmod"
order: 7
description: "Hardware-level remote power button for when Wake-on-LAN fails."
---

## The Ultimate Hardware Fail-Safe

Wake-on-LAN is great for day-to-day use, but software and firmware can fail. If your PC suffers a hard system crash, a blue-screen lockup, or a power outage that leaves the motherboard in an unbootable sleep state, network wake packets will not turn the machine on.

The **ESP32-SwitchBot** solves this by turning an inexpensive ESP32 microcontroller and micro-servo into a physical actuator that physically presses your PC's power button on demand. 

Because the firmware features **native Tailscale integration**, it connects directly to your private mesh VPN with zero port forwarding and zero third-party cloud dependencies.

---

## What You Need

* **Microcontroller:** Any ESP32 development board (ESP32-S3 recommended; Classic, C3, and S2 also supported).
* **Servo Motor:** TowerPro SG90, MG90S, or any equivalent 3.3V–5V micro-servo.
* **Power:** A standard 5V USB charger and data-capable USB cable.

---

## How It Works in 4 Steps

1. **Wiring (3 Wires):** Connect the servo's Signal wire to GPIO 1, VCC to 5V/VIN, and GND to GND.
2. **Flash Firmware:** Clone the project and run the interactive configuration wizard (`setup_secrets.py`) to connect the board to your Wi-Fi and Tailscale network.
3. **Mount Arm:** Attach the servo arm at 90° and mount the housing adjacent to your PC chassis power button with double-sided tape.
4. **Trigger Anywhere:** When your PC is unresponsive, power it on from any device on your tailnet:
   * **Web:** Open `http://esp32/main` in your browser and tap **Press Power Button**.
   * **Terminal:** Run `curl -s http://esp32/main | bash` from any terminal.

---

## Full Documentation & Build Guide

For complete step-by-step assembly instructions, wiring diagrams, angle calibration guides, and pre-built binaries, refer to the official documentation:

> **Official Project Documentation:** [psychostark.github.io/ESP32-SwitchBot](https://psychostark.github.io/ESP32-SwitchBot/)
> 
> **Source Code & Releases:** [github.com/psychoStark/ESP32-SwitchBot](https://github.com/psychoStark/ESP32-SwitchBot/)