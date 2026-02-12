import { api } from "./lib/api";
import { transformUrl } from "./lib/transform";
import { copyToClipboard } from "./lib/clipboard";

const MENU_ID = "copy-vxtwitter";

api.runtime.onInstalled.addListener(() => {
  api.contextMenus.create({
    id: MENU_ID,
    title: "Copy as vxtwitter link",
    contexts: ["link"],
    targetUrlPatterns: [
      "*://x.com/*",
      "*://www.x.com/*",
      "*://mobile.x.com/*",
      "*://twitter.com/*",
      "*://www.twitter.com/*",
      "*://mobile.twitter.com/*",
    ],
  });
});

api.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID || !info.linkUrl || !tab?.id) return;

  const transformed = transformUrl(info.linkUrl);
  if (!transformed) return;

  await copyToClipboard(transformed, tab.id);
});
