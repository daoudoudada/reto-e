# Constantes
max_temp = 50
max_accel = 1023
max_light = 255
max_mg_field = 1023
max_rotation = 360
max_sound = 255


# Variables
current_temp = 0
current_accel = 0
current_light = 0
mg_field = 0
current_rotation = 0
current_sound = 0
x = 2
y = 2


modes = 7
mode = 0


def on_forever():
    global current_temp, current_accel, current_light, mg_field, current_rotation, current_sound, x, y


    basic.clear_screen()


    if mode == 0:
        current_temp = input.temperature()
        draw_temp_graph()
    elif mode == 1:
        current_accel = input.acceleration(Dimension.X)
        draw_accel_graph()
    elif mode == 2:
        current_light = input.light_level()
        draw_light_graph()
    elif mode == 3:
        mg_field = input.magnetic_force(Dimension.X)
        draw_mg_field_graph()
    elif mode == 4:
        current_rotation = input.rotation(Rotation.PITCH)
        draw_rotation_graph()
    elif mode == 5:
        current_sound = input.sound_level()
        draw_sound_graph()
    elif mode == 6:
        led.plot(x, y)
        basic.pause(50)
        led.unplot(x, y)
                
        accelX = input.acceleration(Dimension.X)
        accelY = input.acceleration(Dimension.Y)


        if accelX < -150 and x > 0:
            x -= 1
        elif accelX > 150 and x < 4:
            x += 1


        if accelY < -150 and y > 0:
            y -= 1
        elif accelY > 150 and y < 4:
            y += 1


basic.forever(on_forever)


def on_button_pressed_a():
    global mode
    mode = (mode + 1) % modes
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_pressed_a)


def on_button_pressed_b():
    global mode
    mode = 6
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_pressed_b)


def draw_temp_graph():
    led.plot_bar_graph(current_temp, max_temp)


def draw_accel_graph():
    led.plot_bar_graph(current_accel, max_accel)


def draw_light_graph():
    led.plot_bar_graph(current_light, max_light)


def draw_mg_field_graph():
    led.plot_bar_graph(mg_field, max_mg_field)


def draw_rotation_graph():
    led.plot_bar_graph(current_rotation, max_rotation)


def draw_sound_graph():
    led.plot_bar_graph(current_sound, max_sound)



