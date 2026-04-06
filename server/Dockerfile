# Shared dependencies stage
FROM maven:3.9-eclipse-temurin-21 AS deps
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Dev target: run app with Maven (use with mounted source for hot reload)
FROM deps AS dev
WORKDIR /app
COPY . .
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]

# Build target: package jar for production runtime
FROM deps AS build
WORKDIR /app
COPY src ./src
RUN mvn clean package -DskipTests

# Prod target: lightweight runtime image
FROM eclipse-temurin:21-jre-jammy AS prod
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
