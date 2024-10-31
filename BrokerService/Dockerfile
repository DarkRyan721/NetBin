FROM eclipse-mosquitto:latest

COPY /config/mosquitto.conf /config/mosquitto.conf
COPY ./entrypoint.sh .

RUN chmod +x entrypoint.sh

EXPOSE 1883

CMD ["sh", "entrypoint.sh"]