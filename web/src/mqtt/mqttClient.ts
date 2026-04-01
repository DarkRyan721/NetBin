import mqtt, { MqttClient } from "mqtt";

const url: string = import.meta.env.VITE_MQTT_WSS_URL;

const options = {
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 2000,
  clientId: `netbin_web_${Math.random().toString(16).slice(2, 8)}`,
  username: import.meta.env.VITE_MQTT_USERNAME,
  password: import.meta.env.VITE_MQTT_PASSWORD,
};

const client_mqtt: MqttClient = mqtt.connect(url, options);

client_mqtt.on("connect", () => {
  console.log("Conectado al broker MQTT (HiveMQ Cloud)");
});

client_mqtt.on("error", (err: Error) => {
  console.error("Error en la conexión MQTT:", err);
});

client_mqtt.on("reconnect", () => {
  console.log("Intentando reconectar...");
});

client_mqtt.on("close", () => {
  console.log("Conexión cerrada con el broker MQTT");
});

export default client_mqtt;
