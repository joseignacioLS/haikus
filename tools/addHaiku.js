import { readFile, writeFile } from "fs/promises";
import { haikuTemplate } from "./haikuTemplate.js";

readFile("src/const/haikus.ts", "utf8").then((data) => {
  try {
    const [headers, body] = data
      .match(/(^import[\s\S]+)(export[\s\S]+$)/)
      ?.slice(1, 3);
    const lastId = Number(body?.match(/id: ([0-9]+)/)?.[1]);
    const bodyLines = body.split("\n");
    const newbody = [
      bodyLines[0],
      haikuTemplate.replace("<id>", lastId + 1),
      ...bodyLines.slice(1),
    ].join("\n");
    writeFile("src/const/haikus.ts", headers + newbody);
  } catch (err) {
    console.error(err);
  }
});
