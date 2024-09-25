FROM openjdk:17-jdk-slim
LABEL authors="Miguel"

WORKDIR /app
RUN ./mvnw clean package -DSkipTests

COPY target/app-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]