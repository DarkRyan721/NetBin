import mqtt from "mqtt";

// Configuración del cliente MQTT
const host = 'ws://broker.emqx.io:8083'; // Para WebSocket

const client = mqtt.connect(connectUrl, {
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});
export default client;
