import { readFile, writeFile } from "fs";
import { createInterface } from "readline";
import type { THaiku } from "./src/types";
import { Temporal } from "temporal-polyfill";

const path = "./src/const/haikus.json";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const generateNewEntry = (
  id: number,
  text: string,
  date: string | undefined = undefined,
  selected: boolean = false,
  tags: string[] = []
): THaiku => {
  return {
    id,
    text,
    date: date ?? Temporal.Now.plainDateISO().toString(),
    selected,
    tags,
    hide: false,
  };
};

readFile(path, "utf8", async (err: any, data: string) => {
  try {
    if (err) {
      throw new Error(err);
    }
    const content = JSON.parse(data);
    rl.question("Haiku: ", (inputHaiku) => {
      rl.question("Date: ", (inputDate) => {
        const haiku = inputHaiku.replace(/\\n/g, "\n");
        const date: string | undefined =
          inputDate.trim() !== "" ? inputDate.trim() : undefined;
        const newEntry = generateNewEntry(
          Number(content.at(-1).id) + 1,
          haiku,
          date,
          false,
          []
        );
        writeFile(
          path,
          JSON.stringify([...content, newEntry], null, 2),
          "utf8",
          (err) => {
            if (err) {
              console.error(err);
            }
            console.log("Éxito");
          }
        );
        rl.close();
      });
    });
  } catch (err) {
    console.error(err);
  }
});
