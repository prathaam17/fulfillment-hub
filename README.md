# 📦 XYZ Fulfillment Hub

A streamlined, real-time e-commerce order fulfillment web application designed to replace spreadsheets and shared folder workflows for growing e-commerce businesses.

![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.1-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)

---

## 🎯 Overview & Operational Problem Solving

XYZ is an e-commerce business processing 200–300 orders per day. Transitioning from spreadsheets to **XYZ Fulfillment Hub** eliminates 5 core operational failure modes:

| Operational Challenge | Spreadsheet Bottleneck | Fulfillment Hub Solution |
| :--- | :--- | :--- |
| **1. Unnoticed SLA Delays** | Priority orders buried in rows | **Real-Time SLA Countdown Timers**: Automated same-day priority badges that auto-sort to the top of pick queues. |
| **2. Wrong Variant Shipped** | Text-only names read from memory | **Guided Pick & Tap SKU Verification**: Visual product thumbnails + extra-large bin coordinates (`Aisle A • Shelf 2 • Bin 04`) with mandatory SKU verification. |
| **3. Inventory Discrepancy** | Main warehouse shelf empty while stock is in Secondary Overflow | **Multi-Warehouse Stock Transfer Desk**: One-click stock transfer requests (Overflow ➔ Main) with live transit status tracking. |
| **4. Misplaced Packed Boxes** | Packed boxes left in random areas | **Staging Bay Allocator**: Dedicated staging bay assignment (SwiftPost, Metro, EcoFreight) with courier pickup cutoff countdowns. |
| **5. Forgotten Exceptions** | Spoken notes that get forgotten | **Formalized Exception Management Desk**: 1-Tap "Report Missing Stock" in Warehouse Kiosk that alerts the Office Desk with an audit trail. |

---

## 🏗️ Architecture & Dual-Role Design

```
                     ┌──────────────────────────────────────────┐
                     │          XYZ Fulfillment Hub             │
                     │          (React 18 + Tailwind)           │
                     └────────────────────┬─────────────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌──────────────────────────┐                   ┌──────────────────────────┐
     │   Office Command Desk    │                   │   Warehouse Touch Kiosk  │
     │  (For 1-2 Office Staff)  │                   │ (For 2-3 Warehouse Team) │
     ├──────────────────────────┤                   ├──────────────────────────┤
     │ • SLA Countdown Dashboard│                   │ • High-Contrast Touch UI │
     │ • Courier Rates & Speed  │                   │ • Guided Pick & Visuals  │
     │ • Stock Transfer Trigger │                   │ • Tap SKU Verification   │
     │ • Exception Resolution   │                   │ • 1-Tap Missing Item Log │
     └──────────────────────────┘                   └──────────────────────────┘
```

---

## 🚀 Quick Start & Local Run

### Prerequisites
- Node.js v18+ and npm installed

### Installation & Run
1. Clone this repository:
   ```bash
   git clone <YOUR-REPOSITORY-URL>
   cd fulfillment-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## 📋 Take-Home Submission Deliverables

- **Deliverable #1 (Application & Code)**: Full source code with dual-role Office & Warehouse interfaces.
- **Deliverable #2 (Video Walkthrough Script - Max 5m)**: Built-in top navbar button **"Video Walkthrough (5m)"** displaying timed presentation script.
- **Deliverable #3 (AI Usage Note - Max 1 page)**: Built-in top navbar button **"AI Usage Note"** detailing AI prompting strategy, tool usage, and human decision synthesis.
