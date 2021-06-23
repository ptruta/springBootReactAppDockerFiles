FROM openjdk:8

# Add app binary
ADD target/spring-social-0.0.1-SNAPSHOT.jar /spring-social.jar

# Expose HTTP
EXPOSE 8080

# Define default command.
CMD java $JAVA_OPTIONS -Dserver.port=8080 -jar /spring-social.jar

