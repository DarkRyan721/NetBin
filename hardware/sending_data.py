import paho.mqtt.client as mqtt_client
import ssl
import os
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

HIVEMQ_HOST = os.getenv("HIVEMQ_HOST")
HIVEMQ_PORT = int(os.getenv("HIVEMQ_PORT", "8883"))
HIVEMQ_USERNAME = os.getenv("HIVEMQ_USERNAME")
HIVEMQ_PASSWORD = os.getenv("HIVEMQ_PASSWORD")

TOPIC_LEVEL = "netbin/rasp/bin/sensor/level"
TOPIC_AI = "netbin/rasp/bin/sensor/AI"

client = mqtt_client.Client(
    clean_session=True,
    client_id=f"netbin_rasp_{os.urandom(4).hex()}",
    protocol=mqtt_client.MQTTv5,
)
client.username_pw_set(HIVEMQ_USERNAME, HIVEMQ_PASSWORD)
client.tls_set(tls_version=ssl.PROTOCOL_TLS)
client.connect(HIVEMQ_HOST, HIVEMQ_PORT)
client.loop_start()


def enviar_datos(id_sensor, timestamp, variable, value, magnitude, units):
    """Publica datos del sensor al broker HiveMQ Cloud."""
    ts = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    if id_sensor == "Sensor NFC":
        payload = json.dumps(
            {
                "variable": variable,
                "variable_1": value,
                "timestamp_1": ts,
            }
        )
        topic = TOPIC_LEVEL
    else:
        payload = json.dumps(
            {
                "variable_1": variable,
                "value_1": value,
                "timestamp_1": ts,
            }
        )
        topic = TOPIC_AI

    result = client.publish(topic, payload)
    if result.rc == mqtt_client.MQTT_ERR_SUCCESS:
        print(f"Publicado en {topic}: {payload}")
    else:
        print(f"Error al publicar en {topic}: rc={result.rc}")
