# Hide 'People You May Know'

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
1. Download the code or clone this repository.
2. Open your browser and go to `chrome://extensions`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked**.
5. Select the folder containing these files.

## How it Works

The extension looks for headers containing:
- "People You May Know"
- "أشخاص قد تعرفهم"

When found, it hides the entire container card. It uses a `MutationObserver` to handle new content loaded while scrolling.
