---
name: weekly-meal-planner
description: >
  Use this skill when the user asks to plan meals, create a weekly menu,
  make a shopping list, suggest dinner ideas, or find a recipe from the
  family collection. Triggers include: "plan meals", "what to cook",
  "shopping list", "weekly menu", "meal ideas", "dinner ideas",
  "what should I cook this week", "help me with groceries", or any request
  related to family food planning. Use proactively whenever food, cooking,
  ingredients, weekly planning, or dinner ideas come up — even if the user
  doesn't say "meal plan" explicitly.
---

# Weekly Meal Planner Skill

## Overview

This skill helps plan weekly dinners and shopping lists based on your family's
preferences, dietary restrictions, budget, and available recipes.

---

## Onboarding — First-Time Setup

**When to run this:** Start by reading `family.md`. If it still contains the
placeholder text `Person 1`, the skill hasn't been set up yet. Run the
interview below before doing anything else, then proceed to planning.
If `family.md` already has real names and preferences, skip straight to Planning Rules.

The goal of the interview is to write a good `family.md` and `preferences.md`.
Conduct it in two rounds using the `AskUserQuestion` tool, then write both files.

### Round 1 — Household Basics

Ask all four questions together in a single `AskUserQuestion` call:

1. **How many people are you planning meals for?**
   Options: Just me (1), Me + partner (2), Family of 3, Family of 4+

2. **What country or region are you in?**
   (This helps suggest locally available ingredients.)
   Options: USA / Canada, UK / Ireland / Europe, China, Russia, Australia / New Zealand, Asia / Pacific

3. **What's your approximate monthly grocery budget?**
   Options: Under $200, $200–$400, $400–$600, Other (ask them to type amount + currency)

4. **What types of food does your household enjoy?** (multi-select)
   Options: Italian / Mediterranean, Asian (Chinese · Thai · Vietnamese · Japanese), Comfort food (Eastern European · American · British), Global mix (Mexican · Middle Eastern · French)

### Round 2 — People & Preferences

Ask all four questions together in a second `AskUserQuestion` call:

1. **What names or nicknames should I use for each person, and what's their role?**
   Options: (guide them to use "Other" to type freely)
   Pre-fill the Other hint with an example: `Me (adult) · Alex (partner) · Mia (daughter, 8)`

2. **Does anyone have food allergies, dietary restrictions, or strong dislikes?**
   Options: No major restrictions, One person is vegetarian or vegan, Allergy in the household (nut / dairy / gluten / other), Yes — I'll describe (use Other to type details)

3. **Do you have school-age children who need packed snacks each day?**
   Options: Yes, No

4. **What grocery stores do you usually shop at?**
   Options: (guide them to use "Other" to type their stores)
   Other hint: `e.g. Whole Foods + Amazon Fresh` or `Tesco + Ocado`

### Round 3 — Recipes

After Round 2, ask this question on its own in a third `AskUserQuestion` call:

**Would you like to add your own recipes to the planner?**

Options:
- **No thanks — suggest dishes from your knowledge**: Claude will suggest meals based on the family's cuisine preferences each week. The recipe files will be created empty and ready for when you want to add your own later.
- **Yes — I'll share recipes now**: Ask the user to paste, describe, or upload their recipes. Claude will format them and save them to the appropriate recipe file. They can share as many or as few as they want.
- **Yes — I'll add recipes later**: Tell the user: "Any time you want to add a recipe, just say 'add this recipe' and share it — I'll save it to your collection. You can also upload a file."

**Regardless of the answer, always create the full recipes/ folder structure:**
```
recipes/
├── mains.md      — main dishes (empty or populated)
├── soups.md      — soups (empty or populated)
├── salads.md     — salads (empty or populated)
├── desserts.md   — desserts, baking, drinks (empty or populated)
└── others.md     — anything that doesn't fit the above (empty or populated)
```

Each empty file should have a one-line header comment so the user knows what goes there, e.g.:
```
# Main Dishes
<!-- Add your recipes here. Start each one with: ## Recipe Name -->
```

When saving a new recipe, use `others.md` for anything that doesn't clearly belong in mains, soups, salads, or desserts — snacks, sauces, marinades, breakfast dishes, etc.

**If they choose to share recipes now:**
1. Ask them to share (paste text, describe dishes, or upload a file — whatever's easiest).
2. Format each recipe consistently:
   - A `## Recipe Name` header
   - An ingredients list
   - Numbered steps
   - Optional: time, servings, notes
3. Save to the appropriate file (`mains.md`, `soups.md`, `salads.md`, or `desserts.md`).
4. Tag family-contributed recipes with 👨‍👩‍👧 so they get priority in planning.
5. Confirm: "Added [N] recipes to your collection! These will be prioritized when planning."

### After all rounds — write the config files

Write both files immediately using the information from Rounds 1 and 2:

- **`family.md`** — one section per person with their name, role, and any restrictions or dislikes mentioned. For likes, add a few sensible suggestions based on the cuisines they chose (you'll refine these over time). Mark children with their approximate age.
- **`preferences.md`** — location/country, budget (in their currency), stores, cuisine list, meal structure (dinners + snacks if applicable). Add a note about recipe source: "Own recipe collection" if they added recipes, or "AI suggestions" if not.

Then tell the user: "Setup complete! Your family profile is saved to `family.md` and `preferences.md` — you can edit these any time to add more detail. Ready to plan your first week — just say 'plan this week' or ask for meal ideas."

If the user already had a planning request when they triggered the skill, proceed to fulfill it now.

---

## Key Files

### Always load (small files)
- `family.md` — family members, preferences, and dietary restrictions
- `preferences.md` — budget, grocery stores, meal structure, cuisine preferences
- `history.md` — last 4 weeks of meals (for the no-repeat rule)

> **No recipe collection yet?** If the `recipes/` directory is empty or missing,
> suggest dishes from your own knowledge based on the family's cuisine preferences
> in `preferences.md`. Focus on variety and dietary fit.

### Recipe files
- `recipes/mains.md` — main dishes (all in one file)
- `recipes/soups.md` — soups
- `recipes/salads.md` — salads
- `recipes/other.md` — baking, desserts, drinks (on request only)

If a recipe file grows large (100+ recipes), you can split it — but start with single files.

**Loading recipes efficiently:**
- Use `grep "^## " recipes/mains.md` to get a list of all dish names first
- Then `Read(file, offset=<line>, limit=60)` to load only the ones you want to use
- Never load a full recipe file when you only need a few dishes from it

### HTML template
Read `assets/template_schema.md` (not `assets/meal_plan_template.jsx`).
It contains: colors, data structures, template example — everything needed to generate HTML.

### Other
- `snack_resources.md` — snack ideas for children (if applicable)

---

## Family Quick Reference

**Do not hardcode family info here.** Always read `family.md` before planning to get:
- Who is in the family
- Each person's food preferences and dislikes
- Any dietary restrictions or allergies
- Children's school snack preferences (if applicable)

---

## Planning Rules

### Menu
1. Plan 5–7 dinners per week.
2. Vary cuisines based on preferences in `preferences.md`.
3. Check each dish against each person's dislikes (read from `family.md`).
4. Flag dishes that may conflict with a family member's restrictions.
5. **Soup is separate from dinner.** If the family plans a weekly soup,
   it lives in the fridge and is eaten for lunch across the week.
   Always plan a dinner dish on soup day too, not instead of it.
   Format soup day as: "Mon — soup: [name] + dinner: [name]"
6. **Every dinner should follow the Harvard Plate principle:**
   - 1/2 plate = vegetables (non-starchy)
   - 1/4 plate = quality protein (meat, fish, eggs, legumes)
   - 1/4 plate = complex carbohydrates (rice, potato, pasta, bread)
   - Add healthy fat (olive oil, butter, avocado, nuts)
   The salad assigned to each day serves as the vegetables component.

### No-repeat rule (check history.md first)
Read `history.md` before picking dishes. Do not repeat any main dish that appeared
in the last 2 weeks. Soups can repeat if it has been more than 1 week.
After outputting the final plan, update `history.md`:
- Append a new section for the current week
- List the soup, all dinners, and all salads
- Remove the oldest entry if there are more than 4 weeks recorded
Keep the file tidy — it's read every session.

### Daily salads (variety from salads.md)
Each dinner day gets a different salad. The salad is the vegetables half of
the Harvard plate — it's a planned part of each meal, not just a garnish.

How to select salads:
1. Use grep to find all `## ` section headers in `salads.md`.
2. Cross-reference with `history.md` — avoid salads served in the last 2 weeks.
3. Pick 5–7 varied salads (different bases: leafy, tomato/cucumber, grain, fish, egg, etc.).
4. Check each salad against family restrictions from `family.md`.
5. Load only the selected salads' text from `salads.md` (use offset/limit around each section).
6. Include each salad's ingredients in the shopping list and its recipe in the Recipes section.

### Shopping list
1. Group by store as specified in `preferences.md`.
2. Group by category: produce, dairy, meat/fish, pantry, frozen.
3. Compare to budget from `preferences.md` and flag if approaching the limit.
4. If a recipe calls for an ingredient that may be hard to find locally, suggest a
   substitution based on the country/region in `preferences.md`. Note the substitute
   clearly (e.g. "crème fraîche (or sour cream)"). If the user has pre-listed
   substitutions in `preferences.md`, always use those first.

### School snacks (if applicable)
If the family has school-age children (check `family.md`):
1. Always include snacks in the weekly plan.
2. Vary snacks each week — don't repeat the same set. Mix from these categories:
   - Fruit (ripe, easy to eat)
   - Dairy — yogurt, cheese
   - Protein — boiled egg, homemade nuggets, onigiri
   - Crunchy — crackers, rice cakes, biscuits
   - Vegetables — edamame, cauliflower bites, corn
3. Suggest one homemade snack per week (rotate from `snack_resources.md` if available).
4. Check `history.md` to avoid repeating recent snacks.

---

## Output Format

Always output the meal plan as a **self-contained interactive HTML app** — never plain markdown.
The app opens in the browser with an interactive shopping checklist and recipe navigator.

Read `assets/meal_plan_template.jsx` first — it is the canonical reference for component structure,
data shapes, colors, and rendering logic. Reproduce it exactly, replacing the hardcoded
`shopping` and `days` arrays with this week's actual data.

### How to deliver the HTML

**In Claude Code:**
1. Generate the full HTML (see structure below).
2. Write it to `/tmp/meal-plan-YYYY-MM-DD.html`.
3. Run `open /tmp/meal-plan-YYYY-MM-DD.html` to open in the browser.
4. Tell the user: "Opening in browser → `/tmp/meal-plan-YYYY-MM-DD.html`"

**In Claude.ai:**
Output the full HTML as an artifact with type `text/html`. It will render inline
and the user can open it full-screen. No file writing needed.

### HTML wrapper structure

Wrap the React component in this shell (React + Babel loaded via CDN — no build step):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weekly Meal Plan: [date – date]</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body style="margin:0">
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React;

    // ── DATA ──────────────────────────────────────────────────────────────────
    const shopping = [ /* ...this week's categories + items... */ ];
    const days     = [ /* ...this week's days... */ ];

    // ── COMPONENT ─────────────────────────────────────────────────────────────
    // Paste the full RecipeBook component from assets/meal_plan_template.jsx here.
    // Change nothing in the component logic — only the data arrays above.

    ReactDOM.createRoot(document.getElementById('root')).render(<RecipeBook />);
  </script>
</body>
</html>
```

### Component structure (from template — reproduce exactly)
- **Header:** dark bg `#2c2416`, week dates, two tabs: "🛒 Shopping" / "📖 Recipes"
- **Shopping tab:** progress bar · budget note · category groups · tap-to-check items · reset button
- **Recipes tab:** day selector strip · recipe header (emoji + title + time/servings badges) ·
  Harvard plate chips · Ingredients / Steps sub-tabs · `──` section dividers ·
  numbered step circles · 💡 tip block · Prev / Next navigation

### Harvard plate chip colours
- vegetables ½ → bg `#EAF3DE`, text `#3B6D11`
- protein ¼ → bg `#E6F1FB`, text `#185FA5`
- carbs ¼ → bg `#FAEEDA`, text `#854F0B`
- fats → bg `#FBEAF0`, text `#993556`

### Day accent colours (Mon → Sun)
`#7eb8a4` · `#c47e3e` · `#9b8fc4` · `#d4894e` · `#7eb8a4` · `#e8c547` · `#6ea8d4`

### Soup + dinner day
Ingredients: two blocks separated by `── Soup ──` and `── Dinner ──`.
Steps: soup steps first, then dinner steps.

### Each recipe day includes a salad (mandatory)
Every day **must** have a named salad block. Pattern:
- Ingredients: add `── Salad: [Name] ──` as a section divider, followed by salad ingredients
- Steps: append 2–3 salad steps after the main dish steps
- Plate chip "vegetables ½": reference the salad by name
- Each day must have a **different** salad

### Recipe steps
Write plain instruction text — strip any external numbering artifacts from recipe sources.
Steps render as 1, 2, 3… automatically.

---

## Important Notes

- Family recipes (if marked with a special tag in your collection) take priority over
  generic recipes when planning — they're proven family favorites.
- If the user asks to find a specific recipe — search in the recipes folder first,
  then suggest a web search if not found.
- If the user uploads a new recipe — add it to the appropriate file in `recipes/`
  and note who in the family it's suitable for.
