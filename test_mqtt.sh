#!/usr/bin/env bash
# ============================================================
# test_mqtt.sh — Probar topics MQTT de NetBin en HiveMQ Cloud
# Uso: bash test_mqtt.sh
# Requiere: mosquitto-clients (sudo apt-get install mosquitto-clients)
# ============================================================

HOST="83aaf8a2cf194d32be5ce5edcad1dfea.s1.eu.hivemq.cloud"
PORT=8883
USER="net_user_bin"
PASS="Netbin21"

TOPIC_LEVEL="netbin/rasp/bin/sensor/level"
TOPIC_AI="netbin/rasp/bin/sensor/AI"
TOPIC_COMP_REC="netbin/rasp/bin/compuerta_reciclable"
TOPIC_COMP_NOREC="netbin/rasp/bin/compuerta_no_reciclable"

# Verificar que mosquitto_sub/pub están instalados
if ! command -v mosquitto_sub &>/dev/null || ! command -v mosquitto_pub &>/dev/null; then
  echo "ERROR: mosquitto-clients no está instalado."
  echo "  Ubuntu/Debian: sudo apt-get install mosquitto-clients"
  echo "  macOS:         brew install mosquitto"
  exit 1
fi

TS=$(date +"%d/%m/%Y %H:%M:%S")

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║       NetBin — MQTT Test (HiveMQ)        ║"
echo "╠══════════════════════════════════════════╣"
echo "║ Broker: $HOST"
echo "║ Puerto: $PORT (TLS)"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "¿Qué quieres probar?"
echo "  1) Escuchar TODOS los topics  (netbin/#)"
echo "  2) Escuchar sensor/level"
echo "  3) Escuchar sensor/AI"
echo "  4) Publicar prueba en sensor/level"
echo "  5) Publicar prueba en sensor/AI"
echo "  6) Comando: abrir compuerta reciclable"
echo "  7) Comando: abrir compuerta no reciclable"
echo "  8) Comando: cerrar compuerta reciclable"
echo "  9) Comando: cerrar compuerta no reciclable"
echo ""
read -rp "Opción [1-9]: " opt
echo ""

SUB_OPTS="-h $HOST -p $PORT --capath /etc/ssl/certs -u $USER -P $PASS"
PUB_OPTS="-h $HOST -p $PORT --capath /etc/ssl/certs -u $USER -P $PASS"

case $opt in
  1)
    echo "Escuchando netbin/# — Ctrl+C para salir"
    echo "──────────────────────────────────────────"
    # shellcheck disable=SC2086
    mosquitto_sub $SUB_OPTS -t "netbin/#" -v
    ;;
  2)
    echo "Escuchando $TOPIC_LEVEL — Ctrl+C para salir"
    echo "──────────────────────────────────────────"
    # shellcheck disable=SC2086
    mosquitto_sub $SUB_OPTS -t "$TOPIC_LEVEL" -v
    ;;
  3)
    echo "Escuchando $TOPIC_AI — Ctrl+C para salir"
    echo "──────────────────────────────────────────"
    # shellcheck disable=SC2086
    mosquitto_sub $SUB_OPTS -t "$TOPIC_AI" -v
    ;;
  4)
    PAYLOAD="{\"variable\":65,\"variable_1\":35,\"timestamp_1\":\"$TS\"}"
    echo "Publicando en $TOPIC_LEVEL"
    echo "Payload: $PAYLOAD"
    # shellcheck disable=SC2086
    mosquitto_pub $PUB_OPTS -t "$TOPIC_LEVEL" -m "$PAYLOAD"
    echo "Listo."
    ;;
  5)
    PAYLOAD="{\"variable_1\":\"Botella plástica\",\"value_1\":\"Reciclable\",\"timestamp_1\":\"$TS\"}"
    echo "Publicando en $TOPIC_AI"
    echo "Payload: $PAYLOAD"
    # shellcheck disable=SC2086
    mosquitto_pub $PUB_OPTS -t "$TOPIC_AI" -m "$PAYLOAD"
    echo "Listo."
    ;;
  6)
    echo "Publicando comando: abrir_reciclable"
    # shellcheck disable=SC2086
    mosquitto_pub $PUB_OPTS -t "$TOPIC_COMP_REC" -m "abrir_reciclable" -q 1
    echo "Listo."
    ;;
  7)
    echo "Publicando comando: abrir_no_reciclable"
    # shellcheck disable=SC2086
    mosquitto_pub $PUB_OPTS -t "$TOPIC_COMP_NOREC" -m "abrir_no_reciclable" -q 1
    echo "Listo."
    ;;
  8)
    echo "Publicando comando: cerrar_reciclable"
    # shellcheck disable=SC2086
    mosquitto_pub $PUB_OPTS -t "$TOPIC_COMP_REC" -m "cerrar_reciclable" -q 1
    echo "Listo."
    ;;
  9)
    echo "Publicando comando: cerrar_no_reciclable"
    # shellcheck disable=SC2086
    mosquitto_pub $PUB_OPTS -t "$TOPIC_COMP_NOREC" -m "cerrar_no_reciclable" -q 1
    echo "Listo."
    ;;
  *)
    echo "Opción inválida."
    exit 1
    ;;
esac
