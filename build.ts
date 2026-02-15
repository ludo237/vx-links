import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const dist = path.resolve("dist");

const targetFlag = process.argv.find((arg) => arg.startsWith("--target="));
const target = targetFlag?.split("=")[1] as "chrome" | "firefox" | undefined;

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

  // Copy and patch manifest
  const manifest = JSON.parse(readFileSync("manifest.json", "utf-8"));
  if (target === "firefox") {
    delete manifest.background.service_worker;
  } else if (target === "chrome") {
    delete manifest.background.scripts;
  }
  mkdirSync(dist, { recursive: true });
  writeFileSync(
    path.join(dist, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );

  // Copy static assets
  mkdirSync(path.join(dist, "popup"), { recursive: true });
  cpSync("src/popup/popup.html", path.join(dist, "popup", "popup.html"));
  mkdirSync(path.join(dist, "icons"), { recursive: true });
  cpSync("icons", path.join(dist, "icons"), { recursive: true });

  console.log(`Build complete → dist/ (target: ${target ?? "all"})`);
}

build();
