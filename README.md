# 🍽️ Weekly Meal Planner — a skill for Claude

Tell Claude who you cook for, and it plans your week: meals that suit everyone, recipes, and a shopping list for your stores and budget. You get it all as an interactive page with a tap-to-check shopping list.

- Gives you one recipe at a time too, and helps while you cook
- Plans any mix of breakfast, lunch, dinner, and school snacks
- Takes allergies, diets, and dislikes into account
- Builds balanced lunches and dinners using the Harvard Plate
- Uses up what's already in your fridge
- Avoids repeating main dishes from the last two weeks, and remembers dishes you turned down
- Plans extra portions for school lunches
- Uses your own favorite recipes, Claude's ideas, or both. [Add recipes](#add-your-own-recipes) any time

> Claude can make mistakes. If someone has a food allergy, check every recipe and label yourself.

## Install

Choose the one you use:

- **[Claude app](#claude-app)**: claude.ai in a browser, or the Claude desktop app. Nothing technical needed.
- **[Claude Code](#claude-code)**: remembers your family and past meals automatically.

### Claude app

1. Download **[weekly-meal-planner.zip](https://github.com/TayaKonst/weekly-meal-planner/releases/latest/download/weekly-meal-planner.zip)**. Don't unzip it. (If your Mac unzips it automatically, right-click the folder and choose **Compress**.)
2. In Claude, open **Settings → Capabilities** and turn on **Code execution and file creation**. It may be called **Create and edit files**.
3. Click **Plugins**, then open the **Skills** tab.
4. Add a new skill there: choose the option to upload one, and select the zip file.
5. Make sure **weekly-meal-planner** is switched on.
6. Create a **Project** called "Meal planning" and start your chats there.

**Why a Project?** The app doesn't carry files over from one chat to the next. After your meal plan, reply **Save my settings** and Claude gives you files such as `family.md` and `history.md`. Add them to your Project's files, replacing the old copies, so the next chat knows your family and what you ate.

### Claude Code

The easiest way is to ask Claude Code:

> Install the skill from https://github.com/TayaKonst/weekly-meal-planner into my personal skills folder, as `weekly-meal-planner`.

Or do it yourself. This needs [Git](https://git-scm.com/downloads).

**Mac or Linux**, in Terminal:

```bash
git clone https://github.com/TayaKonst/weekly-meal-planner.git ~/.claude/skills/weekly-meal-planner
```

**Windows**, in PowerShell:

```powershell
git clone https://github.com/TayaKonst/weekly-meal-planner.git "$HOME\.claude\skills\weekly-meal-planner"
```

If Claude Code was already open, run `/reload-skills` or restart it.

## First use

Say **"Plan meals for this week"**. The first time, Claude asks short questions one at a time (10 to 16, depending on your answers): who you cook for, allergies and dislikes, where you shop, your budget, which meals to plan, and what food you like. Tap an answer or type your own. Then it makes your first plan.

If Claude answers without using the skill, say **"Use the weekly-meal-planner skill"**. In Claude Code you can also type `/weekly-meal-planner`.

## Just want one recipe?

You don't need a clever prompt or any setup. Say what you feel like, and Claude asks up to three quick questions, then makes an interactive recipe page: change the servings, tick off ingredients, and cook one step at a time with **timers**, signs that each step is done, and fixes for what usually goes wrong.

- "I want to make lasagna"
- "What can I cook with eggs, rice and half a cabbage?"
- "Something chocolatey, under 30 minutes"

Then keep going in the same chat:

- "Make a recipe page for Monday's dinner" (from your weekly plan)
- "I only have a 20 cm tin" or "I don't have cream"
- "My sauce split, what do I do?" (you can send a photo)
- "Save this to our favorites"

## Things to say

- "Plan dinners for next week, 30 minutes max"
- "Swap Wednesday for something vegetarian"
- "What can I cook with chicken and zucchini?"
- "I have 400 g of chicken. Is that enough for dinner and a packed lunch?"
- "We have a new budget: $120 a week"

## Add your own recipes

Just ask Claude. Your recipes are used before Claude's own ideas when it plans your week.

- **Send a link:** "Save this to our favorite recipes: https://…" Claude reads the page, rewrites the recipe, and keeps the link. If it can't open the page, paste the text instead.
- **Paste or describe it:** "Add this recipe: grandma's pancakes, 2 eggs, 300 ml milk…"
- **Upload it:** attach a photo of a cookbook page, a PDF, or a document and say "Add these recipes to my collection". Several at once is fine.
- **Add it yourself:** open a file in your `recipes` folder, such as `mains.md`, in any text editor. Start each recipe with a line like `## Grandma's Pancakes`, with the ingredients and steps below it.

In the Claude app, Claude gives you the updated recipe file. Add it to your Project's files, replacing the old copy, or the recipe won't be there in your next chat.

## Your files

| File | What's in it |
|---|---|
| `family.md` | People, allergies, likes and dislikes |
| `preferences.md` | Budget, stores, cuisines, which meals to plan |
| `history.md` | The last four weeks of meals |
| `recipes/` | Your own recipes |
| `plans/` | Your weekly plans. Open them in any browser |
| `cook/` | Recipe pages with timers. Open them in any browser |

In Claude Code, they are in the `meal-planner` folder in your home folder. In the Claude app, they are in your Project. You can edit them or ask Claude to. They are not part of the skill, so updating it doesn't touch them.

## Update

- **Claude app:** delete the old skill in **Plugins → Skills**, then download and upload the new zip.
- **Claude Code:** run `git -C ~/.claude/skills/weekly-meal-planner pull` (in PowerShell, `git -C "$HOME\.claude\skills\weekly-meal-planner" pull`), or ask Claude to update the skill.

## Problems?

| Problem | Try this |
|---|---|
| Claude doesn't use the skill | Check it's switched on (app) or that `~/.claude/skills/weekly-meal-planner/SKILL.md` exists (Claude Code), then start a new chat |
| The app rejects the zip | Use the link above. GitHub's green **Code → Download ZIP** button gives a differently named folder, which may be rejected |
| Claude asks setup questions again (app) | Start the chat inside your Project and check that `family.md` and `preferences.md` are in its files |
| A timer doesn't ring | Tap the page once and turn your sound up. Keep the page open: it can't ring if it is closed, and phones may silence it when the screen is locked |
| Checkmarks disappear | Open the plan in your browser. They are saved per browser, on that device |
