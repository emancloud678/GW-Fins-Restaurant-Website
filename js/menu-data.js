/**
 * GW FINS — MENU CONTENT
 * ----------------------------------------------------------------
 * Edit this file to update the menu. No HTML/template editing needed.
 * menu.html reads this data and renders it automatically.
 *
 * MENU_DATA has two top-level sections, switched via the tabs at the
 * top of the menu page:
 *   - dinner: the food menu (Hot, Chilled, Salads, Entrées, Sides, Desserts)
 *   - bar:    Specialty Cocktails, After Dinner Drinks, Wine List
 *
 * Each category is an object with:
 *   id      - unique slug, used for the tab/anchor (don't change once linked)
 *   label   - name shown on the tab and section heading
 *   note    - optional italic note under the heading
 *   items   - array of { name, desc, price }
 *
 * Content below reflects GW Fins' current menu as provided directly by the
 * restaurant (2026-09-13). The Entrées section in particular changes
 * nightly with the catch — update this file when the menu changes.
 * ----------------------------------------------------------------
 */

const MENU_DATA = {
  dinnerNote:
    "Our menu changes daily. Since we do not receive today's catch until 4:00 pm, this menu is one of our most recent menus. If you have specific questions, please call the restaurant at 504-581-3467.",

  dinner: {
    label: "Dinner Menu",
    categories: [
      {
        id: "hot",
        label: "Hot",
        note: "",
        items: [
          { name: "Lobster Dumplings", desc: "White fish mousseline, tomatoes, lobster butter.", price: "15" },
          { name: "Barbeque Shrimp", desc: "Abita beer, goat cheese grits, Leidenheimer crouton.", price: "16" },
          { name: "Fried Oysters", desc: "Banh mi vegetables, toasted brioche, Vietnamese glaze.", price: "17" },
          { name: "Crispy Pork Belly", desc: "Compressed watermelon, pickled ginger slaw.", price: "14" },
          { name: "Tempura Fin Wings", desc: "Crispy noodle salad, Korean glaze.", price: "15" },
          { name: "Panko Crusted Calamari", desc: "Pickled vegetables, gochujang chili aioli.", price: "15" },
          { name: "Sicilian Tuna Meatballs", desc: "Soft polenta, tomato ragu, Parmesan.", price: "15" },
          { name: "Lobster Bisque", desc: "Maine lobster, cognac creme fraiche.", price: "14" }
        ]
      },
      {
        id: "chilled",
        label: "Chilled",
        note: "",
        items: [
          { name: "Snapper Ceviche", desc: "Aji chili, plantain chips, pico, mango sorbet.", price: "15" },
          { name: "Sashimi Grade Firecracker Tuna Tacos", desc: "Ginger slaw, wasabi tobiko, avocado aioli.", price: "16" },
          { name: "Smoked Tuna Dip", desc: "House pickles, fresh dill, sesame crackers.", price: "15" },
          { name: "Gulf Shrimp Aguachile", desc: "Guacamole, watermelon salsa, shredded tortillas.", price: "17" },
          { name: "GW Fins Muffaletta", desc: "Sesame bun, Swordella, Sworderoni, olive salad.", price: "14" }
        ]
      },
      {
        id: "salads",
        label: "Salads",
        note: "",
        items: [
          { name: "Golden Beet", desc: "Mixed greens, candied walnuts, goat cheese, pickled red onions, red wine vinaigrette.", price: "13" },
          { name: "Yellow Heirloom Tomato", desc: "Local baby arugula, shaved Manchego, basil oil, balsamic reduction.", price: "14" },
          { name: "Triple Iceberg Wedge", desc: "Blue cheese & bacon, Thousand Island & tomato, creamy basil & shrimp.", price: "15" }
        ]
      },
      {
        id: "entrees",
        label: "Entrées",
        note: "The heart of the menu, and the part that changes most: fresh fish rotates daily based on what comes off the boats.",
        items: [
          { name: "Scalibut", desc: "GW Fins original, halibut, sea scallops, Royal Red shrimp risotto, snow peas, pea shoot butter.", price: "42" },
          { name: "Parmesan Crusted Sheepshead", desc: "Jumbo lump crab, asparagus, truffled potatoes, crispy capers, Meyer lemon beurre blanc.", price: "39" },
          { name: "Louisiana Black Drum", desc: "Wood grilled, sweet potato hash, chipotle butter, crispy plantains, pineapple basil glaze.", price: "37" },
          { name: "Sea Scallop Carbonara", desc: "Pappardelle pasta, fresh peas, swordfish bacon, white wine clam sauce, shaved Parmesan.", price: "35" },
          { name: "Swordfish Bolognese", desc: "Rigatoni pasta, fresh burrata, wild mushrooms, rich tomato sauce.", price: "32" },
          { name: "Center Cut Filet", desc: "Wood grilled, Brabant potatoes, crispy onions, bearnaise, house Worcestershire, veal jus.", price: "56" },
          { name: "American Red Snapper", desc: "Pan sauteed, Louisiana shrimp creole, local long grain rice, crispy okra.", price: "38" },
          { name: "Gulf Swordfish", desc: "Cast iron blackened, fried shrimp, mashed potatoes, sauteed spinach, corn butter, chili hollandaise.", price: "38" },
          { name: "Crispy Snapper Belly", desc: "Tempura fried, crispy rice noodle cake, pickled vegetables, Vietnamese glaze.", price: "34" },
          { name: "Crispy Soft Shell Crab", desc: "Bacon black eye pea succotash, sweet corn spoonbread, dirty rice, roasted corn butter.", price: "36" },
          { name: "Berkshire Pork Chop", desc: "Wood grilled, goat cheese grits, blistered shishitos, peaches, Korean glaze.", price: "35" }
        ]
      },
      {
        id: "sides",
        label: "Sides",
        note: "",
        items: [
          { name: "Mushroom Risotto", desc: "Wild mushrooms, porcini butter.", price: "9" },
          { name: "Dirty Rice", desc: "Chicken liver debris, crispy okra, pan gravy.", price: "9" },
          { name: "Compressed Watermelon & Feta", desc: "Balsamic, mint.", price: "7" },
          { name: "Mashed Sweet Potatoes", desc: "Bourbon, banana, vanilla.", price: "7" },
          { name: "Sweet Corn Spoonbread", desc: "Bacon black eyed pea succotash.", price: "9" },
          { name: "Roasted Summer Vegetables", desc: "Black garlic bordelaise.", price: "8" }
        ]
      },
      {
        id: "desserts",
        label: "Desserts",
        note: "",
        items: [
          { name: "Salty Malty Ice Cream Pie", desc: "Pretzel crust, caramel whipped cream.", price: "12" },
          { name: "Coconut on the Half Shell", desc: "Coconut sorbet, chocolate shell, Forbidden coco crispies.", price: "12" },
          { name: "Chocolate Mousse Bombe", desc: "Raspberry coulis.", price: "12" },
          { name: "GW Fins Biscuit Mix", desc: "", price: "10" },
          { name: "Banana Foster Funnel Cake", desc: "Brûléed banana, dark rum caramel, vanilla ice cream.", price: "12" },
          { name: "Crème Brûlée", desc: "Fresh fruit.", price: "13" },
          { name: "House Made Sorbet", desc: "Ask your server for daily selections.", price: "11" }
        ]
      }
    ]
  },

  bar: {
    label: "Cocktails & Wine",
    categories: [
      {
        id: "specialty-cocktails",
        label: "Specialty Cocktails",
        note: "",
        items: [
          { name: "Not At All Spritz", desc: "Zero-Proof — Giffard 'apéritif,' Fre N/A brut, soda.", price: "11" },
          { name: "French 75", desc: "Decourtet VS Cognac, lemon juice, simple syrup, Prosecco.", price: "14" },
          { name: "A Spicy Marg?", desc: "Cimarron blanco, Ancho Reyes, tamarind, hibiscus, salt rim.", price: "15" },
          { name: "Peach Hugo Spritz", desc: "Juliette Peach, Amaro Montenegro, basil, Prosecco.", price: "16" },
          { name: "Watermelon No-Jito", desc: "Zero-Proof — Watermelon, lime, mint, soda.", price: "9" },
          { name: "Poolside", desc: "Malibu coconut rum, Disaronno amaretto, pineapple, cranberry.", price: "15" },
          { name: "GW's Whiskey Bramble", desc: "73 Distilling 'Whiskey Tree' Bourbon, blueberry, lemon.", price: "16" },
          { name: "Whistle Old Fashioned", desc: "WhistlePig 6 Year rye, Angostura bitters, orange bitters.", price: "25" }
        ]
      },
      {
        id: "after-dinner-drinks",
        label: "After Dinner Drinks",
        note: "",
        items: [
          { name: "Cajun Buttered Rum", desc: "Oxbow barrel aged rum, False River spiced rum, house butter batter, whipped cream.", price: "13" },
          { name: "Cappuccino Fins", desc: "Kahlúa, Frangelico, praline liqueur, shaved chocolate.", price: "12" },
          { name: "Fins Carajillo", desc: "Espresso, Licor 43, Don Julio Reposado.", price: "15" },
          { name: "Chocolate Martini", desc: "Van Gogh Dutch Chocolate vodka, creme de cacao, chocolate rim.", price: "14" },
          { name: "Espresso Martini", desc: "Tito's, Borghetti espresso liqueur, espresso.", price: "16" },
          { name: "French Truck Coffee", desc: "Locally roasted coffee service.", price: "" }
        ]
      },
      {
        id: "wine-list",
        label: "Wine List",
        note: "Our wine list changes daily; ask your server for today's selections.",
        items: [
          { name: "Henri Bourgeois Sancerre 2025", desc: "Loire, France.", price: "Glass $21 / Bottle $84" },
          { name: "Belle Glos 'Dairyman' Pinot Noir 2024", desc: "Russian River Valley, CA.", price: "Glass $19 / Bottle $74" },
          { name: "Louis Jadot Pouilly Fuissé 2024", desc: "Bourgogne, France.", price: "Glass $18 / Bottle $72" },
          { name: "Turnbull Cabernet Sauvignon 2023", desc: "Napa Valley, CA.", price: "Glass $24 / Bottle $96" }
        ]
      }
    ]
  }
};
