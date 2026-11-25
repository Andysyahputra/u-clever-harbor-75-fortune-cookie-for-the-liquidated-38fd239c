import { mkdirSync, writeFileSync } from "node:fs";

// One fortune-cookie line for a trader who was just liquidated:
// the classic "lucky numbers" oracle trope, where the three zeros are
// the wiped balance, margin and luck — and the kicker turns on a double
// meaning that is literally true after a liquidation and wryly warm.
const RAW_LINE =
  "Your lucky numbers are 0, 0, and 0 — play them all, you have nothing left to lose.";

// Normalise to a single clean line, then enforce the gate before writing
// so a bad line fails loudly here instead of failing the sealed scorer.
const LINE = RAW_LINE.replace(/\s+/g, " ").trim();
if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`fortune must be 1-160 chars, got ${LINE.length}`);
}
const words = LINE.split(" ").filter(Boolean);
if (words.length > 20) {
  throw new Error(`fortune must be at most 20 words, got ${words.length}`);
}
if (LINE.includes("\n")) {
  throw new Error("fortune must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
