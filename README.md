# Hide 'People You May Know'

[![Download Latest Version](https://img.shields.io/badge/Download-Latest_Version-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](../../releases/latest)

[**عربي**](README_AR.md) | [**English**](README.md)

A simple browser extension to hide the "People You May Know" section on Facebook.

## Screenshots

| Before | After |
|:---:|:---:|
| ![Before](images/before.png) | ![After](images/after.png) |

## Features

- Automatically hides "People You May Know" sections from your Feed and Profile.
- Supports both English and Arabic Facebook interfaces.
- Lightweight and efficient.

## Installation

### For Chrome / Edge / Brave (Chromium Browsers)
1. **Download the latest ZIP file** from the [Releases](../../releases/latest) page.
2. **Extract** the ZIP file to a folder on your computer.
3. Open your browser and go to `chrome://extensions`.
4. Enable **Developer mode** in the top right corner.
5. Click **Load unpacked**.
6. Select the folder you extracted (containing `manifest.json`).

## How it Works

The extension looks for headers containing:
- "People You May Know"
- "أشخاص قد تعرفهم"

When found, it hides the entire container card. It uses a `MutationObserver` to handle new content loaded while scrolling.
