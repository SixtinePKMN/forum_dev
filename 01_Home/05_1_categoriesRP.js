document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM fully loaded and parsed");

  // Configuration des clients Supabase
  const supabaseZoneRPUrl = "https://ilgirwyxggycurexmggj.supabase.co";
  const supabaseZoneRPKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZ2lyd3l4Z2d5Y3VyZXhtZ2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMTQ1NTQsImV4cCI6MjA0MTg5MDU1NH0.I9ktgIYaheWIw6nZXQJTOx_lLHcihqZSIzYMGjJdRKs";
  const supabasePokemonUrl = "https://yqvryjcsrvhdlgybxsri.supabase.co";
  const supabasePokemonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxdnJ5amNzcnZoZGxneWJ4c3JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NTA3MjMsImV4cCI6MjA0MTEyNjcyM30.q8T5AHtBloGNBD-LhhHK2ibwnW1TG35DbPpN11zv0l4";

  const supabaseZoneRP = window.supabase.createClient(supabaseZoneRPUrl, supabaseZoneRPKey);
  const supabasePokemon = window.supabase.createClient(supabasePokemonUrl, supabasePokemonKey);

  // Récupérer les données de zoneRP
  let { data: categoriesData, error: zoneRPError } = await supabaseZoneRP.from("zoneRP").select("*");
  if (zoneRPError) {
    console.error("Error fetching zoneRP data:", zoneRPError);
    return;
  }

  // Trier les données par champ d'ordre (supposons que ce champ est 'ordre')
  categoriesData.sort((a, b) => a.nom.localeCompare(b.nom));

  // Masquer l'élément avec l'ID 'c3'
  const c3Element = document.getElementById("c3");
  if (c3Element) {
    c3Element.style.display = "none";
  }

  // Créer et injecter #zoneRP
  const zoneRP = document.createElement("div");
  zoneRP.className = "categories";
  zoneRP.id = "zoneRP";
  document.getElementById("c2").insertAdjacentElement("afterend", zoneRP);

  // Créer le conteneur global pour les onglets
  const tabsContainer = document.createElement("div");
  tabsContainer.className = "tabs";

  // Créer les conteneurs pour les onglets
  const tabsVille = document.createElement("div");
  tabsVille.className = "tabsVille";

  const tabsExterieurs = document.createElement("div");
  tabsExterieurs.className = "tabsExterieurs";

  const tabsZoneDangereuse = document.createElement("div");
  tabsZoneDangereuse.className = "tabsZoneDangereuse";

  // Ajouter les conteneurs d'onglets au conteneur global
  tabsContainer.appendChild(tabsVille);
  tabsContainer.appendChild(tabsExterieurs);
  tabsContainer.appendChild(tabsZoneDangereuse);

  // Ajouter le conteneur global à zoneRP
  zoneRP.appendChild(tabsContainer);

  // Créer et ajouter les onglets
  categoriesData.forEach((category) => {
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.setAttribute("data-tab", category.lien);
    tab.setAttribute("type", category.categorie);

    // Ajouter les icônes basées sur le genre
    const genres = category.genre ? category.genre.split(",").map((g) => g.trim()) : [];
    genres.forEach((genre) => {
      const iconSpan = document.createElement("span");
      iconSpan.className = `${genre}`; // Prefix with "icon-" for styling
      tab.appendChild(iconSpan);
    });

    // Ajouter le texte de l'onglet après les icônes
    const textSpan = document.createElement("span");
    textSpan.textContent = category.nom;
    tab.appendChild(textSpan);

    tab.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      loadContent(category.id);
    });

    // Ajouter l'onglet au conteneur approprié
    if (category.categorie === "ville") {
      tabsVille.appendChild(tab);
    } else if (category.categorie === "exterieur") {
      tabsExterieurs.appendChild(tab);
    } else if (category.categorie === "zoneDangereuse") {
      tabsZoneDangereuse.appendChild(tab);
    }
  });

  // Créer et ajouter le conteneur de contenu
  const contentDiv = document.createElement("div");
  contentDiv.className = "contenuCategorie";
  zoneRP.appendChild(contentDiv);

  // Récupérer les données de pokemon
  let { data: pokemonData, error: pokemonError } = await supabasePokemon.from("pokemon").select("*");
  if (pokemonError) {
    console.error("Error fetching pokemon data:", pokemonError);
    return;
  }

  // Créer une fonction pour générer le contenu HTML
  function generateContent(data, pokemons) {
    const genres = data.genre
      ? data.genre
          .split(",")
          .map((g) => g.trim())
          .join("")
      : "";

    // Définir l'ordre des classes de rareté
    const rarityOrder = ["commun", "peuCommun", "rare", "tresRare"];

    // Filtrer les Pokémon en fonction de la localisation et de la valeur "E" dans "rank"
    const localPokemons = pokemons.filter((pokemon) => pokemon.localisation === data.nom && pokemon.rank === "E");
    console.log("Filtered Pokémon:", localPokemons); // Affichez les Pokémon filtrés

    // Trier les Pokémon en fonction de la rareté
    localPokemons.sort((a, b) => {
      const aRarityIndex = rarityOrder.indexOf(a.rarete);
      const bRarityIndex = rarityOrder.indexOf(b.rarete);
      return aRarityIndex - bRarityIndex;
    });

    const pokemonImages = localPokemons
      .map((pokemon) => {
        const pkmnName = pokemon.idName;
        const pkmnRarete = pokemon.rarete;
        console.log(`Generating image for ${pkmnName} with rarity ${pkmnRarete}`); // Vérifiez les informations pour chaque image
        return `<img class="${pkmnRarete}" src="https://sixtinepkmn.github.io/pkmns/sprites/icons/${pkmnName}.png" alt="${pkmnName}">`;
      })
      .join("");

    return `
      <div class="category">
          <div class="titre">
              <div class="icon-new"></div>
              <a href="${data.lien}">${data.nom}</a>
          </div>
          <p>${data.description}</p>
          ${data.dernierPost ? data.dernierPost : "Aucun dernier post disponible"}
      </div>
      <img class="imgRP" src="${data.img}" alt="${data.nom}" />
      <div class="zoneDeCapture" genre="${genres}">
        ${pokemonImages}
      </div>
    `;
  }

  // Fonction pour ajuster la disposition de la grille
  function adjustGridLayout() {
    const contentDiv = document.querySelector(".contenuCategorie");
    const zoneDeCapture = contentDiv.querySelector(".zoneDeCapture");

    // Vérifiez si zoneDeCapture doit être cachée
    if (zoneDeCapture) {
      const genres = zoneDeCapture.getAttribute("genre").split(",");
      // Vérifiez si le genre est exactement "ville" et qu'il ne contient pas "capture"
      if (genres.length === 1 && (genres[0].trim() === "ville" || genres[0].trim() === "rien")) {
        contentDiv.classList.add("zoneDeCapture-hidden");
      } else {
        contentDiv.classList.remove("zoneDeCapture-hidden");
      }
    }
  }

  // Fonction pour charger dynamiquement le contenu
  function loadContent(tabId) {
    const data = categoriesData.find((item) => item.id === parseInt(tabId));
    if (data) {
      contentDiv.innerHTML = generateContent(data, pokemonData);
      adjustGridLayout(); // Appeler adjustGridLayout après avoir mis à jour le contenu
    }
  }

  // Activer le premier onglet par défaut
  const firstTab = document.querySelector('.tab[data-tab="/f13-"]');
  if (firstTab) {
    firstTab.click();
  }
});
