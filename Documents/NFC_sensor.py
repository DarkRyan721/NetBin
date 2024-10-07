from datetime import datetime
import board
import busio
from adafruit_pn532.i2c import PN532_I2C
import time

# Configuración del sensor NFC (PN532)
i2c = busio.I2C(board.SCL, board.SDA)
pn532 = PN532_I2C(i2c, debug=False)
pn532.SAM_configuration()

def leer_rfid():
	print("Leyendo RFID")
	try:
		uid = pn532.read_passive_target()
		if uid is not None:
			print(" - Etiqueta RFID detectada")
			print("UID:", [hex(i) for i in uid])
			return [hex(i) for i in uid]
	except Exception as e:
		print(f"Error al leer etiqueta: {e}")
	return None
