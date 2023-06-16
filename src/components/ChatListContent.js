import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {Modal, Form, Input, Button, Table, Layout, List} from "antd";
import moment from "moment";
import AddUser from "./AddUser";
const { Header, Content, Sider,Footer } = Layout;
const ChatListSalons = ({ chats, User ,state}) => {
    const [ws, setWs] = useState(null);
    const [history, setHistory] = useState("");
    const [message, setMessage] = useState("");
    const [chatUsers, setChatUsers] = useState(null);
    const [inChatRoom, setInChatRoom] = useState(false);
    const [inEditRoom, setInEditRoom] = useState(false);
    const [editedChat, setEditedChat] = useState(null); //将要编辑的聊天室信息
    const [currentChat, setCurrentChat] = useState(null); // enterChatRoom, exitChatRoom,inChatRoom,currentChat
    const [inUserAdd, setInUserAdd] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const [pageSize, setPageSize] = useState(5); // 每页显示的条数



    // 根据当前页码和每页显示的条数计算要展示的聊天室列表
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleChats = chats.slice(startIndex, endIndex);

    const fetchChatUsers = async (chat) => {
        try {
            const chatId = chat.id;
            const response = await axios.get(`http://localhost:8080/api/rooms/owner/${chatId}`, {
                params: {
                    chat_Id: chatId // 将 userId 替换为实际的用户ID
                }
            });
            console.log(response.data);
            setChatUsers(response.data);
        } catch (error) {
            console.error('Error fetching Canal list:', error);
        }
    }
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setInUserAdd(false);
        return () => {
            // 在组件卸载时关闭 WebSocket 连接
            setHistory("");

            if (ws) {
                ws.close();
            }
            setInChatRoom(false);
        };
    }, [state]);

    const enterChatRoom = (chat) => {
        setInUserAdd(false);
        if(ws){
            ws.close();
        }
        setCurrentChat(chat);
        const chatId = chat.id;
        const userId = User.firstName;
        // 创建 WebSocket 连接
        const socket = new WebSocket(`ws://localhost:8080/webSocket/${chatId}/${userId}`);
        setWs(socket);
        // 监听 WebSocket 事件
        socket.addEventListener("open", () => {
            console.log("Connection established");
        });

        socket.addEventListener("message", (event) => {
            const receivedMessage = event.data;
            console.log("Receive new message: " + receivedMessage);
            setHistory((prevHistory) => prevHistory + receivedMessage + "\n");
        });

        socket.addEventListener("close", () => {
            console.log("Connection closed");
        });
        setInChatRoom(true);
    };

    const exitChatRoom = () => {
        // 退出聊天室的逻辑
        // 设置 inChatRoom 状态为 false
        setHistory("");
        if (ws) {
            ws.close();
        }
        setInChatRoom(false);
    };

    const handleDelete = async (id) => {
        try {
            // 执行异步删除操作
            const response = await axios.delete(`http://localhost:8080/api/rooms/owner/${id}`);
            // 处理成功的响应
            if (response.data) {
                alert("resussir de supprimer");
            } else {
                alert("resussir de supprimer!");
            }
        } catch (error) {
            // 处理错误
            console.error("删除失败", error);
        }
    };

    const handleSend = () => {
        if (ws && message) {
            ws.send(message);
            setMessage("");
        }
    };

    const handleEdit = (chat) => {
        console.log(chat);
        setEditedChat({ ...chat });
        setInEditRoom(true);
        console.log(inEditRoom);
    };

    const handleSave = async (values) => {
        // 发送编辑聊天室的请求到服务器
        try {
            // 调用后端 API 保存编辑后的聊天室信息
            const response = await axios.put(`http://localhost:8080/api/rooms/owners/${editedChat.id}`, {
                titre: values.titre,
                description: values.description,
                duree: values.duree,
            });
            // 处理成功响应逻辑
            console.log("réussir de modifier:", response.data);
            alert("réussir de modifier!");
        } catch (error) {
            // 处理错误响应逻辑
            console.error("保存请求错误:", error);
        }

        setInEditRoom(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedChat((prevChat) => ({
            ...prevChat,
            [name]: value,
        }));
    };

       const columns_salons = [
           {
               title: "Id",
               dataIndex: "id",
               key: "id",
           },
           {
               title: "Titre",
               dataIndex: "titre",
               key: "titre",
           },
           {
               title: "Description",
               dataIndex: "description",
               key: "description",
           },
           {
               title: "Horaire",
               dataIndex: "horaire",
               key: "horaire",
               render: (horaire) => moment(horaire).format("YYYY-MM-DD"),
           },
           {
               title: "Duree",
               dataIndex: "duree",
               key: "duree",
           },
           {
               title: "Editer",
               key: "edit",
               render: (_, record) => (
                   <Button onClick={() => handleEdit(record)}>éditer</Button>
               ),
           },
           {
               title: "Supprimer",
               key: "delete",
               render: (_, record) => (
                   <Button onClick={() => handleDelete(record.id)}>supprimer</Button>
               ),
           },
           {
               title: "Entrer",
               key: "enter",
               render: (_, record) => (
                   <Button onClick={() => {
                       fetchChatUsers(record);
                       enterChatRoom(record);
                   }}>entrer</Button>//
               ),
           },
       ];


       const columns_invitation = [
           {
               title: 'ID',
               dataIndex: 'id',
               key: 'id',
           },
           {
               title: 'Titre',
               dataIndex: 'titre',
               key: 'titre',
           },
           {
               title: 'Description',
               dataIndex: 'description',
               key: 'description',
           },
           {
               title: 'Horaire',
               dataIndex: 'horaire',
               key: 'horaire',
               render: (horaire) => moment(horaire).format('YYYY-MM-DD'),
           },
           {
               title: 'Duree',
               dataIndex: 'duree',
               key: 'duree',
           },
           {
               title: 'Entrer',
               key: 'action',
               render: (_, record) => (
                   <Button onClick={() => {
                       fetchChatUsers(record);
                       enterChatRoom(record);
                   }}>entrer</Button>//
               ),
           },
       ];

    function addChatuser() {
        setInUserAdd(true);
    }

    if (inChatRoom ) {

        // 聊天界面的内容
        return (
            // <div>

            <Layout style={{ width: "100%", height: "100%" }}>
                {inUserAdd && (
                    <AddUser currentChat={currentChat} exitAddUser={() => setInUserAdd(false)} />
                )}
                <Header style={{ backgroundColor: "white", textAlign: "center" }}>
                    <h2>Chat Room: {currentChat.titre}</h2>
                </Header>
                <Layout hasSider style={{ height: "100%" }}>
                    <Content style={{ height: "100%" }}>
                        <Input.TextArea id="history" value={history} readOnly style={{ overflowY: "auto", height: "90%", width: "100%" }} />
                        <div style={{ display: "flex", alignItems: "center",height:"10%" }}>
                            <Input value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: '80%', height: '100%', marginRight: '0px' }} />
                            <Button onClick={handleSend} type="primary">envoyer</Button>
                            <Button onClick={exitChatRoom}>EXIT</Button>
                        </div>
                    </Content>
                    <Sider style={{ backgroundColor: "white", display: "flex", flexDirection: "column" }}>
                        <div style={{ flex: "1" }}>
                            <h2 style={{ textAlign: "center" }}>Membre</h2>
                            {chatUsers && (
                                <List
                                    style={{ width: "100%", padding: "6px" }}
                                    dataSource={chatUsers}
                                    renderItem={(item) => (
                                        <List.Item key={item.id}>
                                            <List.Item.Meta
                                                title={item.firstName}
                                                description={item.mail}
                                            />
                                        </List.Item>
                                    )}
                                />
                            )}
                        </div>
                        <Button style={{ textAlign: "center", width: "100%" }} onClick={() =>setInUserAdd(true)} type="dashed">
                            <b>+</b>
                        </Button>
                    </Sider>
                </Layout>
            </Layout>




        );
    }

    if(state=='salons') {
        return (
            <div>
                <Table
                    columns={columns_salons}
                    dataSource={visibleChats}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: chats.length,
                        onChange: handlePageChange,
                    }}
                />

                {/* 编辑聊天室的模态框 */}
                <Modal
                    title="Modifier le salon"
                    open={inEditRoom}
                    onCancel={() => setInEditRoom(false)}
                    footer={null}
                >
                    <Form onFinish={handleSave}>
                        <Form.Item label="titre" name="titre" rules={[{required: true}]}>
                            <Input value={editedChat?.titre} onChange={handleChange}/>
                        </Form.Item>

                        <Form.Item
                            label="description"
                            name="description"
                            rules={[{required: true}]}
                        >
                            <Input.TextArea
                                value={editedChat?.description}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="durée" name="duree" rules={[{required: true}]}>
                            <Input value={editedChat?.duree} onChange={handleChange}/>
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Enregister
                        </Button>
                    </Form>
                </Modal>
            </div>
        );
    }else if(state=='invitations'){

       return(
           <div>
               <Table
                   dataSource={visibleChats}
                   columns={columns_invitation}
                   pagination={{
                       current: currentPage,
                       pageSize: pageSize,
                       total: chats.length,
                       onChange: handlePageChange,
                   }}
               />
           </div>

       );

    }

};



export { ChatListSalons};