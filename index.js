let sequenceLevelComputer = [];
let sequenceLevelsUser = [];
let isOn = false;
let contadorDeNiveles = 0;

const blue = new Audio("./sounds/blue.mp3");
const green = new Audio("./sounds/green.mp3");
const red = new Audio("./sounds/red.mp3");
const yellow = new Audio("./sounds/yellow.mp3");

const buttons = ["red", "blue", "green", "yellow"];

$(document).on("keydown", async function () {
    if (!isOn) {
        contadorDeNiveles = 1;
        sequenceLevelComputer = [];
        sequenceLevelsUser = [];
        isOn = true;
        await secuenciaDelNivel(0);
    }
});

async function secuenciaDelNivel(index) {
    $("#level-title").text("Nivel " + contadorDeNiveles);

    // Generar un color aleatorio y agregarlo a la secuencia
    const colorAleatorio = buttons[Math.floor(Math.random() * buttons.length)];
    sequenceLevelComputer.push(colorAleatorio);

    // Reproducir la secuencia hasta ahora
    for (let i = 0; i < sequenceLevelComputer.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600));
        reproducirColor(sequenceLevelComputer[i]);
    }

    // Limpiar input del usuario para este nivel
    sequenceLevelsUser = [];
}

function reproducirColor(color) {
    $("#" + color).addClass("pressed");
    switch (color) {
        case "blue": blue.play(); break;
        case "yellow": yellow.play(); break;
        case "green": green.play(); break;
        case "red": red.play(); break;
    }
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 150);
}

function verificarSecuencia() {
    const index = sequenceLevelsUser.length - 1;

    // Si hay un error
    if (sequenceLevelsUser[index] !== sequenceLevelComputer[index]) {
        $("#level-title").text("❌ Te equivocaste. Presiona una tecla para reiniciar.");
        isOn = false;
        sequenceLevelComputer = [];
        sequenceLevelsUser = [];
        return;
    }

    // Si el usuario completó la secuencia correctamente
    if (sequenceLevelsUser.length === sequenceLevelComputer.length) {
        setTimeout(() => {
            contadorDeNiveles++;
            secuenciaDelNivel(0);
        }, 1000);
    }
}

function eventListeners() {
    for (let i of buttons) {
        $("#" + i).click(function (event) {
            if (!isOn) return;

            const color = event.target.id;
            sequenceLevelsUser.push(color);
            reproducirColor(color);
            verificarSecuencia();
        });
    }
}

eventListeners();
