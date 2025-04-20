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
        if (cellule_actuelle.text() == "0" && cellule_actuelle.hasClass('masque')) {
            cellule_actuelle.removeClass('masque');
            devoilerZeros(cellule_actuelle);
        } else {
            cellule_actuelle.removeClass('masque');
        }
    });
}