import mqtt from "mqtt";

// Configuración del broker MQTT
const url = 'ws://broker.emqx.io:8083/mqtt';

const options = {
  // Conexión limpia
  clean: true,
  connectTimeout: 4000,
  // Reconexión automática cada 2 segundos
  reconnectPeriod: 2000,
  // Identificación única del cliente
  clientId: `mqttx_${Math.random().toString(16).slice(2, 8)}`,
};

// Crear instancia del cliente MQTT
const client_mqtt = mqtt.connect(url, options);

// Listener para verificar conexión
client_mqtt.on('connect', () => {
  console.log('Conectado al broker MQTT');
});

// Listener para errores
client_mqtt.on('error', (err) => {
  console.error('Error en la conexión MQTT:', err);
});

// Listener para reconexiones
client_mqtt.on('reconnect', () => {
  console.log('Intentando reconectar...');
});

// Listener para cierre de conexión
client_mqtt.on('close', () => {
  console.log('Conexión cerrada con el broker MQTT');
});

export default client_mqtt;
