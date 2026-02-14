# VX Links

A browser extension that transforms X/Twitter links into [vxtwitter.com](https://vxtwitter.com) links for better embeds on Discord and other platforms.

## Features

- **Copy as vxtwitter link** — Right-click any X/Twitter link and select "Copy as vxtwitter link" to copy the transformed URL to your clipboard
- **Download video** — Right-click any X/Twitter link and select "Download video" to save the video from the post as an `.mp4` file (uses the [vxTwitter API](https://github.com/dylanpdx/BetterTwitFix))
- **Popup** — Click the extension icon while on an X/Twitter page to see and copy the vxtwitter version of the current URL
- Works with all X/Twitter URL variants: `x.com`, `twitter.com`, `www.`, and `mobile.` prefixes

## Build

Prerequisites: [Bun](https://bun.sh)

```sh
bun install
bun run build
```

Output goes to `dist/`.

## Load for development

### Chrome

1. Go to `chrome://extensions`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked" and select the `dist/` folder

### Firefox

1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `dist/manifest.json`

## Permissions

| Permission       | Reason                                                       |
| ---------------- | ------------------------------------------------------------ |
| `contextMenus`   | Create the right-click menu items                            |
| `activeTab`       | Read the current tab's URL when the popup is opened          |
| `scripting`       | Inject scripts for clipboard access and toast notifications  |
| `clipboardWrite`  | Allow the injected script to access the clipboard            |
| `downloads`       | Save videos to disk via the "Download video" menu item       |

The extension also uses a host permission for `api.vxtwitter.com` to fetch video URLs from the vxTwitter API.

## Tech stack

- TypeScript
- Bun (bundler + runtime)
- Manifest V3 (cross-browser: Chrome + Firefox)
