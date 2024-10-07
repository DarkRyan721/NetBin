from azure.iot.device import IoTHubDeviceClient, Message
from datetime import datetime

# Cadena de conexión a Azure IoT Hub
CONNECTION_STRING = "HostName=netbin-raspberry-hub.azure-devices.net;DeviceId=RapsberryPi3;SharedAccessKey=GdBRyOWwf6IWVaep9dSOaZvRXrdLUI3RT/ffDcjWq5A="

# Mensaje que se enviará al broker
MSG_SND = '{{"id_sensor":"{id_sensor}", "timestamp":"{timestamp}", "variable":"{variable}", "value":"{value}", "magnitude":"{magnitude}", "units":"{units}"}}'

# Se genera la conexión con el broker
client = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)

def enviar_datos(id_sensor, timestamp, variable, value, magnitude, units):
    """Función para enviar datos al broker."""
    timestamp = datetime.utcnow().isoformat() + "Z"  # Formato ISO 8601
    msg_txt_formatted = MSG_SND.format(
        id_sensor=id_sensor,
        timestamp=timestamp,
        variable=variable,
        value=value,
        magnitude=magnitude,
        units=units
    )
    message = Message(msg_txt_formatted)
    print("Enviando a Azure: {}".format(message))
    client.send_message(message)
    print("Mensaje enviado.")
