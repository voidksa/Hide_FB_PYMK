<div align="center">
  <img src="images/icon.png" alt="Logo" width="100" height="100">

  # Hide 'People You May Know'

  [![Download Latest Version](https://img.shields.io/badge/Download-Latest_Version-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](../../releases/latest)

  A simple browser extension to hide the "People You May Know" section on Facebook.

  [**عربي**](README_AR.md) | [**English**](README.md)
</div>

---

## Features

- **Cleaner Feed:** Automatically hides "People You May Know" sections from your Feed and Profile.
- **Bilingual:** Supports both English and Arabic Facebook interfaces.
- **Lightweight:** Efficient script that doesn't slow down your browsing.
- **No Layout Shift:** Intelligently removes containers to prevent empty spaces.

## Screenshots

| Before | After |
|:---:|:---:|
| ![Before](images/before.png) | ![After](images/after.png) |

## Installation

### For Chrome / Edge / Brave (Chromium Browsers)
1. **Download the latest ZIP file** from the [Releases](../../releases/latest) page.
2. **Extract** the ZIP file to a folder on your computer.
3. Open your browser and go to `chrome://extensions`.
4. Enable **Developer mode** in the top right corner.
5. Click **Load unpacked**.
6. Select the folder you extracted (containing `manifest.json`).

## How it Works

The extension looks for headers containing "People You May Know" or "أشخاص قد تعرفهم". When found, it hides the entire container card. It uses a `MutationObserver` to handle new content loaded while scrolling, ensuring the section stays hidden even as you browse.
