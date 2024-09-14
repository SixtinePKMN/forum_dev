document.addEventListener("DOMContentLoaded", function () {
  var navbarLinks = document.querySelectorAll("ul.liens li a");

  navbarLinks.forEach(function (link) {
    var href = link.getAttribute("href");

    switch (href) {
      case "/home":
        link.innerHTML = "Accueil";
        break;

      case "/memberlist":
        link.innerHTML = "Membres";
        break;

      case "/login?logout=1&amp;tid=148ae0332da602bddd515ea3b87f5e5a&amp;key=bc03d":
        link.innerHTML = "Logout";
        break;

      // Ajoutez d'autres cas au besoin pour d'autres liens
      case "/search":
      case "/calendar":
      case "/images":
      case "/faq":
      case "/groups":
        link.parentNode.remove(); // Supprime le <li> parent contenant le lien
        break;
      default:
        break;
    }
  });

  // Création des liens "Guidebook", "Pokédex" et "Sujets Récents" avec modal
  var guidebookLink = `
    <li>
        <a href="/guidebook">
            Guidebook
        </a>
    </li>`;

  var pokedexLink = `
    <li>
        <a href="/pokedex">
            Pokédex
        </a>
    </li>`;

  var recentTopicsLink = `
  <li>
    <a href="#" id="open-modal-recent-topics">
      Sujets récents
    </a>
    <!-- Modal Structure -->
    <div id="modal-recent-topics" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>Sujets récents</h2>
        <p>Contenu des sujets récents...</p>
      </div>
    </div>
  </li>`;

  // Création des liens "Top" et "Bottom"
  var topLink = `
    <li>
        <a href="#top">
            <div class="navbar-top"></div>top
        </a>
    </li>`;

  var bottomLink = `
    <li>
        <a href="#bottom">
            <div class="navbar-bottom"></div>bottom
        </a>
    </li>`;

  // Insertion des nouveaux liens
  var navbar = document.querySelector(".liens");
  navbar.insertAdjacentHTML("afterbegin", recentTopicsLink); // Ajoute "Sujets Récents" juste après "Pokédex"
  navbar.insertAdjacentHTML("afterbegin", pokedexLink); // Ajoute "Pokédex" juste après "Guidebook"
  navbar.insertAdjacentHTML("afterbegin", guidebookLink); // Ajoute "Guidebook" au début
  navbar.insertAdjacentHTML("beforeend", topLink + bottomLink); // Ajoute "Top" et "Bottom" à la fin

  // Gestion de la modal des sujets récents
  var openModalLink = document.getElementById("open-modal-recent-topics");
  var modalRecentTopics = document.getElementById("modal-recent-topics");
  var closeModalRecentTopics = document.querySelector(".modal-close");

  if (openModalLink) {
    openModalLink.addEventListener("click", function (event) {
      event.preventDefault(); // Empêche le comportement par défaut du lien
      modalRecentTopics.style.display = "block";
    });
  }

  if (closeModalRecentTopics) {
    closeModalRecentTopics.addEventListener("click", function () {
      modalRecentTopics.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modalRecentTopics) {
      modalRecentTopics.style.display = "none";
    }
  });

  // Gestion de la modal du joueur
  var joueurDiv = document.querySelector(".joueur");
  var modalJoueur = document.getElementById("modal-joueur");
  var closeModalJoueur = document.querySelector("#modal-joueur .modal-close");

  if (joueurDiv) {
    joueurDiv.addEventListener("click", function () {
      modalJoueur.style.display = "block";
    });
  }

  if (closeModalJoueur) {
    closeModalJoueur.addEventListener("click", function () {
      modalJoueur.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modalJoueur) {
      modalJoueur.style.display = "none";
    }
  });
});
