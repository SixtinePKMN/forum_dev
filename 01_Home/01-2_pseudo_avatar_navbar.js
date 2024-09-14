$(function () {
  // Une fois la page chargée
  $(document).ready(function () {
    // On vérifie si le membre est connecté
    if (_userdata.session_logged_in != 0) {
      // Si c'est le cas, on récupére
      // son pseudo, son id, son avatar
      // et on crée une div qui contiendra "bonjour" et le pseudo du membre
      var userName = _userdata.username,
        userId = _userdata.user_id,
        userAvatar = _userdata.avatar,
        divPseudo = userName + "</div>";
      // On met les élements aux bons endroits
      $("#blocJoueur #avatarJoueur").append(userAvatar);
      $("#blocJoueur #pseudoJoueur").append(divPseudo);
    } else {
      // Si le membre n'est pas connecté,
      // on cache la barre
      $(".blocJoueur").addClass("m-d-none");
    }
  });
});
