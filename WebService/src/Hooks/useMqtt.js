import { useState, useEffect } from "react";
import mqttClient from "../mqtt/mqttClient";

export function useMqtt(topic) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Suscribirse al tópico
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error("Error al suscribirse:", err);
      }
    });

    // Manejar mensajes recibidos
    mqttClient.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        const parsedMessage = JSON.parse(message.toString());
        setMessages((prev) => [...prev, parsedMessage]); // Agrega el mensaje a la lista
      }
    });

    return () => {
      mqttClient.unsubscribe(topic); // Cancelar la suscripción al desmontar
    };
  }, [topic]);

  return messages;
}
