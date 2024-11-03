from microbit import *

# Constantes de configuración
MAX_TEMP = 50
MAX_ACCEL = 1023
MAX_LIGHT = 255
MAX_MAG_FIELD = 1023
MAX_ROTATION = 360
MAX_SOUND = 255

# Variables de estado
current_value = 0
x = 2
y = 2
mode = 0  # Modo inicial
modes = 7  # Número total de modos

def update_sensor_readings():
    """Actualiza la lectura actual basada en el modo seleccionado."""
    global current_value
    if mode == 0:
        current_value = input.temperature()  # Lectura de temperatura
    elif mode == 1:
        current_value = input.acceleration(Dimension.X)  # Lectura de aceleración en X
    elif mode == 2:
        current_value = input.light_level()  # Lectura de luz
    elif mode == 3:
        current_value = input.magnetic_force(Dimension.X)  # Lectura del campo magnético en X
    elif mode == 4:
        current_value = input.rotation(Rotation.PITCH)  # Lectura de rotación
    elif mode == 5:
        current_value = input.sound_level()  # Lectura de sonido

def draw_graph():
    """Dibuja un gráfico de barras basado en el valor actual y el modo."""
    if mode < 6:  # Modo gráfico
        led.plot_bar_graph(current_value, [MAX_TEMP, MAX_ACCEL, MAX_LIGHT, MAX_MAG_FIELD, MAX_ROTATION, MAX_SOUND][mode])
    else:  # Modo de gota
        led.plot(x, y)

def move_drop():
    """Mueve la gota según la inclinación de la micro:bit."""
    global x, y
    accel_x = input.acceleration(Dimension.X)
    accel_y = input.acceleration(Dimension.Y)

    if accel_x < -150 and x > 0:  # Mueve a la izquierda
        x -= 1
    elif accel_x > 150 and x < 4:  # Mueve a la derecha
        x += 1

    if accel_y < -150 and y > 0:  # Mueve hacia arriba
        y -= 1
    elif accel_y > 150 and y < 4:  # Mueve hacia abajo
        y += 1

def on_forever():
    """Función principal que se ejecuta en bucle."""
    basic.clear_screen()
    update_sensor_readings()
    draw_graph()
    
    if mode == 6:  # Solo en el modo de gota
        draw_graph()  # Dibuja la gota
        basic.pause(50)  # Pausa para dar efecto visual
        led.unplot(x, y)  # Apaga el LED anterior
        move_drop()  # Mueve la gota según la inclinación

# Control de botones
def on_button_pressed_a():
    global mode
    mode = (mode + 1) % modes  # Cambia al siguiente modo
    basic.clear_screen()

def on_button_pressed_b():
    global mode
    mode = 6  # Cambia directamente al modo de gota
    basic.clear_screen()

# Asignación de funciones a los botones
input.on_button_pressed(Button.A, on_button_pressed_a)
input.on_button_pressed(Button.B, on_button_pressed_b)

# Iniciar el bucle principal
basic.forever(on_forever)
