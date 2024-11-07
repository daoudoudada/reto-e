//  Constantes
let MAX_TEMP = 50
//  Valor máximo para el gráfico de temperatura
let X_START = 2
//  Posición inicial del LED en el eje X
let Y_START = 2
//  Posición inicial del LED en el eje Y
//  Variables para la posición del LED
let x = X_START
let y = Y_START
//  Variables de modo
let modes = 2
let mode = 0
//  Modo inicial, 0 para la estación meteorológica y 1 para el movimiento de la gota
//  Función para el gráfico de temperatura
function draw_temp_graph() {
    let current_temp = input.temperature()
    led.plotBarGraph(current_temp, MAX_TEMP)
}

//  Gráfico de barras en función de la temperatura y el máximo
//  Función para mover el LED como una gota
function move_drop() {
    
    led.plot(x, y)
    basic.pause(50)
    led.unplot(x, y)
    //  Lee los valores de aceleración en los ejes X e Y
    let accX = input.acceleration(Dimension.X)
    let accY = input.acceleration(Dimension.Y)
    //  Movimiento en el eje X
    if (accX < -150 && x > 0) {
        x -= 1
    } else if (accX > 150 && x < 4) {
        x += 1
    }
    
    //  Movimiento en el eje Y
    if (accY < -150 && y > 0) {
        y -= 1
    } else if (accY > 150 && y < 4) {
        y += 1
    }
    
}

//  Cambia entre los modos de operación
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    mode = (mode + 1) % modes
    basic.clearScreen()
})
//  Función principal que alterna entre los modos según el valor de `mode`
basic.forever(function on_forever() {
    if (mode == 0) {
        draw_temp_graph()
    } else if (mode == 1) {
        move_drop()
    }
    
})
