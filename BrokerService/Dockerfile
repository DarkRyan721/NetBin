FROM eclipse-mosquitto:latest

RUN mkdir /etc/mosquitto

ADD /config/mosquitto.conf /etc/mosquitto
ADD passwd /etc/mosquitto
ADD /certs /etc/mosquitto/certs
ADD /logs/mosquitto.log /mosquitto/logs/

EXPOSE 1883

CMD ["/usr/sbin/mosquitto", "-c", "/etc/mosquitto/mosquitto.conf"]


