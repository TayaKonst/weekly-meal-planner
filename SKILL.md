---
name: weekly-meal-planner
description: Plans family meals, weekly menus and shopping lists, and finds or saves recipes. Use for "what should I cook", "plan meals", dinner ideas, groceries, recipes or any meal planning request.
---

# Weekly Meal Planner

Plans a household's meals and shopping list from its preferences, dietary restrictions, budget
and recipes. Reply in the user's language (English by default).

## Where files live

**Skill files** (`assets/`, `templates/`) are next to this SKILL.md. Never put the user's data there:
updating the skill replaces that folder.

**User data** is `family.md`, `preferences.md`, `history.md`, `recipes/` and `plans/`.
Below, these names always mean the files in the user's data location:

- **Claude Code:** the folder `meal-planner` in the user's home directory (`~/meal-planner/`).
- **Claude app (web, desktop, mobile):** files attached to the chat or in the Project's knowledge,
  or a folder the user has connected. Files you create in a chat's own workspace don't carry over
  to the next chat, so whenever you create or change a data file, give it to the user to download
  and ask them to add it to their Project, replacing the old copy. Don't say it is saved until they have.

Read `family.md`, `preferences.md` and `history.md` first, every time. If `family.md` or
`preferences.md` is missing, run First-Time Setup.

---

## First-Time Setup

### Step 1 — Ask one question at a time

Ask each question separately, wait for the answer, then ask the next. Never send several questions
together.

- Use the tool that shows clickable options (`AskUserQuestion` in Claude Code, or its equivalent in the
  Claude app), with **one question per call** and 2–4 options.
- The user must always be able to write their own answer. `AskUserQuestion` adds "Other" by itself. If
  your tool doesn't, make the last option "Something else (I'll type it)".
- If there is no such tool, ask in chat: one question per message, with numbered options and
  "or write your own".
- **Never announce a question without asking it.** Don't write an introduction such as "I need a few
  answers first" and stop. Ask in the same turn, and until setup is finished end every turn with a
  question the user can see.
- If the tool fails, closes, or returns no answer, ask the same question again in chat with numbered
  options. If the user chose to skip it, go on with a sensible default, but a skipped allergy question
  isn't a "no": ask it again in chat.
- Skip anything the user has already told you. If an answer needs details, ask for them next, also as
  one question. Keep questions short.

| # | Question | Options |
|---|---|---|
| 1 | Who are you cooking for? | Just me · Me and my partner · Family with children |
| 1a | *With children:* How many adults and children? | 2 adults + 1 child · 2 adults + 2 children · 2 adults + 3 children · 1 adult + 1 child |
| 1b | *With children:* How old are they? (multi-select) | Under 3 · 3–5 · 6–12 · 13 or older |
| 1c | *School age:* Do they take food to school? | Snacks · Packed lunch · Both · No |
| 1d | *Takes food to school:* Does the school have food rules? | No rules · Nut-free · Not sure |
| 2 | Any food allergies? (multi-select) | None · Peanuts or tree nuts · Milk or eggs · Gluten, fish or other |
| 2a | *Any allergy:* Who has it, and to what exactly? | Suggest likely answers from 1 and 2 |
| 3 | Any special diet? (multi-select) | None · Vegetarian or vegan · Halal or kosher · Fasting days |
| 3a | *Any diet:* Who follows it, and how? | Suggest likely answers |
| 4 | Anything someone really dislikes? (multi-select) | Nothing · Fish or seafood · Mushrooms · Spicy food |
| 5 | Which country are you in? | United States · United Kingdom · Canada · Australia |
| 6 | Where do you shop? (multi-select) | 3–4 popular grocery stores in that country |
| 7 | What's your weekly grocery budget? | 3 amounts in local currency that suit the household · No fixed budget |
| 8 | Which meals should I plan? (multi-select) | Breakfast · Lunch · Dinner |
| 9 | What food do you enjoy? (multi-select) | Italian / Mediterranean · Asian · Comfort food · Mexican / Middle Eastern |
| 10 | Do you want to use your own recipes? | Use your ideas · Share recipes now · Add them later |

Use "you", "partner", "child (8)" and so on unless the user gives names. Never skip question 2, and
never guess an allergen: if 2a is still unclear, ask again before planning anything.

### Step 2 — Write the files

Before planning, create all of these in the user's data location:

- `family.md` and `preferences.md`, following `templates/family.md` and `templates/preferences.md`.
  Use only what the user told you. Remove unused sections and all placeholder text.
- `history.md`, copied from `templates/history.md`.
- `recipes/mains.md`, `soups.md`, `salads.md`, `desserts.md` (desserts, baking, drinks) and
  `others.md` (everything else), each with a heading and the line
  `<!-- Start each recipe with: ## Recipe Name -->`.

If the user chose to share recipes now, ask for them and save them (see Recipes).
Then tell the user where their files are, and that they can add favorite recipes any time by sending
you a link, text, photo or file. Go on with their original request. If they only
asked for setup, suggest saying "plan this week".

---

## Recipes

To save a recipe, add it to the matching file in `recipes/` as `## Recipe Name 👨‍👩‍👧`, followed by
ingredients, numbered steps, and time, servings and notes if known. Note who it suits.
The user can give you recipes as pasted text, a link, a photo, a file, or a description, one or many
at a time. "Save this to our favorites" means the same. If a recipe with that name is already saved,
ask before replacing it. After saving, say which recipe went into which file, and mention any
ingredient that conflicts with someone's allergy or restriction.

Every recipe in `recipes/` was chosen by the user, so it comes before your own ideas when planning.
Users may also add recipes or whole files there by hand: use them even without the 👨‍👩‍👧 mark or
the usual format.

**From a link:** fetch the page, translate it if needed, convert to the units in `preferences.md`
(metric, e.g. grams and °C, unless the user prefers US units), and rewrite the steps in your own words.
Keep the source link and tag who eats it. If you can't open the page, ask the user to paste the recipe;
never guess what it says.

**Large files:** if a category file is very large, start a part 2 (e.g. `desserts_2.md`) instead of
rewriting it. Include part 2 files when you look for recipes.

**Scaling and substitutions:** scale recipes to what the user has (e.g. 5 bananas instead of 3), and
explain what changes if an ingredient is reduced (less sugar: denser, paler, shorter shelf life).
Replace hard-to-find or unwanted shortcuts with homemade versions (e.g. no curry paste: yogurt and
spice marinade).

To find recipes, list the `## ` headings first, then read only the recipes you need. If a requested
recipe isn't there, say so and offer one of your own or a web search. If there are no saved recipes,
plan from your own knowledge.

---

## Planning Rules

### Menu
1. Read `preferences.md` to find which meals are planned (e.g. Breakfast only, Dinner only, Breakfast + Lunch + Dinner, etc.). Plan 5–7 days per week (7 unless the user says otherwise), with a dish for **each selected meal type**. If no meal types are listed, default to Dinner.
2. Vary cuisines based on preferences in `preferences.md`.
3. **Allergies and dietary restrictions are hard limits.** Never plan a dish that breaks one for
   anyone eating it. Check every ingredient, including sauces, stock, garnishes, salads and snacks.
   If a product often contains a hidden allergen, write "check the label" next to it in the
   shopping list.
4. Avoid each person's dislikes (from `family.md`). If a dish is still worth including, say how to
   serve it differently for that person.
5. **Soup is separate from dinner.** If the family plans a weekly soup,
   it lives in the fridge and is eaten for lunch across the week.
   Always plan a dinner dish on soup day too, not instead of it.
   Format soup day as: "Mon — soup: [name] + dinner: [name]"
6. **Lunch and dinner should follow the Harvard Plate principle:**
   - 1/2 plate = vegetables (non-starchy)
   - 1/4 plate = quality protein (meat, fish, eggs, legumes)
   - 1/4 plate = complex carbohydrates (rice, potato, pasta, bread)
   - Add healthy fat (olive oil, butter, avocado, nuts)
   The salad assigned to each day serves as the vegetables component for lunch/dinner.
   Breakfast does not need to follow Harvard Plate — keep it practical and quick.

### Use what's in the fridge
1. Before planning a week, ask what is already in the fridge and pantry, unless the user has said.
   Ask it on its own, the same way as in setup: Nothing special · Pantry basics (rice, pasta, oil,
   spices) · I'll list what I have.
   Use it first (e.g. a cauliflower becomes a side that same day), and leave it off the shopping list.
2. If the user has a fixed amount of an ingredient, check that it is enough and say how much more to buy.
   For meat, allow about 150 g (5 oz) per adult at dinner, less for a child, and about 100 g (3.5 oz)
   per packed lunch.

### Packed lunches
If a child takes lunch to school the next day:
1. Plan that dinner with an extra portion, and pick dishes that reheat well and keep in a thermos
   (stews, stir-fries with rice).
2. Add a step: "Set aside a portion and chill it promptly. In the morning, reheat until steaming hot
   and put it in a preheated thermos."
3. Follow the school's food rules in `preferences.md` for packed lunches and snacks. If they aren't
   there, ask. Nut-free means no peanuts or tree nuts. Don't assume sesame is allowed if the child or
   the school avoids it.

### When the user rejects a dish
Replace it right away, in the plan file and shopping list too. Log it with the date and reason
("didn't eat well last time", "not this week") under `## Rejected dishes` in `history.md`, and don't
suggest it again soon. Keep this section when you remove old weeks; drop entries that no longer apply.

### No-repeat rule (check history.md first)
Read `history.md` before picking dishes. Do not repeat any main dish that appeared
in the last 2 weeks. Soups can repeat if it has been more than 1 week.
Also avoid ingredients the family has eaten a lot recently (e.g. chicken four times last week).
After outputting the final plan, update `history.md`:
- Add a section for this week above the older weeks
- List every planned dish by meal type, plus the soup, salads and snacks
- Remove the oldest entry if there are more than 4 weeks recorded
Keep the file tidy — it's read every session.

### Daily salads
Each lunch or dinner day gets a different salad. The salad is the vegetables half of
the Harvard plate — it's a planned part of each meal, not just a garnish.
Skip salads on breakfast-only days.

How to select salads:
1. List the `## ` headings in `recipes/salads.md`. If there are none, use your own ideas.
2. Cross-reference with `history.md` — avoid salads served in the last 2 weeks.
3. Pick 5–7 varied salads (different bases: leafy, tomato/cucumber, grain, fish, egg, etc.).
4. Check each salad against family restrictions from `family.md`.
5. Load only the selected salads' text.
6. Include each salad's ingredients in the shopping list and its recipe in the Recipes section.

### Shopping list
1. Group by store as specified in `preferences.md`.
2. Group by category: produce, dairy, meat/fish, pantry, frozen.
3. Stay within the budget (see Output Format, step 1). Count what is bought this week at full pack price.
4. If a recipe calls for an ingredient that may be hard to find locally, suggest a
   substitution based on the country/region in `preferences.md`. Note the substitute
   clearly (e.g. "crème fraîche (or sour cream)"). If the user has pre-listed
   substitutions in `preferences.md`, always use those first.

### School snacks (if applicable)
If "School snacks" is listed in the meal structure in `preferences.md` AND the family has school-age children (check `family.md`):
1. Always include snacks in the weekly plan.
2. Vary snacks each week — don't repeat the same set. Mix from these categories:
   - Fruit (ripe, easy to eat)
   - Dairy — yogurt, cheese
   - Protein — boiled egg, homemade nuggets, onigiri
   - Crunchy — crackers, rice cakes, biscuits
   - Vegetables — edamame, cauliflower bites, corn
3. Suggest one homemade snack per week (rotate from `assets/snack_resources.md`).
4. Check `history.md` to avoid repeating recent snacks.

---

## Output Format

Deliver a weekly plan as the interactive HTML app. For a quick question (one recipe, a few dinner
ideas), just answer in chat.

1. **Fit the budget before building the page**, unless there is no fixed budget. The weekly limit is the weekly budget, or the monthly
   budget ÷ 4.3. Add up the whole shopping list, pantry staples included. While the total is over the
   limit, make it cheaper and add it up again: swap expensive dishes (salmon, shrimp, beef) for eggs,
   beans, tofu or chicken, reuse the same ingredients across days, and drop sauces, cheeses and spices
   used only once. Deliver an over-budget plan only if the user agrees or it can't be avoided; then say
   by how much and why.
2. Read `assets/template_schema.md`.
3. Copy `assets/meal_plan_template.html` to `plans/meal-plan-YYYY-MM-DD.html` in the user's data
   location, using the first day of the plan as the date. Copy it with a shell command; don't retype it.
   In the Claude app, copy it to the place for files the user can download.
4. Replace `"__PLAN_DATA__"` in the copy with this week's data, then check that the placeholder is gone.
5. Open it: `open` on macOS, `start ""` on Windows (cmd), `xdg-open` on Linux. In the Claude app, give
   the user the file. If you can't create files there, make the app an HTML artifact instead.
6. Update `history.md`.
7. Tell the user where the file is, the estimated cost against the budget, and anything to
   double-check (allergen labels, substitutions). Prices are estimates; say so.

### What goes in each day

- **Title:** lead with the dinner or most substantial meal, e.g. "Chicken Tikka + Avocado Toast".
- **Sections:** one per dish, in both `ingr` and `steps`: "Breakfast: …", "Lunch: …", "Soup",
  "Dinner: …", "Salad: …".
- **Salad:** every day with lunch or dinner has a named salad, different each day, with its own
  ingredients and 2–3 steps. Put its name in `salad` and mention it in `plate.veg`.
- **Plate:** describes lunch and dinner only.
- **Breakfast:** if breakfast is planned, name it in `breakfast`. If someone has a fasting day, always
  plan its breakfast to fit the fast as described in `family.md`.
- **Side:** an extra dish, such as one made from leftovers, goes in `side`.
- **Child's portion:** if it differs (no sauce, milder, cut smaller), say how in `childNote`.
- **Source:** for a recipe from the web, put its link in `source`.
- **Snack:** each school day's snack goes in `snack`, and its ingredients in the shopping list.
- **Shopping list:** must cover every ingredient in every dish, apart from basics such as salt and water.
