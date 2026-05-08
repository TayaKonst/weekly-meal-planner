# Template Schema (colors, data structures)

This file replaces reading the full `meal_plan_template.jsx`.
Read this instead — it contains everything needed to generate the HTML output.

---

## Colors

### Header
```
background: #2c2416
```

### Harvard plate chips
```
vegetables ½  → bg #EAF3DE, text #3B6D11
protein ¼     → bg #E6F1FB, text #185FA5
carbs ¼       → bg #FAEEDA, text #854F0B
fats          → bg #FBEAF0, text #993556
```

### Day accent colors (Mon → Sun)
```
#7eb8a4  #c47e3e  #9b8fc4  #d4894e  #7eb8a4  #e8c547  #6ea8d4
```

### Page background
```
background: #f5f0e8
```

---

## Data Structures

### shopping[]
```js
[
  {
    cat: "🥩 Meat & Fish",   // category label with emoji
    items: [
      { n: "Chicken thighs", q: "1 kg" },
      // n = name, q = quantity
    ]
  },
  // ...more categories
]
```

### days[]
```js
[
  {
    label: "Mon",              // short label for day button
    fullDay: "Monday",         // full day name
    color: "#7eb8a4",          // day accent color
    emoji: "🍲",
    title: "Chicken Soup + Salmon with Broccoli",
    time: "60 min",
    servings: "3 servings",
    chips: [
      { cls: "chip-veg",  text: "vegetables ½ — broccoli" },
      { cls: "chip-prot", text: "protein ¼ — salmon" },
      { cls: "chip-carb", text: "carbs ¼ — rice" },
      { cls: "chip-fat",  text: "fats — lemon butter" },
    ],
    ingr: [
      { sec: "── Soup ──" },              // section divider
      { i: "Potato — 3 pcs" },            // ingredient
      { sec: "── Salad: Name ──" },
      { i: "Rocket — 1 bag" },
    ],
    steps: [
      { sec: "── Soup ──" },
      { s: "Cover chicken with water..." }, // step
      { sec: "── Salad ──" },
      { s: "Toss rocket with dressing..." },
    ],
    tip: "💡 Tip goes here...",             // optional
  },
  // ...more days
]
```

---

## Component Structure

Plain vanilla JS HTML file — no React, no CDN. Structure:

```
<header> — dark (#2c2416), title, tabs "🛒 Shopping" / "📖 Recipes"
<div#content> — content of the current tab

Shopping tab:
  progress bar → checked items progress
  budget note → weekly estimate + monthly budget
  cat-block[] → categories with items, tap-to-check
  reset-btn → reset all
  localStorage key: "mp_checked_MMDD"

Recipes tab:
  day-strip → horizontal scroll, day buttons
  recipe-card → colored top bar, emoji, title
    badges → time, servings
    plate-chips → 4 Harvard plate chips
    rtabs → "Ingredients" / "Method"
    body → ingredients or numbered steps
    tip-block → 💡 (if present)
    nav-row → Previous / Next
```

---

## Render Details

- A `{ sec: "── Name ──" }` divider renders as a section header with lines on each side
- Steps are numbered automatically (1, 2, 3…); counter resets after each `sec`
- Every day that includes lunch or dinner must include a `── Salad: Name ──` section
- For soup day: two blocks — `── Soup ──` and `── Dinner: Name ──`
- For multi-meal days: one block per meal type — e.g. `── Breakfast: Avocado Toast ──`, `── Dinner: Chicken Tikka ──`, `── Salad: Greek Salad ──`
- Harvard plate chips apply to lunch and dinner only; omit chips for breakfast-only days

---

## Vanilla HTML Template

Generate the file entirely in vanilla JS (no React, no CDN) following this pattern:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"/>
  <title>Meal Plan [date]</title>
  <style>/* inline styles */</style>
</head>
<body>
  <div class="header">...</div>
  <div id="content"></div>
  <script>
    var view='shop', dayIdx=0, recipeTab='ingr';
    var checked = JSON.parse(localStorage.getItem('mp_checked_MMDD') || '{}');
    var shopping = [ /* data */ ];
    var days = [ /* data */ ];
    function render() { document.getElementById('content').innerHTML = ...; }
    render();
  </script>
</body>
</html>
```

Write the file to `/tmp/meal-plan-YYYY-MM-DD.html`, then open it with `open`.
