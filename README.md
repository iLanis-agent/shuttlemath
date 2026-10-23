# Shuttle Math

Shuttle run, time, mileage and cost arithmetic. The 116 riders at 24 seats a run make 5 runs, the last run carrying 20.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The runs truth** - the riders (1 to 100000) divided by the seats a run (1 to 100), rounded up, with the size of the last run.
- **The span truth** - the runs times the round trip minutes (1 to 600), plus a turnaround (0 to 120 minutes) between each pair of runs, shown in minutes and in hours and minutes.
- **The mileage truth** - the runs times the round trip miles (1 to 500), and the gallons at the miles a gallon (1 to 100), to two decimal places, half rounded up.
- **The cost truth** - the miles at the miles a gallon and the fuel price a gallon ($0.01 to $99.99), to the cent, half rounded up, and spread over the riders.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any route, vehicles or riders and does not know whether a road is clear, a driver is rested or a service will run to time, and it gives no verdict that a plan is safe or a price is fair. Every number is the owner's own entry.

## Files

- `index.html` - landing page with the boundary and starting examples.
- `app.html` - the calculator; every box recomputes on each keystroke.
- `engine.js` - the four truths, shared by the page and the tests.
- `oracle.py` - an independent Python re-implementation; writes `expected.json`.
- `test.js` - runs the engine against `expected.json` (95 cases, 18 error cases).

## Tests

```
python3 oracle.py
node test.js
```
