import { useState, useEffect } from "react";
import mqttClient from "../mqtt/mqttClient";

export function useMqttSub(topic, data_size) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessage = (receivedTopic, message) => {
      if (receivedTopic === topic) {
        try {
          const newMessage = JSON.parse(message.toString());
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            return updatedMessages.slice(-data_size);
          });
        } catch (error) {
          console.error("Error al parsear el mensaje MQTT:", error);
        }
      }
    };

    // Verificar conexión y suscribir
    const subscribe = () => {
      if (mqttClient.connected) {
        mqttClient.subscribe(topic, (err) => {
          if (err) {
            console.error(`Error al suscribirse al tema '${topic}':`, err);
          } else {
            console.log(`Suscripción exitosa al tema '${topic}'`);
          }
        });
      } else {
        mqttClient.on('connect', () => {
          console.log('Cliente conectado, suscribiéndose al tema');
          mqttClient.subscribe(topic, (err) => {
            if (err) {
              console.error(`Error al suscribirse al tema '${topic}':`, err);
            }
          });
        });
      }
    };

    subscribe();
    mqttClient.on("message", handleMessage);

    // Limpieza al desmontar el efecto
    return () => {
      if (mqttClient.connected) {
        mqttClient.unsubscribe(topic, (err) => {
          if (err) {
            console.error(`Error al desuscribirse del tema '${topic}':`, err);
          }
        });
      }
      mqttClient.removeListener("message", handleMessage);
    };
  }, [topic, data_size]);

  return messages;
}
