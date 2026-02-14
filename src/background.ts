import { api } from "./lib/api";
import { transformUrl } from "./lib/transform";
import { copyToClipboard } from "./lib/clipboard";
import { getVideoUrl } from "./lib/video";
import { downloadUrl } from "./lib/download";

const COPY_MENU_ID = "copy-vxtwitter";
const DOWNLOAD_MENU_ID = "download-video";

const TARGET_URL_PATTERNS = [
  "*://x.com/*",
  "*://www.x.com/*",
  "*://mobile.x.com/*",
  "*://twitter.com/*",
  "*://www.twitter.com/*",
  "*://mobile.twitter.com/*",
];

api.runtime.onInstalled.addListener(() => {
  api.contextMenus.create({
    id: COPY_MENU_ID,
    title: "Copy as vxtwitter link",
    contexts: ["link"],
    targetUrlPatterns: TARGET_URL_PATTERNS,
  });

  api.contextMenus.create({
    id: DOWNLOAD_MENU_ID,
    title: "Download video",
    contexts: ["link"],
    targetUrlPatterns: TARGET_URL_PATTERNS,
  });
});

api.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.linkUrl || !tab?.id) return;

  if (info.menuItemId === COPY_MENU_ID) {
    const transformed = transformUrl(info.linkUrl);
    if (!transformed) return;
    await copyToClipboard(transformed, tab.id);
    return;
  }

  if (info.menuItemId === DOWNLOAD_MENU_ID) {
    const videoUrl = await getVideoUrl(info.linkUrl);
    if (!videoUrl) {
      await showToast(tab.id, "No video found in this post.");
      return;
    }
    const statusId = info.linkUrl.match(/\/status\/(\d+)/)?.[1] ?? "video";
    downloadUrl(videoUrl, `${statusId}.mp4`);
  }
});

async function showToast(tabId: number, message: string): Promise<void> {
  await api.scripting.executeScript({
    target: { tabId },
    func: (msg: string) => {
      const toast = document.createElement("div");
      toast.textContent = msg;
      Object.assign(toast.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: "#1a1a1a",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        fontSize: "14px",
        zIndex: "2147483647",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        transition: "opacity 0.3s",
      });
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    },
    args: [message],
  });
}
