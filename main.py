# Constantes
MAX_TEMP = 50  # Valor máximo para el gráfico de temperatura
X_START = 2    # Posición inicial del LED en el eje X
Y_START = 2    # Posición inicial del LED en el eje Y

# Variables para la posición del LED
x = X_START
y = Y_START

# Variables de modo
modes = 2
mode = 0  # Modo inicial, 0 para la estación meteorológica y 1 para el movimiento de la gota

# Función para el gráfico de temperatura
def draw_temp_graph():
    current_temp = input.temperature()
    led.plot_bar_graph(current_temp, MAX_TEMP)  # Gráfico de barras en función de la temperatura y el máximo

# Función para mover el LED como una gota
def move_drop():
    global x, y
    led.plot(x, y)
    basic.pause(50)
    led.unplot(x, y)

    # Lee los valores de aceleración en los ejes X e Y
    accX = input.acceleration(Dimension.X)
    accY = input.acceleration(Dimension.Y)

    # Movimiento en el eje X
    if accX < -150 and x > 0:
        x -= 1
    elif accX > 150 and x < 4:
        x += 1

    # Movimiento en el eje Y
    if accY < -150 and y > 0:
        y -= 1
    elif accY > 150 and y < 4:
        y += 1

# Cambia entre los modos de operación
def on_button_pressed_a():
    global mode
    mode = (mode + 1) % modes
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_pressed_a)

# Función principal que alterna entre los modos según el valor de `mode`
def on_forever():
    if mode == 0:
        draw_temp_graph()
    elif mode == 1:
        move_drop()

basic.forever(on_forever)
