docker run --rm -it \
-p 8080:8080 \
-v "$PWD":/app \
-v ~/.m2:/root/.m2 \
-w /app \
-e DB_HOST=dpg-d76hqe15pdvs739l20f0-a.virginia-postgres.render.com \
-e DB_PORT=5432 \
-e DB_NAME=db_netbin \
-e DB_USERNAME=db_netbin_user \
-e DB_PASSWORD=jXAfFuQOABqtWAz61YBkU7Xude6CT1Jg \
maven:3.9.9-eclipse-temurin-21 \
./mvnw spring-boot:run