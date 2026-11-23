# Meal plan data format

`meal_plan_template.html` is a finished, offline app. Don't read, rewrite, or restyle it.
Copy it, then replace the string `"__PLAN_DATA__"` (including its quotes) with an object
in this format:

```js
{
  week: "24–30 November 2026",      // shown in the header
  start: "2026-11-24",              // first day; keeps each week's checkmarks separate
  budget: "Estimated this week: ~$95 · Monthly budget: $400",
  shopping: [
    {
      store: "Trader Joe's",        // keep one store's groups next to each other
      cat: "🥩 Meat & Fish",
      items: [
        { n: "Chicken thighs", q: "800 g", p: "~$9" },   // name, quantity, price (optional)
      ],
    },
  ],
  days: [
    {
      label: "Mon",                 // Mon, Tue, Wed… also sets the day's color
      emoji: "🍲",
      title: "Chicken Soup + Salmon with Broccoli",
      time: "60 min",
      servings: "3 servings",
      plate: { veg: "broccoli, Greek salad", protein: "salmon", carbs: "rice", fats: "olive oil" },
      salad: "Greek salad",                      // required on days with lunch or dinner
      breakfast: "Oatmeal with berries",         // optional; include it if breakfast is planned
      side: "Roasted cauliflower (from the fridge)",  // optional: extra dish of the day
      snack: "Pear + yogurt pouch",              // optional: school snack for that day
      childNote: "Mia: salmon without lemon sauce",   // optional: how the child's portion differs
      source: "https://example.com/recipe",      // optional: link, or a list of links
      ingr: [
        { sec: "Soup" },                         // section heading
        { i: "Potato — 3 pcs" },
        { sec: "Dinner: Salmon with Broccoli" },
        { i: "Salmon fillet — 3 pcs" },
        { sec: "Salad: Greek" },
        { i: "Tomatoes — 2 pcs" },
      ],
      steps: [
        { sec: "Soup" },
        { s: "Cover the chicken with water and simmer." },
        { sec: "Dinner: Salmon with Broccoli" },
        { s: "Bake the salmon at 200°C / 390°F for 15 min." },
        { sec: "Salad: Greek" },
        { s: "Chop the vegetables and dress with olive oil." },
      ],
      tip: "Freeze half of the soup.",           // optional
    },
  ],
}
```

- `shopping`, `days`, and each day's `label`, `emoji`, `title`, `ingr`, `steps` are required.
- Steps are numbered automatically, restarting after each `sec`. Don't number them yourself.
- Leave out `plate` on days with only breakfast. The template adds the
  icons and the row labels (Salad, Breakfast, Side, School snack, Child's portion, Source).
- `salad`, `breakfast` and `side` are only labels. Put their ingredients and method in `ingr` and `steps`.
- Use double quotes for strings and escape any double quotes inside them.
