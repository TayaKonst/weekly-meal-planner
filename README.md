# 🍽️ Weekly Meal Planner — a skill for Claude

Tell Claude who you cook for, and it plans your week: meals that suit everyone, recipes, and a shopping list for your stores and budget. You get it all as an interactive page with a tap-to-check shopping list.

- Plans any mix of breakfast, lunch, dinner, and school snacks
- Takes allergies, diets, and dislikes into account
- Builds balanced lunches and dinners using the Harvard Plate
- Uses up what's already in your fridge
- Avoids repeating main dishes from the last two weeks, and remembers dishes you turned down
- Plans extra portions for school lunches
- Uses your own recipes, Claude's ideas, or both

> Claude can make mistakes. If someone has a food allergy, check every recipe and label yourself.

## Install

Choose the one you use:

- **[Claude app](#claude-app)**: claude.ai in a browser, or the Claude desktop app. Nothing technical needed.
- **[Claude Code](#claude-code)**: remembers your family and past meals automatically.

### Claude app

1. Download **[weekly-meal-planner.zip](https://github.com/TayaKonst/weekly-meal-planner/releases/latest/download/weekly-meal-planner.zip)**. Don't unzip it. (If your Mac unzips it automatically, right-click the folder and choose **Compress**.)
2. In Claude, open **Settings → Capabilities** and turn on **Code execution and file creation**. It may be called **Create and edit files**.
3. Open **[Customize → Skills](https://claude.ai/customize/skills)**.
4. Click **+**, then **Create skill**, then **Upload a skill**, and choose the zip file.
5. Make sure **weekly-meal-planner** is switched on.
6. Create a **Project** called "Meal planning" and start your chats there.

**Why a Project?** The app doesn't carry files over from one chat to the next. After setup and after each weekly plan, Claude gives you updated files such as `family.md` and `history.md`. Add them to your Project's files, replacing the old copies, so the next chat knows your family and what you ate.

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

Say **"Plan meals for this week"**. The first time, Claude asks who you cook for, about allergies and dislikes, where you shop, your budget, which meals to plan, and what food you like. Then it makes your first plan.

If Claude answers without using the skill, say **"Use the weekly-meal-planner skill"**. In Claude Code you can also type `/weekly-meal-planner`.

## Things to say

- "Plan dinners for next week, 30 minutes max"
- "Swap Wednesday for something vegetarian"
- "What can I cook with chicken and zucchini?"
- "Add this recipe to my collection: …" (paste it or share a link)
- "I have 400 g of chicken. Is that enough for dinner and a packed lunch?"
- "We have a new budget: $120 a week"

## Your files

| File | What's in it |
|---|---|
| `family.md` | People, allergies, likes and dislikes |
| `preferences.md` | Budget, stores, cuisines, which meals to plan |
| `history.md` | The last four weeks of meals |
| `recipes/` | Your own recipes |
| `plans/` | Your weekly plans. Open them in any browser |

In Claude Code, they are in the `meal-planner` folder in your home folder. In the Claude app, they are in your Project. You can edit them or ask Claude to. They are not part of the skill, so updating it doesn't touch them.

## Update

- **Claude app:** delete the old skill in Customize → Skills, then download and upload the new zip.
- **Claude Code:** run `git -C ~/.claude/skills/weekly-meal-planner pull` (in PowerShell, `git -C "$HOME\.claude\skills\weekly-meal-planner" pull`), or ask Claude to update the skill.

## Problems?

| Problem | Try this |
|---|---|
| Claude doesn't use the skill | Check it's switched on (app) or that `~/.claude/skills/weekly-meal-planner/SKILL.md` exists (Claude Code), then start a new chat |
| The app rejects the zip | Use the link above. GitHub's green **Code → Download ZIP** button gives a differently named folder, which may be rejected |
| Claude asks setup questions again (app) | Start the chat inside your Project and check that `family.md` and `preferences.md` are in its files |
| Checkmarks disappear | Open the plan in your browser. They are saved per browser, on that device |
