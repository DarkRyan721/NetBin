import sys
import signal
import VL53L1X
import time

# Configuración del sensor de proximidad (VL53L1X)
tof = VL53L1X.VL53L1X(i2c_bus=1, i2c_address=0x29)
tof.open()
tof.start_ranging(1)

running = True
def exit_handler(signal, frame):
    global running
    running = False
    tof.stop_ranging()
    print()
    sys.exit(0)

signal.signal(signal.SIGINT, exit_handler)

def leer_proximidad():
    distance_in_mm = tof.get_distance()
    print("Distancia: {}mm".format(distance_in_mm))
    return distance_in_mm
