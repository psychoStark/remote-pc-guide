---
title: "DIY ESP32 SwitchBot Setup"
section: "hardmod"
order: 7
description: "Hardware-level remote power button for when WoL fails."
---

## The Ultimate Hardware Fallback

Wake-on-LAN is convenient, but software and firmware can fail. If your PC suffers a hard crash, blue-screen lockup, or power fluctuation, Wake-on-LAN packets will not boot the machine.

The [ESP32-SwitchBot project by psychoStark](https://github.com/psychoStark/ESP32-SwitchBot/) solves this by turning an inexpensive microcontroller into a physical switch actuator. It pushes the physical power button on your PC chassis on demand. Because the firmware features native Tailscale integration, it connects directly to your mesh network without needing cloud relays or port forwarding.

---

## 1. Hardware Checklist & Wiring

### Bill of Materials
* **Microcontroller:** An ESP32 development board with at least 4 MB of flash memory (ESP32-S3 recommended, ESP32 Classic, C3, or S2 also supported).
* **Servo Motor:** TowerPro SG90, MG90S, or an equivalent 3.3V–5V micro-servo.
* **Power & Data:** A 5V USB power adapter and a data-capable USB cable for flashing.

### Wiring Diagram
Connect the micro-servo to your ESP32 board using three pins:


```

ESP32 Pin                        Servo Wire (SG90 / MG90S)
────────────────────────────────────────────────────────────
GPIO 1 (Signal)    ───────────►   Signal Wire (Orange / Yellow)
5V / VIN           ───────────►   VCC Wire    (Red)
GND                ───────────►   GND Wire    (Brown / Black)

```
*(Wiring specifications source: [ESP32-SwitchBot](https://github.com/psychoStark/ESP32-SwitchBot/))*

---

## 2. Firmware Prerequisites & Download

To build and flash the firmware, your machine needs:
* **Python 3.6+**
* **Git**
* **ESP-IDF v5.1.x** (v5.1.4 recommended)

Open your terminal and clone the repository along with its required subcomponents:

```bash
# Clone the repository
git clone https://github.com/psychoStark/ESP32-SwitchBot.git
cd ESP32-SwitchBot

# Download required Arduino and Servo components
git clone -b release/v2.x https://github.com/espressif/arduino-esp32.git components/arduino
git clone https://github.com/madhephaestus/ESP32Servo.git components/ESP32Servo

```

---

## 3. Configuration & Flashing

1. Launch the interactive credential setup wizard:


```bash
# Windows
python setup_secrets.py

# macOS / Linux
python3 setup_secrets.py

```


2. Configure the requested parameters:


* **Wi-Fi Networks:** Enter your primary network credentials (plus up to 5 optional backup fallbacks).


* **Operation Mode:** Select **Tailscale** for worldwide remote access.


* **Tailscale Credentials:** Provide your Tailscale auth key and desired hostname (e.g., `esp32`).


* **OTA Security Key:** Set an optional PIN or password to authorize wireless updates later.




3. Build and flash the firmware to your board:


```bash
# 1. Activate your ESP-IDF environment
source ~/esp/esp-idf-v5.1.4/export.sh  # Linux/macOS
# %userprofile%\esp\esp-idf-v5.1.4\export.bat # Windows

# 2. Compile the project
idf.py build

# 3. Flash and monitor (replace COM3 with your serial port)
idf.py -p COM3 flash monitor

```


(Press `Ctrl +` when finished to exit the monitor).



---

## 4. Mechanical Assembly & Horn Attachment

> **Important:** Do not mount or screw down the plastic servo horn arm before powering on the board. Standard micro-servos sweep roughly 180°, so the motor must be centered electronically first to prevent gear damage.
> 
> 

1. **Center to 90°:** Power on the ESP32 and open the calibration page (via `http://[ESP32-IP/` or `http://esp32.local/`). The motor will automatically drive to its mechanical center baseline at **90°**.


2. **Press Horn onto Splines:** While the motor is powered and held at 90°, gently press the horn arm onto the splined gear shaft pointing straight toward your PC power button.


3. **Power Off & Fasten Screw:** Unplug the ESP32. Hold the horn firmly with your thumb and fingers to absorb screwdriver torque, then tighten the center retaining screw into the gear shaft.


4. Mount the servo housing adjacent to your PC chassis power button using double-sided mounting tape.

---

## 5. Calibration & Remote Operation

Once mounted, you can calibrate and trigger the actuator without installing specialized software.

### Calibrate Angles

Open your browser to `http://[ESP32-IP/` or run the calibration terminal script:

```bash
bash <(curl -s http://[ESP32-IP/calibrate)

```

* **Rest Angle:** Adjust until the arm hovers 1–2 mm directly above the power button without resting on it.


* **Press Angle:** Adjust until the arm firmly depresses the button without straining or buzzing.


* **Press Duration:** Set actuation hold time (typically 200–400ms for a standard click).


* Click **Test Tap**, then select **Save Calibration**.



### Remote Triggering over Tailscale

Whenever your PC is unresponsive, power it on from any device connected to your tailnet:

* **Web Interface:** Navigate to `http://esp32/main` in your browser.


* **Terminal Interface:** Run `curl -s http://esp32/main | bash` from any macOS, Linux, or WSL terminal and press `1` to actuate the switch.