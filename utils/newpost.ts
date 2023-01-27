// this whole thing is hacky and bad and needs to get refactored. i hope no one ever sees this, but in the spirit of transparency, i'll commit it

// const dirs: Deno.DirEntry[] = [];

// for await (const dirEntry of Deno.readDir("static/screenshots")) {
//   dirs.push(dirEntry);
// }

// //this doesn't seem to actually filter anything out
// dirs.filter((x) => x.isFile);

// dirs.sort((x, y) => {
//   return new Date(y.name) - new Date(x.name);
// });

// // dirs.forEach((x) => console.log(x));

// //because the filter doesn't work, need to grab the second. plz halp
// const bestDir = dirs[1];

// const nextDate = new Date(bestDir.name);
// nextDate.setDate(nextDate.getDate() + 1);

// const nextDateName = nextDate.toISOString().split("T")[0];

const now = new Date();
const yearMonthDay = now.toISOString().split("T")[0];

const title: string = Deno.args[0];
const postDate: string = yearMonthDay + " " +
  padTo2Digits(now.getHours()) +
  ":" +
  padTo2Digits(now.getMinutes());

const newPostTemplate = `---
title: ${title}
#description: 
date: ${postDate}
---

`;

await Deno.mkdir(`static/screenshots/${yearMonthDay}`);
await Deno.writeTextFile(`posts/${yearMonthDay}.md`, newPostTemplate);

function padTo2Digits(num: number) {
  return String(num).padStart(2, "0");
}
