//  Constantes
let max_temp = 50
let max_accel = 1023
let max_light = 255
let max_mg_field = 1023
let max_rotation = 360
let max_sound = 255
//  Variables
let current_temp = 0
let current_accel = 0
let current_light = 0
let mg_field = 0
let current_rotation = 0
let current_sound = 0
let x = 2
let y = 2
let modes = 7
let mode = 0
basic.forever(function on_forever() {
    let accelX: number;
    let accelY: number;
    
    basic.clearScreen()
    if (mode == 0) {
        current_temp = input.temperature()
        draw_temp_graph()
    } else if (mode == 1) {
        current_accel = input.acceleration(Dimension.X)
        draw_accel_graph()
    } else if (mode == 2) {
        current_light = input.lightLevel()
        draw_light_graph()
    } else if (mode == 3) {
        mg_field = input.magneticForce(Dimension.X)
        draw_mg_field_graph()
    } else if (mode == 4) {
        current_rotation = input.rotation(Rotation.Pitch)
        draw_rotation_graph()
    } else if (mode == 5) {
        current_sound = input.soundLevel()
        draw_sound_graph()
    } else if (mode == 6) {
        led.plot(x, y)
        basic.pause(50)
        led.unplot(x, y)
        accelX = input.acceleration(Dimension.X)
        accelY = input.acceleration(Dimension.Y)
        if (accelX < -150 && x > 0) {
            x -= 1
        } else if (accelX > 150 && x < 4) {
            x += 1
        }
        
        if (accelY < -150 && y > 0) {
            y -= 1
        } else if (accelY > 150 && y < 4) {
            y += 1
        }
        
    }
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    mode = (mode + 1) % modes
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    mode = 6
    basic.clearScreen()
})
function draw_temp_graph() {
    led.plotBarGraph(current_temp, max_temp)
}

function draw_accel_graph() {
    led.plotBarGraph(current_accel, max_accel)
}

function draw_light_graph() {
    led.plotBarGraph(current_light, max_light)
}

function draw_mg_field_graph() {
    led.plotBarGraph(mg_field, max_mg_field)
}

function draw_rotation_graph() {
    led.plotBarGraph(current_rotation, max_rotation)
}

function draw_sound_graph() {
    led.plotBarGraph(current_sound, max_sound)
}

