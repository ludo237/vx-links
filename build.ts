import { cpSync, mkdirSync } from "fs";
import path from "path";

const dist = path.resolve("dist");

async function build() {
  const result = await Bun.build({
    entrypoints: ["src/background.ts", "src/popup/popup.ts"],
    outdir: dist,
    target: "browser",
    format: "esm",
    minify: true,
  });

  if (!result.success) {
    console.error("Build failed:");
    for (const log of result.logs) console.error(log);
    process.exit(1);
  }

  // Copy static assets
  cpSync("manifest.json", path.join(dist, "manifest.json"));
  mkdirSync(path.join(dist, "popup"), { recursive: true });
  cpSync("src/popup/popup.html", path.join(dist, "popup", "popup.html"));
  mkdirSync(path.join(dist, "icons"), { recursive: true });
  cpSync("icons", path.join(dist, "icons"), { recursive: true });

  console.log("Build complete → dist/");
}

build();
