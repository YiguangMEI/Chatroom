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
@ServerEndpoint(value="/client/{login}", configurator= ClientWebSocketServer.EndpointConfigurator.class)
public class ClientWebSocketServer {
    private static final Logger LOGGER = LoggerFactory.getLogger(ClientWebSocketServer.class);

    private static ClientWebSocketServer singleton = new ClientWebSocketServer();
    private final Hashtable<String, Session> sessions = new Hashtable<>();

    private ClientWebSocketServer() {}

    //+++++++++++++++++++++++++++++++++++++++++++
    // CONFIG
    // - Singleton => Permet de ne pas avoir une instance différente par client
    // - Le configurateur utilise le singleton
    //+++++++++++++++++++++++++++++++++++++++++++
    public static class EndpointConfigurator extends ServerEndpointConfig.Configurator {
        @Override
        @SuppressWarnings("unchecked")
        public <T> T getEndpointInstance(Class<T> endpointClass) {
            return (T) ClientWebSocketServer.getInstance();
        }
    }

    public static ClientWebSocketServer getInstance() {
        return ClientWebSocketServer.singleton;
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