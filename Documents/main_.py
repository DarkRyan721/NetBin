import time
from datetime import datetime
from NFC_sensor import leer_rfid
# from distance_sensor import leer_proximidad  # Descomentar si se necesita
from speech_sensor import leer_microfono
from sending_data import enviar_datos

# Banderas para controlar la lectura de los sensores
ban_RFID = True
ban_Proximidad = False
ban_Microphone = True

while True:
    # Leer RFID
    if ban_RFID:
        print("RFID: ")
        rfid_data = leer_rfid()
        if rfid_data:
            enviar_datos("Sensor NFC", datetime.now().strftime("%m/%d/%Y %H:%M:%S"), rfid_data, "ID", "1", "1")
        ban_RFID = False
        ban_Microphone = True

    # Leer proximidad
    if ban_Proximidad:
        distancia = leer_proximidad()
        if distancia <= 40 and distancia >= 0:
            ban_Proximidad = False
            ban_Microphone = True
            
    # Leer micrófono
    if ban_Microphone:
        texto = leer_microfono()
        print(texto)
        if texto:
            enviar_datos("Microfono", datetime.now().strftime("%m/%d/%Y %H:%M:%S"), texto, "mensaje", "1", "1")
        ban_Microphone = True
        ban_RFID = True
        
    time.sleep(5)
