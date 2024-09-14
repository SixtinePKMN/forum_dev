document.addEventListener("DOMContentLoaded", function () {
  fetch("datacategories.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("categories");
      data.forEach((category) => {
        const categoryElement = document.createElement("div");
        // Utilise les backticks pour les template literals
        categoryElement.className = `category ${category.titre}`;

        categoryElement.innerHTML = `
          <div class="titre">
          <div class="icon-${category.statut}"></div>
          <a href="{catrow.forumrow.U_VIEWFORUM}">${category.titre}</a>
          </div>

          <!-- BEGIN avatar -->
          <img class="avatar" src="/img/${category.icon}.png" alt="${category.auteur}" />
          <!-- END avatar -->

          <!-- BEGIN switch_topic_title -->
          <a href="{catrow.forumrow.U_LATEST_TOPIC}" class="titreSujet" title="{catrow.forumrow.LATEST_TOPIC_TITLE}">${category.dernierSujet}</a>
          <!-- END switch_topic_title -->

          <!-- date -->
          <div class="date">${category.date}</div>

          <!-- auteur -->
          <div class="auteur">
            <a href="/u1" class="gensmall">
              <span class="${category.group}">
                <strong>${category.auteur}</strong>
              </span>
            </a>
          </div>
        `;

        container.appendChild(categoryElement);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
