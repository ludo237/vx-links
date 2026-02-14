import { api } from "./api";

export function downloadUrl(url: string, filename: string): void {
  api.downloads.download({ url, filename, saveAs: true });
}
