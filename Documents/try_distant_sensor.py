import time
import VL53L1X

# Crear objeto para el sensor VL53L1X
tof = VL53L1X.VL53L1X(i2c_bus=1, i2c_address=0x29)
tof.open()
tof.start_ranging(1)  # Modo de distancia corta

try:
    while True:
        distance_in_mm = tof.get_distance()
        print("Distancia: {}mm".format(distance_in_mm))
        time.sleep(1)
except KeyboardInterrupt:
    tof.stop_ranging()
    print("Detenido")
