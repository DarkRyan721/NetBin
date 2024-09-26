FROM openjdk:17-jdk-slim
LABEL authors="Miguel"

COPY target/app-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]