# VERPTO — Team Portfolio
### *Digitizing business through modern web solutions.*

<br/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-2DD4BF?style=for-the-badge)](LICENSE)

---

## 🌐 Live Demo

> **[https://verpto-two.vercel.app/](https://verpto-two.vercel.app/)**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://verpto-two.vercel.app/)

---

## 📋 Table of Contents

- [About](#-about)
- [Featured Projects](#-featured-projects)
- [Pages](#-pages)
- [Folder Structure](#-folder-structure)
- [Running Locally](#-running-locally)
- [Image Assets Reference](#-image-assets-reference)
- [Tech Stack](#-tech-stack)
- [The Team](#-the-team)
- [License](#-license)

---

## 🏢 About

**VERPTO** is a two-person web development agency founded by Jashmine Verdida and Eijay Pepito. This repository contains the source code for our agency's team portfolio website — a fully responsive, production-ready site built with HTML5, custom CSS3, and Bootstrap 5.

The portfolio showcases our team, skillsets, and the projects we have delivered — all wrapped in a tech-forward design with a dark charcoal + teal accent color palette, hexagonal geometric motifs, and smooth scroll animations.

---

## 🚀 Featured Projects

| Project | Category | Summary |
|---|---|---|
| **Project FIRA** | Web & Mobile / AI | A fire incident reporting app with CNN-based image validation and a real-time Google Maps dashboard for citizens and response units. |
| **Hotel Asia** | Hospitality | A modern, mobile-responsive hotel website that showcases rooms, facilities, and dining while driving direct guest inquiries and bookings. |
| **EXPoints** | PHP Platform / Community | A gamified PHP platform for video game reviews where users earn XP points, post ratings, and admins moderate content via role-based access. |

---

## 📄 Pages

| File | Description |
|---|---|
| `index.html` | Main landing page — Hero, Team, Skills, Projects, Contact, Footer |
| `project-fira.html` | Project detail page for Project FIRA |
| `project-hotel-asia.html` | Project detail page for Hotel Asia |
| `project-expoints.html` | Project detail page for EXPoints |

---

## 📁 Folder Structure

```
verpto-portfolio/
│
├── index.html                  # Landing page
├── project-fira.html           # Project FIRA detail page
├── project-hotel-asia.html     # Hotel Asia detail page
├── project-expoints.html       # EXPoints detail page
│
├── css/
│   └── style.css               # All custom styles (variables, layout, components)
│
├── images/                     # ⬅ Drop all your image assets here
│   ├── verpto-logo.png            # Agency logo (navbar & footer)
│   ├── jashmine-profile.png    # Jashmine's profile photo
│   ├── eijay-profile.png       # Eijay's profile photo
│   ├── fira-1.png              # Project FIRA carousel — slide 1
│   ├── fira-2.png              # Project FIRA carousel — slide 2
│   ├── fira-3.png              # Project FIRA carousel — slide 3
│   ├── hotel-1.png             # Hotel Asia carousel — slide 1
│   ├── hotel-2.png             # Hotel Asia carousel — slide 2
│   ├── hotel-3.png             # Hotel Asia carousel — slide 3
│   ├── expoints-1.png          # EXPoints carousel — slide 1
│   ├── expoints-2.png          # EXPoints carousel — slide 2
│   └── expoints-3.png          # EXPoints carousel — slide 3
│
└── README.md
```

> **Note:** If an image file is missing, the site gracefully falls back to branded placeholder images using `placehold.co` and `ui-avatars.com` — so the layout never breaks.

---

## 💻 Running Locally

This project requires **no build tools, no npm, no dependencies to install**. It runs entirely in the browser.

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/ClubEijay/VERPTO-Portfolio.git
cd VERPTO-Portfolio
```

**2. Add your image assets**

Place all required images into the `/images` folder using the filenames listed in the [Image Assets Reference](#-image-assets-reference) section below.

If you skip this step, the site will display placeholder images automatically — nothing will be broken.

**3. Open in a browser**

Simply open `index.html` in any modern web browser:

```bash
# macOS
open index.html

# Windows (PowerShell)
start index.html

# Linux
xdg-open index.html
```

Or, for a better local development experience, use the **Live Server** extension in VS Code:
1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

---

## 🖼 Image Assets Reference

All images are loaded from the `images/` folder. Use this table as a checklist before deploying:

| Filename | Used In | Recommended Size |
|---|---|---|
| `verpto-logo.png` | Navbar & Footer (all pages) | Height: 40px, transparent PNG |
| `jashmine-profile.png` | Team card — Jashmine | 400×400 px, square |
| `eijay-profile.png` | Team card — Eijay | 400×400 px, square |
| `fira-1.png` | FIRA carousel slide 1 | 1200×675 px (16:9) |
| `fira-2.png` | FIRA carousel slide 2 | 1200×675 px (16:9) |
| `fira-3.png` | FIRA carousel slide 3 | 1200×675 px (16:9) |
| `hotel-1.png` | Hotel Asia carousel slide 1 | 1200×675 px (16:9) |
| `hotel-2.png` | Hotel Asia carousel slide 2 | 1200×675 px (16:9) |
| `hotel-3.png` | Hotel Asia carousel slide 3 | 1200×675 px (16:9) |
| `expoints-1.png` | EXPoints carousel slide 1 | 1200×675 px (16:9) |
| `expoints-2.png` | EXPoints carousel slide 2 | 1200×675 px (16:9) |
| `expoints-3.png` | EXPoints carousel slide 3 | 1200×675 px (16:9) |

> **Tip:** Screenshot your deployed projects at **1200×675 px** for a perfect 16:9 fit inside the browser-frame carousel. Use browser dev tools to set the viewport, then capture a full-page screenshot.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Custom CSS3 (CSS Variables, Flexbox, Grid, Animations) |
| Framework | Bootstrap 5.3 (via CDN) |
| Icons | Bootstrap Icons 1.11 (via CDN) |
| Fonts | Google Fonts — Montserrat & Inter |
| Carousel | Bootstrap 5 Carousel (custom-styled) |
| Animations | CSS `@keyframes` + Intersection Observer API |
| Hosting | Vercel (auto-deploys on push to `main`) |

No frameworks, bundlers, or back-end required. Zero dependencies to install.

---

## 👥 The Team

<br/>

### Jashmine Verdida
**Founder & Co-Developer**

- 📧 [JashmineVerdida08@gmail.com](mailto:JashmineVerdida08@gmail.com)
- 📱 0956 950 5102
- 💼 [LinkedIn — Jashmine Verdida](https://linkedin.com/in/jashmine-verdida)

<br/>

### Eijay Pepito
**Creative Director & Co-Developer**

- 📧 [eijay.pepito8@gmail.com](mailto:eijay.pepito8@gmail.com)
- 📱 0993 266 2346
- 💼 [LinkedIn — Eijay Pepito](https://linkedin.com/in/eijay-pepito)

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 VERPTO (Jashmine Verdida & Eijay Pepito)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**VERPTO** &nbsp;·&nbsp; *"Your business should be Digitized!"*

Built with ♥ by Jashmine & Eijay &nbsp;·&nbsp; © 2026

</div>
