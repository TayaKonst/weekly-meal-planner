import { useState } from "react";

// ── EXAMPLE DATA — replace shopping[] and days[] with this week's actual data ──

const shopping = [
  { id: 1, category: "Meat & Fish", items: [
    { id: 101, name: "Whole chicken or chicken pieces — for broth (soup)", price: "~$8" },
    { id: 102, name: "Beef, braised, 400 g", price: "~$10" },
    { id: 103, name: "Chicken thighs/drumsticks, 800 g", price: "~$9" },
    { id: 104, name: "Shrimp, ~400 g", price: "~$10" },
  ]},
  { id: 2, category: "Dairy & Eggs", items: [
    { id: 201, name: "Eggs, 20 pcs", price: "~$6" },
    { id: 202, name: "Ricotta or cottage cheese, 500 g", price: "~$4" },
    { id: 203, name: "Sour cream", price: "~$3" },
    { id: 204, name: "Butter, unsalted", price: "~$5" },
    { id: 205, name: "Hard cheese for grating", price: "~$5" },
  ]},
  { id: 3, category: "Produce", items: [
    { id: 301, name: "Potatoes, ~2 kg", price: "~$3" },
    { id: 302, name: "Onions, 4 pcs", price: "~$2" },
    { id: 303, name: "Garlic", price: "~$1" },
    { id: 304, name: "Tomatoes", price: "~$4" },
    { id: 305, name: "Cucumbers", price: "~$3" },
    { id: 306, name: "Mushrooms", price: "~$4" },
    { id: 307, name: "Fresh herbs (parsley / spring onion)", price: "~$2" },
    { id: 308, name: "Seasonal fruit", price: "~$5" },
  ]},
  { id: 4, category: "Pantry", items: [
    { id: 401, name: "Pasta, 500 g", price: "~$3" },
    { id: 402, name: "Rice", price: "~$3" },
    { id: 403, name: "Soy sauce", price: "~$3" },
    { id: 404, name: "Olive oil", price: "~$5" },
    { id: 405, name: "Flour, 500 g", price: "~$2" },
  ]},
  { id: 5, category: "Online / Delivery", items: [
    { id: 501, name: "Coconut milk, 400 ml", price: "~$2.5" },
    { id: 502, name: "Lemongrass, 2 stalks", price: "~$2" },
    { id: 503, name: "Fresh ginger", price: "~$1.5" },
    { id: 504, name: "Sesame oil", price: "~$4" },
  ]},
];

const days = [
  {
    day: "Mon", title: "Chicken Soup + Stir-Fried Noodles", emoji: "🥣", color: "#7eb8a4", time: "soup ~1.5 h · noodles 30 min", servings: "4",
    plate: [
      { label: "vegetables ½", note: "greens (soup) + bean sprouts (noodles) + cucumber salad", color: "#3B6D11", bg: "#EAF3DE" },
      { label: "protein ¼", note: "chicken (broth) + beef", color: "#185FA5", bg: "#E6F1FB" },
      { label: "carbs ¼", note: "potato (soup) + noodles", color: "#854F0B", bg: "#FAEEDA" },
      { label: "fats", note: "sour cream, sesame oil", color: "#993556", bg: "#FBEAF0" },
    ],
    ingredients: [
      "── Soup ──",
      "Chicken — for broth",
      "Potato — 3 pcs",
      "Onion — 1 pc",
      "Carrot — 1 pc",
      "Fresh herbs — large bunch",
      "Salt, bay leaf",
      "Sour cream — to serve",
      "── Dinner: Stir-Fried Noodles ──",
      "Beef, braised — 400 g",
      "Noodles — 400 g",
      "Bean sprouts — 200 g",
      "Garlic — 2 cloves",
      "── Sauce (mix in advance) ──",
      "Soy sauce — 4 tbsp",
      "Sugar — ½ tsp",
      "Water — 120 ml",
      "Vegetable oil — 1 tbsp",
      "Sesame oil — ½ tsp (at the end)",
      "── Salad: Cucumber with Dill ──",
      "Cucumbers — 2 pcs",
      "Fresh dill or spring onion",
      "Sour cream — 2 tbsp",
      "Salt, pinch of sugar",
    ],
    steps: [
      "Soup: make chicken broth with onion and carrot, ~1.5 h.",
      "Add potato, cook until tender ~15 min.",
      "Add chopped greens at the end. Season with salt.",
      "Serve with sour cream. Soup keeps in the fridge all week — lunches sorted!",
      "Noodles: heat oil in a pan, add garlic for 10 sec.",
      "Add beef and a few tbsp of braising juices. Heat until sizzling.",
      "Add noodles and sauce. Cover, cook 3–4 min. Don't stir first 2 min!",
      "Add bean sprouts, cook 30–40 sec — keep them crunchy.",
      "Finish with sesame oil off the heat.",
      "Salad: slice cucumbers, salt, let sit 5 min. Add dill and sour cream.",
    ],
    note: "💡 Soup on Monday: it cooks itself and provides lunches for the whole week. Noodles: don't stir the first 2 min for that wok-hei effect.",
  },
  {
    day: "Tue", title: "Spanish-Style Chicken with Potatoes & Orange Glaze", emoji: "🍊", color: "#c47e3e", time: "~50 min", servings: "4",
    plate: [
      { label: "vegetables ½", note: "Greek salad (tomatoes, cucumber, feta, olives)", color: "#3B6D11", bg: "#EAF3DE" },
      { label: "protein ¼", note: "chicken thighs/drumsticks", color: "#185FA5", bg: "#E6F1FB" },
      { label: "carbs ¼", note: "potato", color: "#854F0B", bg: "#FAEEDA" },
      { label: "fats", note: "olive oil, honey, feta", color: "#993556", bg: "#FBEAF0" },
    ],
    ingredients: [
      "Chicken thighs or drumsticks — 800 g",
      "Potato — 4–5 pcs",
      "Large orange — 1 pc (juice and zest)",
      "Garlic — 3 cloves",
      "Olive oil — 3 tbsp",
      "Smoked paprika — 1 tsp",
      "Honey or syrup — 1 tbsp",
      "Salt, pepper, rosemary or thyme",
      "── Salad: Greek ──",
      "Tomatoes — 2 pcs",
      "Cucumber — 1 pc",
      "Red onion — ½ pc",
      "Olives — a handful",
      "Feta — 70 g",
      "Olive oil — 1 tbsp, oregano, salt",
    ],
    steps: [
      "Marinade: orange juice and zest + honey + paprika + crushed garlic + oil + salt + pepper.",
      "Coat chicken in marinade, rest 20 min (longer is fine).",
      "Cut potato into large wedges, salt, brush with oil, spread in a roasting pan.",
      "Place chicken on top, pour remaining marinade over. Add herbs.",
      "Oven 200°C / 390°F, 40–50 min until golden.",
      "Halfway through, baste with pan juices for a richer glaze.",
      "Salad: roughly chop tomatoes and cucumber, slice onion into half-rings.",
      "Add olives, crumble feta. Dress with olive oil, oregano, salt.",
    ],
    note: "💡 Basting with pan juices halfway through makes the glaze rich and glossy. Boneless thighs work great if anyone prefers no bones.",
  },
  {
    day: "Wed", title: "One-Pan Baked Chicken with Potato & Cheese Crust", emoji: "🫕", color: "#9b8fc4", time: "~1 hour", servings: "4",
    plate: [
      { label: "vegetables ½", note: "tomatoes, mushrooms (bake) + tomato-basil salad", color: "#3B6D11", bg: "#EAF3DE" },
      { label: "protein ¼", note: "chicken breast", color: "#185FA5", bg: "#E6F1FB" },
      { label: "carbs ¼", note: "potato", color: "#854F0B", bg: "#FAEEDA" },
      { label: "fats", note: "sour cream, cheese, olive oil", color: "#993556", bg: "#FBEAF0" },
    ],
    ingredients: [
      "Chicken breast — 2 pcs",
      "Potato — 3 pcs",
      "Onion — 1 pc",
      "Tomatoes — 2 pcs",
      "Mushrooms — optional",
      "Hard cheese — for grating",
      "Sour cream — 100 g",
      "Whole-grain mustard — 3 tsp",
      "Chicken spice mix, paprika",
      "── Salad: Tomatoes with Basil ──",
      "Tomatoes — 3 pcs",
      "Fresh basil — small bunch",
      "Olive oil — 1 tbsp",
      "Salt, black pepper",
    ],
    steps: [
      "Slice chicken breast lengthwise into 2 thin pieces, pound lightly.",
      "Mix sour cream with mustard.",
      "Grease baking dish with sauce. Layer: onion rings → chicken (sauce + spices) → potato thin rounds (sauce + paprika) → tomatoes → mushrooms → cheese.",
      "Cover with foil. Oven 180°C / 350°F, 40–60 min.",
      "Done when a fork easily pierces the potato.",
      "Salad: slice tomatoes into wedges or rounds, spread on a plate.",
      "Tear basil leaves over tomatoes. Drizzle with olive oil, salt and pepper.",
    ],
    note: "💡 If potato is undercooked, par-boil sliced pieces for 5 min before layering. Add cheese only the last 10 min for a perfect crust.",
  },
  {
    day: "Thu", title: "Flatbread with Tuna Filling", emoji: "🫓", color: "#d4894e", time: "~20 min", servings: "4",
    plate: [
      { label: "vegetables ½", note: "cucumber, red onion (filling) + daikon with sesame (salad)", color: "#3B6D11", bg: "#EAF3DE" },
      { label: "protein ¼", note: "tuna, eggs, cream cheese", color: "#185FA5", bg: "#E6F1FB" },
      { label: "carbs ¼", note: "flatbread", color: "#854F0B", bg: "#FAEEDA" },
      { label: "fats", note: "cream cheese, sesame oil", color: "#993556", bg: "#FBEAF0" },
    ],
    ingredients: [
      "Flatbread — 4 pcs",
      "Canned tuna — 2 cans (140 g each)",
      "Cucumber — 1 pc",
      "Red onion — ½ pc",
      "Boiled eggs — 4 pcs",
      "Cream cheese — 4 tbsp",
      "Lime or lemon juice — ½ tsp",
      "Black pepper, spices to taste",
      "── Salad: Daikon with Sesame ──",
      "Daikon — 200 g",
      "Sesame oil — 1 tsp",
      "Soy sauce — 1 tsp",
      "Toasted sesame seeds — 1 tsp, spring onion",
    ],
    steps: [
      "Toast flatbreads in a dry pan on both sides until golden.",
      "Finely dice cucumber and onion.",
      "Mix tuna, cucumber, onion, chopped eggs, cream cheese, lime juice, and spices.",
      "Mash well with a fork — filling should be smooth.",
      "Spread filling on flatbread, fold in half or roll up.",
      "Salad: grate or julienne daikon, dress with sesame oil, soy sauce, sesame seeds and spring onion.",
    ],
    note: "💡 Quick Thursday — minimal cooking. Great for making small rolls for kids' school snacks too.",
  },
  {
    day: "Fri", title: "Cheese Dumplings (Lazy Pierogi)", emoji: "🥟", color: "#7eb8a4", time: "~50 min", servings: "4–6",
    plate: [
      { label: "vegetables ½", note: "shredded cabbage salad with herbs", color: "#3B6D11", bg: "#EAF3DE" },
      { label: "protein ¼", note: "ricotta / cottage cheese, eggs", color: "#185FA5", bg: "#E6F1FB" },
      { label: "carbs ¼", note: "flour (dough), semolina", color: "#854F0B", bg: "#FAEEDA" },
      { label: "fats", note: "butter, sour cream, sunflower oil", color: "#993556", bg: "#FBEAF0" },
    ],
    ingredients: [
      "Ricotta or cottage cheese, 5% — 500 g",
      "Eggs — 1–2 pcs",
      "Sugar — 2–3 tbsp (optional)",
      "Flour — 1–1.5 cups",
      "Semolina — 2–3 tbsp (optional, for texture)",
      "Salt — a pinch",
      "Butter — 3 tbsp (to serve)",
      "Sour cream — to serve",
      "── Salad: Shredded Cabbage ──",
      "White cabbage — 200 g",
      "Spring onion — a few stalks",
      "Sunflower oil — 1 tbsp",
      "Salt, pinch of sugar, vinegar — optional",
    ],
    steps: [
      "Pass ricotta through a sieve for a smooth texture.",
      "Add eggs, sugar, salt, melted butter — mix well.",
      "Stir in sifted flour (and semolina), knead a soft dough.",
      "Bring a large pot of salted water to a boil.",
      "Divide dough in 2, roll into a log, flatten slightly, cut into pieces.",
      "Boil until they float to the surface.",
      "Remove with a slotted spoon, top with melted butter.",
      "Salad: thinly shred cabbage, salt and squeeze gently with hands until soft.",
      "Add spring onion, dress with oil. Optional: a pinch of sugar and a drop of vinegar.",
    ],
    note: "💡 Friday vegetarian dinner — quick and comforting. Make the dough slightly firmer to hold shape better while boiling.",
  },
  {
    day: "Sat", title: "Dumplings (Pelmeni) + Tomato & Cucumber Salad", emoji: "🥣", color: "#e8c547", time: "~20 min", servings: "4",
    plate: [
      { label: "vegetables ½", note: "classic tomato and cucumber salad", color: "#3B6D11", bg: "#EAF3DE" },
      { label: "protein ¼", note: "beef + pork mince", color: "#185FA5", bg: "#E6F1FB" },
      { label: "carbs ¼", note: "dumpling dough", color: "#854F0B", bg: "#FAEEDA" },
      { label: "fats", note: "butter, sour cream, sunflower oil", color: "#993556", bg: "#FBEAF0" },
    ],
    ingredients: [
      "Pelmeni (beef + pork mince, onion) — enough for the family",
      "Sour cream — to serve",
      "Butter — to serve",
      "── Salad: Classic Tomatoes & Cucumbers ──",
      "Tomatoes — 2 pcs",
      "Cucumbers — 2 pcs",
      "Spring onion or parsley",
      "Sunflower oil — 1 tbsp, salt",
    ],
    steps: [
      "Bring a large pot of salted water to a boil.",
      "Boil pelmeni until they float + 3–4 minutes.",
      "Remove with a slotted spoon.",
      "Serve with sour cream and/or butter.",
      "Salad: dice tomatoes and cucumbers, slice spring onion into rings.",
      "Salt and dress with oil. Ready in 2 minutes.",
    ],
    note: "💡 Easy Saturday dinner — everyone loves it. The salad is mandatory and takes 2 minutes.",
  },
  {
    day: "Sun", title: "Shrimp in Coconut Milk with Lemongrass", emoji: "🍤", color: "#6ea8d4", time: "~25 min", servings: "4",
    plate: [
      { label: "vegetables ½", note: "Asian sesame cucumber salad", color: "#3B6D11", bg: "#EAF3DE" },
      { label: "protein ¼", note: "shrimp", color: "#185FA5", bg: "#E6F1FB" },
      { label: "carbs ¼", note: "rice", color: "#854F0B", bg: "#FAEEDA" },
      { label: "fats", note: "coconut milk, sesame oil", color: "#993556", bg: "#FBEAF0" },
    ],
    ingredients: [
      "Shrimp — 400 g",
      "Coconut milk — 400 ml",
      "Lemongrass — 2 stalks",
      "Garlic — 3 cloves",
      "Fresh ginger — a piece",
      "Rice — to serve",
      "── Salad: Asian Sesame Cucumber ──",
      "Cucumbers — 2 pcs",
      "Sesame oil — 1 tsp",
      "Soy sauce — 1 tsp",
      "Rice vinegar — ½ tsp",
      "Toasted sesame seeds — 1 tsp, spring onion or coriander",
    ],
    steps: [
      "Cook rice.",
      "Bruise lemongrass with a knife — this releases more fragrance.",
      "Sauté shrimp in oil until pink.",
      "Add garlic and ginger — 30 sec.",
      "Pour in coconut milk, add lemongrass.",
      "Simmer 5–7 min — the sauce will absorb all the flavour.",
      "Remove lemongrass before serving. Serve with rice.",
      "Salad: thinly slice cucumbers, salt and let sit 5 min, drain water.",
      "Dress with sesame oil, soy sauce and rice vinegar. Top with sesame seeds and herbs.",
    ],
    note: "💡 Lemongrass is for flavour only — always remove it before serving. Simple Sunday with the feel of a Thai restaurant.",
  },
];

export default function RecipeBook() {
  const [view, setView] = useState("shopping");
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("ingredients");
  const [checked, setChecked] = useState({});

  const recipe = days[selected];
  const totalItems = shopping.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const toggleItem = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ background: "#2c2416", color: "#f5f0e8", padding: "20px 24px 0", borderBottom: `4px solid ${view === "recipes" ? recipe.color : "#7eb890"}`, transition: "border-color 0.3s" }}>
        <div style={{ fontSize: "11px", letterSpacing: "3px", opacity: 0.5, textTransform: "uppercase", marginBottom: "4px" }}>Weekly Meal Plan</div>
        <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Week of [Date]</div>
        <div style={{ display: "flex" }}>
          {[["shopping", "🛒 Shopping"], ["recipes", "📖 Recipes"]].map(([v, label]) => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "10px 22px", border: "none",
              background: view === v ? "#f5f0e8" : "transparent",
              color: view === v ? "#2c2416" : "#a09070",
              fontFamily: "'Georgia', serif", fontSize: "14px",
              fontWeight: view === v ? "bold" : "normal",
              cursor: "pointer", borderRadius: "6px 6px 0 0",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* SHOPPING */}
      {view === "shopping" && (
        <div style={{ flex: 1, padding: "20px 24px 40px", maxWidth: "600px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b5a3e", marginBottom: "6px" }}>
              <span>Checked: {checkedCount} of {totalItems}</span>
              <span style={{ color: checkedCount === totalItems ? "#5a9e6f" : "#6b5a3e" }}>
                {checkedCount === totalItems ? "✓ All done!" : `${totalItems - checkedCount} remaining`}
              </span>
            </div>
            <div style={{ height: "6px", background: "#e0d8c8", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(checkedCount / totalItems) * 100}%`, background: "#7eb890", borderRadius: "3px", transition: "width 0.3s" }} />
            </div>
          </div>

          <div style={{ background: "#fff8e8", border: "1px solid #e8c547", borderLeft: "4px solid #e8c547", borderRadius: "4px", padding: "10px 14px", fontSize: "14px", color: "#5a4530", marginBottom: "20px" }}>
            💰 Estimated weekly spend: <strong>~$[amount]</strong> &nbsp;·&nbsp; Monthly budget: <strong>$[budget]/month</strong>
          </div>

          {shopping.map(cat => (
            <div key={cat.id} style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#a09070", marginBottom: "8px", paddingBottom: "6px", borderBottom: "1px solid #d4c9b0" }}>
                {cat.category}
              </div>
              {cat.items.map(item => (
                <div key={item.id} onClick={() => toggleItem(item.id)} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 0", borderBottom: "1px solid #ede6d6",
                  cursor: "pointer", opacity: checked[item.id] ? 0.4 : 1, transition: "opacity 0.2s",
                }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                    border: checked[item.id] ? "2px solid #7eb890" : "2px solid #c4b898",
                    background: checked[item.id] ? "#7eb890" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                  }}>
                    {checked[item.id] && <span style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>✓</span>}
                  </div>
                  <span style={{ flex: 1, fontSize: "15px", color: "#2c2416", textDecoration: checked[item.id] ? "line-through" : "none" }}>{item.name}</span>
                  <span style={{ fontSize: "13px", color: "#a09070" }}>{item.price}</span>
                </div>
              ))}
            </div>
          ))}

          {checkedCount > 0 && (
            <button onClick={() => setChecked({})} style={{ marginTop: "8px", padding: "8px 16px", border: "1px solid #d4c9b0", background: "none", borderRadius: "4px", cursor: "pointer", fontFamily: "'Georgia', serif", fontSize: "13px", color: "#a09070" }}>
              Reset all
            </button>
          )}
        </div>
      )}

      {/* RECIPES */}
      {view === "recipes" && (
        <>
          <div style={{ display: "flex", overflowX: "auto", background: "#2c2416" }}>
            {days.map((d, i) => (
              <button key={i} onClick={() => { setSelected(i); setTab("ingredients"); }} style={{
                flex: "0 0 auto", padding: "10px 16px", border: "none", cursor: "pointer",
                background: selected === i ? d.color : "transparent",
                color: selected === i ? "#2c2416" : "#a09070",
                fontFamily: "'Georgia', serif", fontSize: "13px",
                fontWeight: selected === i ? "bold" : "normal",
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}>
                <div style={{ fontSize: "11px", opacity: 0.8 }}>{d.day}</div>
                <div>{d.emoji}</div>
              </button>
            ))}
          </div>

          <div style={{ flex: 1, padding: "24px 24px 32px", maxWidth: "600px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
              <div style={{ fontSize: "52px", lineHeight: 1 }}>{recipe.emoji}</div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: "bold", color: "#2c2416", lineHeight: 1.2, marginBottom: "8px" }}>{recipe.title}</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ background: recipe.color, color: "#2c2416", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>⏱ {recipe.time}</span>
                  <span style={{ background: "#e8e0d0", color: "#6b5a3e", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>👨‍👩‍👧 {recipe.servings}</span>
                </div>
              </div>
            </div>

            {/* Harvard plate chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
              {recipe.plate.map((p, i) => (
                <div key={i} style={{ background: p.bg, borderRadius: "20px", padding: "4px 10px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "bold", color: p.color }}>{p.label}: </span>
                  <span style={{ fontSize: "11px", color: p.color }}>{p.note}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", borderBottom: "2px solid #d4c9b0", marginBottom: "20px" }}>
              {["ingredients", "steps"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: "10px 24px", border: "none", background: "none", cursor: "pointer",
                  fontFamily: "'Georgia', serif", fontSize: "14px",
                  color: tab === t ? "#2c2416" : "#a09070",
                  borderBottom: tab === t ? `3px solid ${recipe.color}` : "3px solid transparent",
                  marginBottom: "-2px", fontWeight: tab === t ? "bold" : "normal",
                }}>
                  {t === "ingredients" ? "Ingredients" : "Method"}
                </button>
              ))}
            </div>

            {tab === "ingredients" ? (
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {recipe.ingredients.map((ing, i) => (
                  ing.startsWith("──") ? (
                    <li key={i} style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#a09070", padding: "12px 0 4px", borderBottom: "1px solid #d4c9b0" }}>{ing.replace(/──/g, "").trim()}</li>
                  ) : (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #e8e0d0", color: "#2c2416", fontSize: "15px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: recipe.color, flexShrink: 0 }} />
                      {ing}
                    </li>
                  )
                ))}
              </ul>
            ) : (
              <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {recipe.steps.map((step, i) => (
                  <li key={i} style={{ display: "flex", gap: "14px", padding: "12px 0", borderBottom: "1px solid #e8e0d0", alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%", background: recipe.color, color: "#2c2416", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "13px" }}>{i + 1}</span>
                    <span style={{ color: "#3a2e1e", fontSize: "15px", lineHeight: 1.6 }}>{step}</span>
                  </li>
                ))}
              </ol>
            )}

            {recipe.note && (
              <div style={{ marginTop: "20px", background: "#fff8e8", border: `1px solid ${recipe.color}`, borderLeft: `4px solid ${recipe.color}`, borderRadius: "4px", padding: "12px 16px", fontSize: "14px", color: "#5a4530", lineHeight: 1.6 }}>
                {recipe.note}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px" }}>
              <button onClick={() => { if (selected > 0) { setSelected(selected - 1); setTab("ingredients"); } }} disabled={selected === 0} style={{ padding: "10px 20px", border: "2px solid #d4c9b0", background: "none", borderRadius: "4px", cursor: selected === 0 ? "not-allowed" : "pointer", opacity: selected === 0 ? 0.3 : 1, fontFamily: "'Georgia', serif", fontSize: "14px", color: "#6b5a3e" }}>← Previous</button>
              <button onClick={() => { if (selected < days.length - 1) { setSelected(selected + 1); setTab("ingredients"); } }} disabled={selected === days.length - 1} style={{ padding: "10px 20px", border: "none", background: recipe.color, borderRadius: "4px", cursor: selected === days.length - 1 ? "not-allowed" : "pointer", opacity: selected === days.length - 1 ? 0.3 : 1, fontFamily: "'Georgia', serif", fontSize: "14px", fontWeight: "bold", color: "#2c2416" }}>Next →</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
