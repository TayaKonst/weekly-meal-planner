# 🍽️ Weekly Meal Planner — Claude Skill

A Claude skill that plans your weekly dinners, builds a shopping list, and delivers everything as a beautiful interactive HTML app — personalized for your family's tastes, dietary restrictions, and budget.

---

## What it does

- **Plans 5–7 dinners per week** with variety across cuisines
- **Generates a shopping list** grouped by store and category
- **Outputs an interactive HTML app** — tap items off your list, browse recipes day by day
- **Remembers what you cooked** and avoids repeating dishes in the last 2 weeks
- **Follows the Harvard Plate** — each meal is balanced with vegetables, protein, carbs, and healthy fat
- **Plans school snacks** for children (optional)
- **Works with your own recipes** or falls back to Claude's suggestions if you don't have any

---

## How to install

This is a skill for [Claude Code](https://claude.ai/code). To install it:

1. Download the `.skill` file from the [Releases](../../releases) page
2. In Claude Code, run:
   ```
   /install-skill weekly-meal-planner.skill
   ```
3. That's it — Claude will detect the skill automatically next time you ask about meals

---

## First-time setup

The first time you use the skill, Claude will run a short onboarding interview — no manual file editing needed.

**Round 1 — Household basics:**
- How many people are you cooking for?
- What country or region are you in?
- Monthly grocery budget
- Favourite cuisines

**Round 2 — Your people:**
- Names/nicknames and roles for each family member
- Any dietary restrictions, allergies, or strong dislikes
- School-age children needing packed snacks?
- Grocery stores you shop at

**Round 3 — Recipes:**
- Use Claude's suggestions, add your own recipes now, or add them later

After answering, Claude writes your `family.md` and `preferences.md` automatically and is ready to plan.

---

## Using the skill

Just talk to Claude naturally:

> *"Plan meals for this week"*
> *"What should I cook this week?"*
> *"Make me a shopping list"*
> *"Suggest some dinner ideas"*

Claude will produce an interactive HTML meal plan — open it in your browser for a tap-to-check shopping list and a recipe navigator for each day.

---

## Adding your own recipes

At any point you can tell Claude:

> *"Add this recipe: [paste or describe it]"*
> *"I have a recipe file I want to add"* (then upload it)

Claude will format it and save it to your `recipes/` folder. Your own recipes get priority over AI suggestions when planning.

---

## File structure

```
weekly-meal-planner/
├── SKILL.md              — skill instructions (don't edit)
├── family.md             — your family's preferences (auto-filled during onboarding)
├── preferences.md        — budget, stores, cuisines (auto-filled during onboarding)
├── history.md            — recent meals (updated automatically each week)
├── snack_resources.md    — snack ideas for children
├── recipes/
│   ├── mains.md          — main dishes
│   ├── soups.md          — soups
│   ├── salads.md         — salads
│   └── other.md          — baking, desserts, drinks
└── assets/
    ├── meal_plan_template.jsx   — React component for the HTML output
    └── template_schema.md       — data structure reference
```

`family.md` and `preferences.md` are the only files you ever need to touch — and only if you want to update your info after onboarding.

---

## Output preview

The weekly plan opens as a self-contained HTML file in your browser:

- **Shopping tab** — grouped by store, tap to check off items, progress bar, budget estimate
- **Recipes tab** — day-by-day navigator with ingredients, step-by-step method, and Harvard Plate breakdown for each meal

---

## Customizing

Edit `family.md` any time to update preferences, add a new family member, or change restrictions. Edit `preferences.md` to update your budget, stores, or cuisine preferences. Changes take effect on the next planning session.
