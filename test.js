const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { runs: runsTruth, span: spanTruth, mileage: mileageTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the riders must be from 1 to 100000 with no decimal places",
  "the seats a run must be from 1 to 100 with no decimal places",
  "the round trip minutes must be from 1 to 600 with no decimal places",
  "the turnaround minutes must be from 0 to 120 with no decimal places",
  "the round trip miles must be from 1 to 500 with no decimal places",
  "the miles a gallon must be from 1 to 100 with no decimal places",
  "the fuel price must be from 0.01 to 99.99 with up to 2 decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
