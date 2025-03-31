let colors = ["red", "green", "blue", "gold", "fuchsia", "GreenYellow", "LightSeaGreen", "Lime"];
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
    //Deshabilitar botons
    habilitar_botons(false);
    for (let i=0; i<sequencia.length; i++){
        

        //Crida al mètode esperar
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
    add_color();
    mostrar_sequencia();
    document.getElementById("display_central").disabled = true;
    document.getElementById("banner_perdut").hidden = true;
    document.getElementById("puntuacio").innerHTML = "0";
    document.getElementById("banner_record").hidden = true;
    document.getElementById("record_puntuacio").innerHTML = record;
}

function reiniciar(){
    document.getElementById("display_central").innerHTML = "JUGAR"
    nombre_botons_pitjats = 0;
    sequencia = [];
    amagar_botons();
    document.getElementById("display_central").disabled = false;
    habilitar_botons(false);
}

function actualitzar_record(){
    if(sequencia.length -1 > record){
        record = sequencia.length -1;
        document.getElementById("banner_record").hidden = false;
    }
    else if (sequencia.length -1 == record){
        //Has empatat el record
    }
}