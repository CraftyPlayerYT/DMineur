//variables gobales
let hauteur_grille = 10
let largeur_grille = 20
let seuil_indesirable = 0.15
let termine = false
//on prépare un son à jouer plus tard
let son_clic = new Audio("click.mp3")
son_clic.volume = 0.5
let son_casser = new Audio("verre.mp3")
son_casser.volume = 1.0
let son_applaudissements = new Audio("applaudissements.mp3")
son_applaudissements.volume = 1.0
console.log("Début du script...")
//quand le document est prêt
//on déclenche une fonction appelée fonction collback
$(document).ready(chargement_page)

//fonction qui se déclenche au chargement de la page
function chargement_page() {
    console.log("Page chargée.")

    $("#grille").hide()
    $("#victoire").hide()
    $("#perdu").hide()

    //on associe une fonction à l'évènement click sur les boutons de difficulté
    $(".boutonsdedifficulte").click(clic_difficulte)
}

//fonction qui gère les clics sur les boutons de difficulté
function clic_difficulte() {
    //on joue un son
    son_clic.play()

    //on récupère le texte du bouton sur lequel l'évènement s'est déclenché
    let difficulte = $(this).text()

    //la taille de la grille et la densité des cases indésirables
    //varient celon le bouton de difficulté cliqué
    if (difficulte == "Facile") {
        hauteur_grille = 6
        largeur_grille = 8
        seuil_indesirable = 0.12
    }

    else if (difficulte == "Moyen") {
        hauteur_grille = 9
        largeur_grille = 12
        seuil_indesirable = 0.15
    }
    else {
        hauteur_grille = 12
        largeur_grille = 16
        seuil_indesirable = 0.20
    }

    $("#victoire").hide()
    $("#perdu").hide()

    creer_grille()
    calcul_indesirables()
}

//fonction  pour créer la grille
function creer_grille() {
    //on vide la grille
    $("#grille").empty()

    //boucle pour créer les lignes
    for (let i = 0; i < hauteur_grille; i++) {
        //on créer une nouvelle ligne
        let ligne = $("<tr></tr>")


        //boucle pour les cellules
        for (let j = 0; j < largeur_grille; j++) {
            //on créer une nouvelle cellule
            let cellule = $("<td></td>")

            //on donne des coordonnées à la cellule
            //sous forme de classe
            cellule.addClass("ligne" + i)
            cellule.addClass("colonne" + j)

            //on tire un nombre au hasard pour savoir si la case
            //doit être marquée comme indésirable
            //Math.random renvoit un nombre entre 0.0 et 1.0
            let tirage = Math.random()

            //si le tirage est suffisament bas
            if (tirage < seuil_indesirable) {
                //la cellule est marquée comme indésirable
                cellule.addClass("indesirable")
            }

            //on ajoute un masque à la cellule sous forme de classe
            cellule.addClass("masque")

            //on ajoute la cellule à la ligne actuelle
            ligne.append(cellule)
        }

        //on ajoute la ligne à la grille
        $("#grille").append(ligne)
    }
    //on montre la grille
    $("#grille").show()

    //on attache une fonction à l'évènement clic sur les cellules du tableau
    $("#grille td").click(clic_cellule)
    //pareil pour le clic droit
    $("#grille td").contextmenu(placer_drapeau)
    termine = false
}


//fonction qui gère les clics sur les cellules du tableau
function clic_cellule() {
    //si la partie est déjà terminée, rien ne se passe
    if (termine) return //la fonction s'arrête

    //on retire le masque sur la cellule cliquée
    //$(this) est l'élément sur lequel l'évènement a été déclenché
    $(this).removeClass("masque")

    //si on a cliqué sur une case indésirable
    if ($(this).hasClass("indesirable")) {
        son_casser.play()
        termine = true
        //on affiche un message de défaite
        $("#perdu").show()


        //on dévoile toutes les classes indésirables
        $(".indesirable").removeClass("masque")

        return
    }

    //sinon si on a cliqué sur un zéro
    //à partir de la case cliquée
    else if ($(this).text() == "") {
        devoilerZeros($(this))
    }

    //si il reste autant de cases masquées qu'il n'y en a d'indésirables on a gagné
    if ($(".masque").length == $(".indesirable").length) {
        son_applaudissements.play()
        termine = true
        //on affiche un message de victoire
        $("#victoire").show()

        //on dévoile toutes les classes indésirables
        $(".indesirable").removeClass("masque")
    }
}

//fonction qui gère les clics droits sur les cellules
function placer_drapeau(evenement) {
    //on annule l'ouverture du menu contextuel (action par défaut du clic droit)
    evenement.preventDefault()
    if (termine) return
    //on ajoute ou on enlève le drapeau (sous forme de classe)
    $(this).toggleClass("drapeau")
}

function calcul_indesirables() {
    //on fait le tour de la grille
    for (let i = 0; i < hauteur_grille; i++) {
        for (let j = 0; j < largeur_grille; j++) {
            //si la cellule actuelle porte la classe indesirable
            if ($(".ligne" + i + ".colonne" + j).hasClass("indesirable")) {
                //on passe à l'étape suivante de la boucle
                continue
            }

            //on créer une variable pour compter les cases indésirables autour
            let nombre_indesirable = 0

            //Test case en haut à gauche
            if ($(".ligne" + (i - 1) + ".colonne" + (j - 1)).hasClass("indesirable")) nombre_indesirable++
            //Test case en haut
            if ($(".ligne" + (i - 1) + ".colonne" + j).hasClass("indesirable")) nombre_indesirable++
            //Test case en haut à droite
            if ($(".ligne" + (i - 1) + ".colonne" + (j + 1)).hasClass("indesirable")) nombre_indesirable++
            //Test case gauche
            if ($(".ligne" + i + ".colonne" + (j - 1)).hasClass("indesirable")) nombre_indesirable++
            //Test case droite
            if ($(".ligne" + i + ".colonne" + (j + 1)).hasClass("indesirable")) nombre_indesirable++
            //Test case en bas à gauche
            if ($(".ligne" + (i + 1) + ".colonne" + (j - 1)).hasClass("indesirable")) nombre_indesirable++
            //Test case en bas
            if ($(".ligne" + (i + 1) + ".colonne" + j).hasClass("indesirable")) nombre_indesirable++
            //Test case en bas à droit
            if ($(".ligne" + (i + 1) + ".colonne" + (j + 1)).hasClass("indesirable")) nombre_indesirable++

            //on écrit le nombre total dans la cellule actuelle
            if (nombre_indesirable > 0) $(".ligne" + i + ".colonne" + j).text(nombre_indesirable)

        }
    }
}

// fonction qui permet de découvrir par récursivité toutes les cellules autour des "0"
function devoilerZeros(cellule) {
    var colonne = parseInt(cellule.attr('class').match(/\bcolonne(\d+)\b/)[1]);
    var ligne = parseInt(cellule.attr('class').match(/\bligne(\d+)\b/)[1]);
    var selectors = [
        '.colonne' + (colonne - 1) + '.ligne' + (ligne - 1),
        '.colonne' + colonne + '.ligne' + (ligne - 1),
        '.colonne' + (colonne + 1) + '.ligne' + (ligne - 1),
        '.colonne' + (colonne - 1) + '.ligne' + ligne,
        '.colonne' + (colonne + 1) + '.ligne' + ligne,
        '.colonne' + (colonne - 1) + '.ligne' + (ligne + 1),
        '.colonne' + colonne + '.ligne' + (ligne + 1),
        '.colonne' + (colonne + 1) + '.ligne' + (ligne + 1)
    ];

    $.each(selectors, function (key) {
        var cellule_actuelle = $(selectors[key]);
        if (cellule_actuelle.text() == "" && !cellule_actuelle.hasClass("indesirable")&& cellule_actuelle.hasClass('masque')) {
            cellule_actuelle.removeClass('masque');
            devoilerZeros(cellule_actuelle);
        } else {
            cellule_actuelle.removeClass('masque');
        }
    });
}