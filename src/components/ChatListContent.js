import {useEffect, useState} from "react";


const ChatListSalons = ({ chats, handleEdit, handleDelete,enterChatRoom, exitChatRoom, inChatRoom,currentChat,User}) => {
    const [ws, setWs] = useState(null);
    const [history, setHistory] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        const chatid=currentChat.id;
        const userid=User.id;
        // 创建 WebSocket 连接
        const socket = new WebSocket(`ws://localhost:8080/webSocket/${chatid}/${userid}`);
        setWs(socket);
        // 监听 WebSocket 事件
        socket.addEventListener('open', () => {
            console.log('Connection established');
        });

        socket.addEventListener('message', (event) => {
            const receivedMessage = event.data;
            console.log('Receive new message: ' + receivedMessage);
            setHistory((prevHistory) => prevHistory + receivedMessage + '\n');
        });

        socket.addEventListener('close', () => {
            console.log('Connection closed');
        });

        return () => {
            // 在组件卸载时关闭 WebSocket 连接
            if (socket) {
                socket.close();
            }
        };
    }, [inChatRoom]);

    const handleSend = () => {
        if (ws && message) {
            ws.send(message);
            setMessage('');
        }
    };


        if (inChatRoom) {


        // 聊天界面的内容
        return (

            <div>
                <h2>聊天室: {currentChat.titre}</h2>

                <textarea id="history" value={history} readOnly />
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={handleSend}>发送</button>
                <button onClick={exitChatRoom}>退出聊天室</button>
            </div>
        );
    }


    return (
        <table className="table">
            <thead>
            <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Editer</th>
                <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
            {chats && chats.map((chat) => (
                <tr key={chat.id}>
                    <td>{chat.titre}</td>
                    <td>{chat.description}</td>

                    <td>
                        <button onClick={() => handleEdit(chat.id)}>编辑</button>
                    </td>
                    <td>
                        <button onClick={() => handleDelete(chat.id)}>删除</button>
                    </td>

                    <td>
                        <button onClick={() => enterChatRoom(chat)}>进入</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

const ChatListInvitations = ({ chats, enterChatRoom, exitChatRoom, inChatRoom,currentChat,User }) => {


    const [ws, setWs] = useState(null);
    const [history, setHistory] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        console.log(currentChat.id, User.id);
        const chatid = currentChat.id;
        const userid = User.id;
        // 创建 WebSocket 连接
        const socket = new WebSocket(`ws://localhost:8080/webSocket/${chatid}/${userid}`);
        setWs(socket);
        // 监听 WebSocket 事件
        socket.addEventListener('open', () => {
            console.log('Connection established');
        });

        socket.addEventListener('message', (event) => {
            const receivedMessage = event.data;
            console.log('Receive new message: ' + receivedMessage);
            setHistory((prevHistory) => prevHistory + receivedMessage + '\n');
        });

        socket.addEventListener('close', () => {
            console.log('Connection closed');
        });

        return () => {
            // 在组件卸载时关闭 WebSocket 连接
            if (socket) {
                socket.close();
            }
        };
    }, [inChatRoom]);

    const handleSend = () => {
        if (ws && message) {
            ws.send(message);
            setMessage('');
        }
    };


    if (inChatRoom) {


        // 聊天界面的内容
        return (

            <div>
                <h2>聊天室: {currentChat.titre}</h2>

                <textarea id="history" value={history} readOnly/>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button onClick={handleSend}>发送</button>
                <button onClick={exitChatRoom}>退出聊天室</button>
            </div>
        );
    }
return(

    <table className="table">
        <thead>
        <tr>
            <th>Titre</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        {chats && chats.map((chat) => (
            <tr key={chat.id}>
                <td>{chat.titre}</td>
                <td>{chat.description}</td>
                <td>
                    <button onClick={() => enterChatRoom(chat)}>进入</button>
                </td>

            </tr>
        ))}
        </tbody>
    </table>
);
};

export { ChatListSalons, ChatListInvitations };