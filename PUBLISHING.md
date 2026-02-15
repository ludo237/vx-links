# Publishing vx-links

## Pre-submission checklist

- [ ] `bun run build` succeeds with no errors
- [ ] Test context menu on an X/Twitter link (copies vxtwitter URL)
- [ ] Test popup on an X/Twitter page (shows and copies vxtwitter URL)
- [ ] Test on a non-Twitter page (popup shows "Not on an X/Twitter page")
- [ ] Icons present at all sizes (16, 32, 48, 128)
- [ ] `manifest.json` version number is up to date
- [ ] Prepare screenshots (1280x800 or 640x400) and a short description

## Package the extension

```sh
bun run build
cd dist && zip -r ../vx-links.zip . && cd ..
```

This creates `vx-links.zip` ready for upload to both stores.

## Chrome Web Store

### First-time setup

1. Register at the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole) ($5 one-time fee)
2. Verify your developer identity

### Upload

1. Go to the Developer Dashboard and click **New Item**
2. Upload `vx-links.zip`
3. Fill in the store listing:
   - Description, screenshots, category (Productivity or Social & Communication)
   - Set visibility (Public / Unlisted)
4. Submit for review

### Review

Chrome reviews typically take 1-3 business days. You'll receive an email when approved or if changes are requested.

## Firefox Add-ons (AMO)

### First-time setup

1. Register at the [AMO Developer Hub](https://addons.mozilla.org/developers/) (free)

### Upload

1. Go to the Developer Hub and click **Submit a New Add-on**
2. Upload `vx-links.zip`
3. When asked about source code: **submit your source** — this is required because the extension uses a build step. Zip the entire project root (excluding `node_modules` and `dist`):
   ```sh
   zip -r vx-links-source.zip . -x 'node_modules/*' 'dist/*' '.git/*'
   ```
4. Fill in the listing details (description, screenshots, categories)
5. Submit for review

### Review

AMO reviews can take a few days to a couple of weeks. You'll be notified by email.

## Updating

1. Bump the `version` in both `package.json` and `manifest.json`
2. Rebuild: `bun run build`
3. Repackage: `cd dist && zip -r ../vx-links.zip . && cd ..`
4. **Chrome**: Go to the Developer Dashboard, select the extension, click **Package** > **Upload new package**, upload the zip
5. **Firefox**: Go to the Developer Hub, select the extension, click **Upload a New Version**, upload the zip (and updated source)

# Chrome Web Store Privacy Justifications

## Single purpose

Transform X/Twitter links into vxtwitter.com links for better embeds, with copy and video download support.

## Permission justifications

### `contextMenus`

Used to create two right-click context menu items that appear on X/Twitter links:

- "Copy as vxtwitter link" — copies the transformed vxtwitter.com URL to the clipboard
- "Download video" — downloads the video from the linked tweet

### `activeTab`

The extension popup reads the current tab's URL to check if it is an X/Twitter link and display the corresponding vxtwitter.com version.

### `scripting`

Used to inject small scripts into the active tab to:

- Write the transformed URL to the clipboard via `navigator.clipboard.writeText`
- Display a toast notification confirming the action to the user

### `clipboardWrite`

Required to copy transformed vxtwitter.com URLs to the user's clipboard when using the context menu or popup.

### `downloads`

Used to save videos from X/Twitter posts as `.mp4` files via the `chrome.downloads.download` API.

### Host permissions (`*://api.vxtwitter.com/*`)

The extension fetches video metadata (direct video URL) from the vxTwitter API to enable the video download feature.
