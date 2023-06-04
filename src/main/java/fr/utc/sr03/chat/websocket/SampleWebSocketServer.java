package fr.utc.sr03.chat.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.server.ServerEndpointConfig;
import java.util.Hashtable;

@Component
@ServerEndpoint(value="/sample/{login}", configurator= SampleWebSocketServer.EndpointConfigurator.class)
public class SampleWebSocketServer {
    private static final Logger LOGGER = LoggerFactory.getLogger(SampleWebSocketServer.class);

    private static SampleWebSocketServer singleton = new SampleWebSocketServer();
    private final Hashtable<String, Session> sessions = new Hashtable<>();

    private SampleWebSocketServer() {}

    //+++++++++++++++++++++++++++++++++++++++++++
    // CONFIG
    // - Singleton => Permet de ne pas avoir une instance différente par client
    // - Le configurateur utilise le singleton
    //+++++++++++++++++++++++++++++++++++++++++++
    public static class EndpointConfigurator extends ServerEndpointConfig.Configurator {
        @Override
        @SuppressWarnings("unchecked")
        public <T> T getEndpointInstance(Class<T> endpointClass) {
            return (T) SampleWebSocketServer.getInstance();
        }
    }

    public static SampleWebSocketServer getInstance() {
        return SampleWebSocketServer.singleton;
    }

    //+++++++++++++++++++++++++++++++++++++++++++
    // CONNECTION + MESSAGES
    //+++++++++++++++++++++++++++++++++++++++++++
    @OnOpen
    public void open(Session session, @PathParam("login") String login) {
        LOGGER.info("Session ouverte pour [" + login + "]");
        session.getUserProperties().put("login", login);
        sessions.put(session.getId(), session);
        sendMessage( "Session ouverte pour [" + login + "] cote serveur");
    }

    @OnClose
    public void close(Session session) {
        String login = (String) session.getUserProperties().get("login");
        LOGGER.info("Session fermee pour [" + login + "]");
        sessions.remove(session.getId());
        sendMessage( "Session fermee pour [" + login + "] cote serveur");
    }

    @OnError
    public void onError(Throwable error) {
        LOGGER.error(error.getMessage());
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        String login = (String) session.getUserProperties().get("login");
        sendMessage(message );
        LOGGER.info("Message recu de [" + login +"] : [" + message + "]");
    }

    private void sendMessage(String message) {
        for (Session session : sessions.values()) {
            try {
                session.getBasicRemote().sendText(message);
            } catch (Exception exception) {
                System.out.println("ERROR: cannot send message to " + session.getId());
            }
        }
    }

}