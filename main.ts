//  Constantes de configuración
let MAX_TEMP = 50
let MAX_ACCEL = 1023
let MAX_LIGHT = 255
let MAX_MAG_FIELD = 1023
let MAX_ROTATION = 360
let MAX_SOUND = 255
//  Variables de estado
let current_value = 0
let x = 2
let y = 2
let mode = 0
//  Modo inicial
let modes = 7
//  Número total de modos
function update_sensor_readings() {
    /** Actualiza la lectura actual basada en el modo seleccionado. */
    
    if (mode == 0) {
        current_value = input.temperature()
    } else if (mode == 1) {
        //  Lectura de temperatura
        current_value = input.acceleration(Dimension.X)
    } else if (mode == 2) {
        //  Lectura de aceleración en X
        current_value = input.lightLevel()
    } else if (mode == 3) {
        //  Lectura de luz
        current_value = input.magneticForce(Dimension.X)
    } else if (mode == 4) {
        //  Lectura del campo magnético en X
        current_value = input.rotation(Rotation.Pitch)
    } else if (mode == 5) {
        //  Lectura de rotación
        current_value = input.soundLevel()
    }
    
}

//  Lectura de sonido
function draw_graph() {
    /** Dibuja un gráfico de barras basado en el valor actual y el modo. */
    if (mode < 6) {
        //  Modo gráfico
        led.plotBarGraph(current_value, [MAX_TEMP, MAX_ACCEL, MAX_LIGHT, MAX_MAG_FIELD, MAX_ROTATION, MAX_SOUND][mode])
    } else {
        //  Modo de gota
        led.plot(x, y)
    }
    
}

function move_drop() {
    /** Mueve la gota según la inclinación de la micro:bit. */
    
    let accel_x = input.acceleration(Dimension.X)
    let accel_y = input.acceleration(Dimension.Y)
    if (accel_x < -150 && x > 0) {
        //  Mueve a la izquierda
        x -= 1
    } else if (accel_x > 150 && x < 4) {
        //  Mueve a la derecha
        x += 1
    }
    
    if (accel_y < -150 && y > 0) {
        //  Mueve hacia arriba
        y -= 1
    } else if (accel_y > 150 && y < 4) {
        //  Mueve hacia abajo
        y += 1
    }
    
}

//  Mueve la gota según la inclinación
//  Control de botones
//  Asignación de funciones a los botones
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    mode = (mode + 1) % modes
    //  Cambia al siguiente modo
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    mode = 6
    //  Cambia directamente al modo de gota
    basic.clearScreen()
})
//  Iniciar el bucle principal
basic.forever(function on_forever() {
    /** Función principal que se ejecuta en bucle. */
    basic.clearScreen()
    update_sensor_readings()
    draw_graph()
    if (mode == 6) {
        //  Solo en el modo de gota
        draw_graph()
        //  Dibuja la gota
        basic.pause(50)
        //  Pausa para dar efecto visual
        led.unplot(x, y)
        //  Apaga el LED anterior
        move_drop()
    }
    
})
