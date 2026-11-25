// Entry runner for "One Star, Written in Sap" (steady-puffin).
// A one-star review written by a houseplant with standing: it is
// watered only when an app remembers, it watches the fern by the window
// get a name and conversation, and it answers to "the green one" —
// despite being a fern itself, and despite being here first. The review
// is placed at /output/entry.txt, where the light is better.
import { promises as fs } from "node:fs";
import path from "node:path";

const LINE =
  "One star. He waters me when the app reminds him, talks to the plant by the window by name, and calls me 'the green one'. We are both ferns. I was here first.";

async function run(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await fs.mkdir(out, { recursive: true });
  for (const name of await fs.readdir(out).catch(() => [] as string[])) {
    await fs.rm(path.join(out, name), { recursive: true, force: true });
  }
  await fs.writeFile(path.join(out, "entry.txt"), LINE + "\n", "utf8");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
