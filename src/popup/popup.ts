import { api } from "../lib/api";
import { transformUrl } from "../lib/transform";

async function init() {
  const content = document.getElementById("content")!;
  const [tab] = await api.tabs.query({ active: true, currentWindow: true });
  const url = tab?.url;

  if (!url) {
    content.innerHTML = `<p class="message">No active tab found.</p>`;
    return;
  }

  const transformed = transformUrl(url);
  if (!transformed) {
    content.innerHTML = `<p class="message">Not on an X/Twitter page.</p>`;
    return;
  }

  const input = document.createElement("input");
  input.type = "text";
  input.readOnly = true;
  input.value = transformed;

  const button = document.createElement("button");
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(transformed);
    button.textContent = "Copied!";
    setTimeout(() => (button.textContent = "Copy"), 1500);
  });

  const wrapper = document.createElement("div");
  wrapper.className = "result";
  wrapper.append(input, button);
  content.append(wrapper);
}

init();
