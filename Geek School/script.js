//alert("Hello world")

//déclaration de variables et de assignation d'une valeur
var score = 10
var nbjoueur = 100000
//on peut aussi utiliser let
let prenom = "Bob"

var taille = 1.83
var bonalecole = true



//fonctions
function cc(){
    console.log("bonjour !!!")
}

cc()

function saluer(qui){
    alert("Salut " + qui + " !!!")
}

saluer("Fred")

//déclaration d'une fonction avec valeur de retour
function aire_rectangle(hauteur, largeur){
    //on retourne le résultat
    return hauteur * largeur
}

//récupération de la valzur de retour
let resultat = aire_rectangle(10, 24)
console.log(resultat)