from azure.iot.device import IoTHubDeviceClient, Message # Libreria para la conexion con Azure Iot Hub
from datetime import datetime # Libreria para generar el timestamp

# Librerias para usar el sensor PN532(Sensor RFID/NFC)
import board
import busio
from adafruit_pn532.i2c import PN532_I2C

# Librerias para el uso del sensor VL53L1X(Sensor de proximidad)
import sys
import signal
import VL53L1X

# Libreria para el reconocimiento de voz
import speech_recognition as sr

# Libreria para manejar la lectura de los sensores
import time

# Cadena de caracteres que establece la conexion con Azure IoT Hub con parametros como HostName o DeviceId
CONNECTION_STRING = "HostName=netbin-raspberry-hub.azure-devices.net;DeviceId=RapsberryPi3;SharedAccessKey=GdBRyOWwf6IWVaep9dSOaZvRXrdLUI3RT/ffDcjWq5A="

# Formato del mensaje que se enviara al broker proveniente de cualquier sensor
MSG_SND = '{{"id_sensor":{id_sensor}, "timestamp":{timestamp}, "var":{var}, "value":{value}, "magnitude":{magnitude}, "units":{units}}}'

# Se genera la conexion con el broker usando el "CONNECTION_STRING"
client = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)

# Funcion que enviara los mensajes al broker en base a los parametros de cada sensor
def Message_To_Client(id_sensor, timestamp, var, value, magnitude, units):
    msg_txt_formatted = MSG_SND.format(
        id_sensor = id_sensor,
        timestamp = timestamp,
        var = var,
        value = value,
        magnitude = magnitude,
        units = units
    )
    
    message = Message(msg_txt_formatted)
    print("Sending to Azure: {}".format(message))
    client.send_message(message)
    print("message sent.")
    
# Variables que se requieren para speech recognition
recognizer = sr.Recognizer()
mic = sr.Microphone()

# Configuracion del sensor NFC(PN532)
i2c = busio.I2C(board.SCL, board.SDA)
pn532 = PN532_I2C(i2c, debug=False)
pn532.SAM_configuration()

# Configuracion del sensor de proximidad(VL53L1X)
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

# Banderas que permitiran la lectura de diferentes sensores
ban_RFID = True
ban_Proximidad = True
ban_Microphone = False

# timers para cada sensor que lo requieren
time_RFID = time.time()
time_Proximidad = time.time()

while True:
    current_time = time.time()
    
    #Lectura PN532 cada 5 segundos
    if ((current_time-time_RFID) >= 2) and ban_RFID == True:
        print("Leyendo RFID")
        
        try:
            # Leer la etiqueta RFID
            uid = pn532.read_passive_target()
            
            if uid is not None:
                print(" - Etiqueta RFID detectada")
                print("UID:", [hex(i) for i in uid])
                
                Message_To_Client("Sensor NFC", datetime.now().strftime("%m/%d/%Y %H:%M:%S"), [hex(i) for i in uid], "ID", "1", "1")
                
                ban_RFID = False
                ban_Proximidad_Microphone = False
                ban_Microphone = True
            
                
        except Exception as e:
            print(f"Error al leer etiqueta: {e}")
            
        time_RFID = current_time
    
    if ban_Proximidad == True:
        distance_in_mm = tof.get_distance()
        print("Distance: {}mm".format(distance_in_mm))
        
        if distance_in_mm <= 40 and distance_in_mm >= 0:
            ban_Proximidad = False
            ban_RFID = False
            ban_Microphone = True
        
        
    if ban_Microphone == True:
        with mic as source:
            print("Microfono abierto")
            audio = recognizer.listen(source, phrase_time_limit=5)
            print("¡Te escuche!")
        
        try:
            text = recognizer.recognize_google(audio, language="ES")
            Message_To_Client("Microfono", datetime.now().strftime("%m/%d/%Y %H:%M:%S"), text, "message", "1", "1")
            print(text)
        except sr.UnknownValueError:
            print("No se entendio.")
        except sr.RequestError as e:
            print("error con Google Speech Recognition")
            
        ban_Microphone = False
        ban_Proximidad = True
        ban_RFID = True
