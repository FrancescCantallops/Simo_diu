let colors = ["#e90000", "#ff6100", "#fff500", "#05fb00", "#31d5c8", "#33a7c8", "#001eba", "#a538c6"];
let sequencia = [];

let nombre_botons = colors.length;
let nombre_botons_pitjats = 0;
let pitjades_faltants = 0;

let temps_amagat = 500;
let temps_mostrar = 1000;

let record = 0;

function add_color(){
    sequencia.push(Math.floor(Math.random() * nombre_botons));
    console.log(sequencia);
}

async function mostrar_sequencia(){
    document.getElementById("display_central").innerHTML = "";
    habilitar_botons(false);

    for (let i=0; i<sequencia.length; i++){
        
        //Mostra el boto durant un temps i el torna a amagar
        amagar_botons();
        await esperar(temps_amagat);
        document.getElementById("boto_"+sequencia[i]).style.background = colors[sequencia[i]];
        await esperar(temps_mostrar);

        console.log(sequencia[i]);
    }
    mostrar_botons();
    habilitar_botons(true);
    document.getElementById("display_central").innerHTML = "Te toca";
}

function comprovar_sequencia(boto_pitjat){
    if(boto_pitjat == sequencia[nombre_botons_pitjats]){
        //S'ha pitjat el boto correcte
        console.log("Correcte");
        if(nombre_botons_pitjats < sequencia.length -1){
            nombre_botons_pitjats++;
            actualitzar_restants();
        }else{
            //Etapa completada
            nombre_botons_pitjats = 0;
            document.getElementById("puntuacio").innerHTML = sequencia.length;
            add_color();
            mostrar_sequencia();
        }
    }
    else{
        //Has perdut
        console.log("Incorrecte")
        actualitzar_record();
        reiniciar();
        document.getElementById("banner_perdut").hidden = false;
    }
}

function esperar(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function amagar_botons(){
    for(let i=0; i<nombre_botons; i++){
        document.getElementById("boto_"+i).style.background = "white";
    }
}

function habilitar_botons(habilitar){
    for(let i=0; i<nombre_botons; i++){
        document.getElementById("boto_"+i).disabled = !habilitar;
    }
}

function mostrar_botons(){
    for(let i=0; i<nombre_botons; i++){
        document.getElementById("boto_"+i).style.background = colors[i];
    }
}

function actualitzar_restants(){
    document.getElementById("display_central").innerHTML = sequencia.length - nombre_botons_pitjats;
}

function pitjar_boto_central(){
    //Desactivar boto primer per no duur a problemes (ex: pitjar dues vegades seguides)
    document.getElementById("display_central").disabled = true;
    //Amagar banners
    document.getElementById("banner_perdut").hidden = true;
    document.getElementById("banner_record").hidden = true;
    document.getElementById("banner_empat").hidden = true;
    //Reiniciar puntuacio i actualitzar record
    document.getElementById("puntuacio").innerHTML = "0";
    document.getElementById("record_puntuacio").innerHTML = record;
    //Començar la sequencia del joc
    add_color();
    mostrar_sequencia();
}

function reiniciar(){
    //Reiniciar variables
    nombre_botons_pitjats = 0;
    sequencia = [];
    //Tornar botons a configuracio inicial
    amagar_botons();
    habilitar_botons(false);
    document.getElementById("display_central").innerHTML = "JUGAR"
    document.getElementById("display_central").disabled = false;
}

function actualitzar_record(){
    if(sequencia.length -1 > record){
        //Nou record
        record = sequencia.length -1;
        document.getElementById("banner_record").hidden = false;
        //El nou record no es mostra per poder comparar amb l'antic record
    }
    else if (sequencia.length -1 == record){
        //Has empatat el record
        document.getElementById("banner_empat").hidden = false;
    }
}