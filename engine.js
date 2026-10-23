// Shuttle Math engine: the runs a shuttle makes, the time the service takes, the miles and fuel, and the fuel cost a rider. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _pl(n, one, many) { return n + (n === 1 ? one : many); }
var _RD = "the riders must be from 1 to 100000 with no decimal places";
var _ST = "the seats a run must be from 1 to 100 with no decimal places";
var _RM = "the round trip minutes must be from 1 to 600 with no decimal places";
var _GM = "the turnaround minutes must be from 0 to 120 with no decimal places";
var _MI = "the round trip miles must be from 1 to 500 with no decimal places";
var _MG = "the miles a gallon must be from 1 to 100 with no decimal places";
var _PR = "the fuel price must be from 0.01 to 99.99 with up to 2 decimal places";

function runsTruth(riders, seats) {
  var r = _i(riders, _RD, 6, 1, 100000), s = _i(seats, _ST, 3, 1, 100);
  var k = Math.floor((r + s - 1) / s), last = r - (k - 1) * s;
  return "The " + _pl(r, " rider", " riders") + " at " + _pl(s, " seat", " seats") + " a run make " + _pl(k, " run", " runs") + ", the last run carrying " + last + ".";
}
function spanTruth(riders, seats, roundMin, gapMin) {
  var r = _i(riders, _RD, 6, 1, 100000), s = _i(seats, _ST, 3, 1, 100), q = _i(roundMin, _RM, 3, 1, 600), g = _i(gapMin, _GM, 3, 0, 120);
  var k = Math.floor((r + s - 1) / s), tot = k * q + (k - 1) * g;
  var h = Math.floor(tot / 60), m = tot % 60;
  return "The " + _pl(k, " run", " runs") + " at " + _pl(q, " minute", " minutes") + " a round trip with " + _pl(k - 1, " turnaround", " turnarounds") + " of " + _pl(g, " minute", " minutes") + " take " + tot + " minutes, " + _pl(h, " hour", " hours") + " " + _pl(m, " minute", " minutes") + ".";
}
function mileageTruth(riders, seats, roundMiles, mpg) {
  var r = _i(riders, _RD, 6, 1, 100000), s = _i(seats, _ST, 3, 1, 100), mi = _i(roundMiles, _MI, 3, 1, 500), g = _i(mpg, _MG, 3, 1, 100);
  var k = Math.floor((r + s - 1) / s), tm = k * mi;
  var g2 = Math.floor((200 * tm + g) / (2 * g));
  return "The " + _pl(k, " run", " runs") + " of " + _pl(mi, " mile", " miles") + " cover " + _pl(tm, " mile", " miles") + ", and at " + _pl(g, " mile", " miles") + " a gallon that is " + _dec(g2, 2) + " " + (g2 === 100 ? "gallon" : "gallons") + ".";
}
function costTruth(riders, seats, roundMiles, mpg, price) {
  var r = _i(riders, _RD, 6, 1, 100000), s = _i(seats, _ST, 3, 1, 100), mi = _i(roundMiles, _MI, 3, 1, 500), g = _i(mpg, _MG, 3, 1, 100), p = _p(price, _PR, 2, 2, 1, 9999);
  var k = Math.floor((r + s - 1) / s), tm = k * mi;
  var cc = Math.floor((2 * tm * p + g) / (2 * g));
  var pr = Math.floor((2 * cc + r) / (2 * r));
  return "The " + _pl(tm, " mile", " miles") + " at " + _pl(g, " mile", " miles") + " a gallon and $" + _dec(p, 2) + " a gallon come to $" + _dec(cc, 2) + ", $" + _dec(pr, 2) + " a rider.";
}
