//Listes colors
let sunset = ["#003f5c", "#58508d", "#8a508f", "#bc5090", "#de5a79", "#ff6361", "#ff8531", "#ffa600"];
let burger = ["#711415", "#ae311e", "#f37324", "#f6a020", "#f8cc1b", "#b5be2f", "#72b043", "#007f4e"];
let rainbow = ["#e90000", "#ff6100", "#fff500", "#05fb00", "#31d5c8", "#33a7c8", "#001eba", "#a538c6"];
let eightees = ["#274001", "#828a00", "#f29f05", "#f25c05", "#d6568c", "#4d8584", "#a62f03", "#400d01"];
let blackout = ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"];
let inferno = ["#ffae00", "#b8655a", "#ff0000", "#ce0106", "#a0030b", "#710411", "#420516", "#982d17"];
let eco = ["#191e0c", "#343e19", "#4f5d26", "#6a7d33", "#849d40", "#9fbd4d", "#badd5a", "#d5fd67"];
let sea = ["#08d1ca", "#19b6cc", "#2b9bce", "#3c80d0", "#4e66d2", "#5f4bd4", "#7030d6", "#8215d8"];

//Listes ordres
let original = [0, 1, 2, 3, 4, 5, 6, 7];
let clockwise = [0, 1, 2, 7, 3, 6, 5, 4];
let CCw_BL = [6, 5, 4, 7, 3, 0, 1, 2];
let opposite_corners = [0, 7, 5, 2, 3, 4, 6, 1];
let leaf = [7, 5, 3, 6, 1, 4, 2, 0];

//Agrupacio de paletes
//Els colors, ordre i nom d'una mateixa paleta han d'estar a la mateixa posicio de cada llista
let llista_paletes = [blackout, rainbow, burger, sunset, eightees, eco, sea, inferno];
let llista_posicions =[original, clockwise, opposite_corners, CCw_BL, opposite_corners, leaf, original, opposite_corners];
let llista_noms_paletes = ["Blackout", "Rainbow", "Burger", "Sunset", "Eightees", "Eco", "Sea", "Inferno"];
nombre_paleta = 0;

function canviar_paleta(){
    if(nombre_paleta < llista_paletes.length -1){
        nombre_paleta += 1;
    }
    else{
        nombre_paleta = 0;
    }
    console.log("Nombre paleta = " + nombre_paleta);
    let paleta_seleccionada = llista_paletes[nombre_paleta];

    let paleta_ordenada = [];
    let posicions = llista_posicions[nombre_paleta];
    for(let i=0; i < colors.length; i++){
        paleta_ordenada[i] = paleta_seleccionada[posicions[i]];
        console.log(posicions[i]);
    }

    colors = paleta_ordenada;
    document.getElementById("contenidor_nom_paleta").innerHTML = llista_noms_paletes[nombre_paleta];
    mostrar_botons();
}