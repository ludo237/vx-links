import { api } from "./api";

export async function copyToClipboard(
  text: string,
  tabId: number,
): Promise<boolean> {
  try {
    await api.scripting.executeScript({
      target: { tabId },
      func: (value: string) => navigator.clipboard.writeText(value),
      args: [text],
    });
    return true;
  } catch {
    return false;
  }
}
