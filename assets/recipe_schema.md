# Recipe page data format

`recipe_template.html` is a finished, offline app: adjustable servings, ingredient checklist, one step at a
time, and several timers at once. Don't read, rewrite, or restyle it. Copy it, then replace the string
`"__RECIPE_DATA__"` (including its quotes) with an object in this format:

```js
{
  title: "Spaghetti Carbonara",
  emoji: "🍝",
  desc: "Silky egg and cheese sauce with crisp pork. No cream.",
  chips: ["⏱ 25 min total", "15 min hands-on", "Medium"],
  servings: 2,                        // a number; the amounts below are for this many
  unit: "servings",                   // or "pieces", "slices"…
  alert: "Egg allergy: not suitable.",// optional: allergies, labels to check
  assumed: "Assumed 2 servings and a 28 cm pan. Ask in the chat to change anything.",  // optional
  scaleNote: "For 4, use a wider pan and toss longer.",   // optional; give it for all baking
  ingredients: [
    { sec: "Sauce" },                 // optional section heading
    { id: "eggs", q: 2, n: "eggs", prep: "at room temperature" },
    { id: "cheese", q: 50, u: "g", n: "Pecorino Romano", prep: "finely grated", swap: "Parmesan" },
    { id: "salt", q: 1, u: "tbsp", n: "salt", fixed: true },   // fixed: doesn't change with servings
    { n: "Black pepper" },            // no amount
  ],
  before: ["Use a 28 cm pan.", "Take {eggs} out of the fridge 20 minutes ahead."],
  steps: [
    {
      title: "Cook the pasta",
      text: "Boil {pasta} with {salt} in 2 litres of water.",
      timers: [{ label: "Pasta", min: 9 }],   // optional; minutes, decimals allowed
      ready: "Firm in the center when you bite it.",
      tip: "Save a cup of the water before you drain it.",   // optional
    },
  ],
  problems: [{ what: "Scrambled eggs.", fix: "The pan was too hot. Take it off the heat and toss with a splash of pasta water." }],
  leftovers: "Eat right away. Keeps 1 day in the fridge.",
  sources: [{ name: "Site name", url: "https://…" }],        // only pages you really used
}
```

- **Amounts in text:** write `{id}` for the full amount ("50 g Pecorino Romano"), `{id:0.5}` for half of it.
  They change with the servings, so never type an ingredient's amount by hand in `text`, `ready` or `tip`.
  Every `{id}` must exist in `ingredients`. Shares used across the steps must add up to 1. If one step
  prepares an ingredient and another uses it, show the amount once and just name it the other time.
- `q` is a number (0.5, not "½"). `u` is `g`, `ml`, `tsp`, `tbsp`, `cup`, `kg`, `l`, `oz`, `lb` or left out.
- `n` must read well after the amount, inside a sentence: "eggs", "garlic cloves", not "Garlic (2 cloves)".
- Give **every** wait a timer: boiling, frying, baking, resting, marinating, chilling. For a range use the
  shorter time and describe the sign in `ready`. Don't add timers for things done in seconds.
- Use double quotes for strings and escape any double quotes inside them.
