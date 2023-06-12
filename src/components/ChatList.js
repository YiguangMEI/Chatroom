// import React, {useEffect, useState} from "react";
// import {Link,useNavigate} from "react-router-dom";
// import axios from 'axios';
//
// import {ChatListSalons} from "./ChatListContent";
// import {ChatListInvitations} from "./ChatListContent";
// import Planifier from "./Planifier";
// // const currentUrl = window.location.href;
// // const updatedUrl = currentUrl.replace('3000', '8080');
// // console.log(updatedUrl);
//
// const ChatList = (props) => {
//     const [chats, setChats] = useState([])
//     const [User, setUser] = useState([]);
//     const navigate = useNavigate();
//     const [selectedNavItem, setSelectedNavItem] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);
//     const fetchCanalList = async (url) => {
//         try {
//                 const userid=User.id;
//                 const response = await axios.get(url, {
//                     params: {
//                         user_Id: userid // 将 userId 替换为实际的用户ID
//                     }
//                 });
//                 setChats(response.data);
//         } catch (error) {
//             console.error('Error fetching Canal list:', error);
//         }
//     }
//
//     useEffect(() => {
//         //TODOuseEffect Recuperer la liste des chats du user depuis le backend spring
//         // axios.get...
//         const user = sessionStorage.getItem('user');
//
//         if (user) {
//             const parsedUser = JSON.parse(user);
//             setUser(parsedUser);
//         } else {
//             navigate("/");
//         }
//         //setCurrentChat(1);
//
//     }, [])
//
//
//
//     // => "onload"
//
//
//     return (
//
//         <div>
//             <nav className="navbar navbar-expand-lg">
//                 <div className="container-fluid">
//                     <Link className={'navbar-brand'} onClick={()=>{setSelectedNavItem("accueil");}}>Accueil</Link>
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <Link className={'nav-link'} onClick={()=>{setSelectedNavItem("planifier");}}  >Planifier une discussion</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className={'nav-link'} onClick={() =>{
//                                     fetchCanalList('http://localhost:8080/api/rooms/owner');setSelectedNavItem("Salons");}}>Mes salons de discussion</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className={'nav-link'} onClick={() =>{
//                                     fetchCanalList('http://localhost:8080/api/rooms/invitation');setSelectedNavItem("invitations");}}>Mes invitations</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             <div className="content">
//                 <aside>
//                     <p>ID: {User && User.id}</p>
//                     <p>Name: {User && User.firstName}</p>
//                 </aside>
//                 <main>
//                     {selectedNavItem === 'Salons' && (
//                         <ChatListSalons
//                             chats={chats}
//                             User={User}
//                         />
//                     )}
//
//                     {selectedNavItem === 'invitations' && (
//                         <ChatListInvitations chats={chats}
//                                              User={User}
//
//                         />
//                     )}
//
//                     {selectedNavItem === 'accueil' &&(
//                         <h1>Bienvenue sur la page d'accueil</h1>
//                     )}
//                     {selectedNavItem === 'planifier' &&(
//                         <Planifier
//                         />
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// }
//
// export default ChatList;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import axios from 'axios';

import { ChatListSalons } from "./ChatListContent";
import { ChatListInvitations } from "./ChatListContent";
import Planifier from "./Planifier";

const { Header, Content, Sider } = Layout;

const ChatList = (props) => {
    const [chats, setChats] = useState([]);
    const [User, setUser] = useState([]);
    const navigate = useNavigate();
    const [selectedNavItem, setSelectedNavItem] = useState(null);

    const fetchCanalList = async (url) => {
        try {
            const userid = User.id;
            const response = await axios.get(url, {
                params: {
                    user_Id: userid // 将 userId 替换为实际的用户ID
                }
            });
            setChats(response.data);
        } catch (error) {
            console.error('Error fetching Canal list:', error);
        }
    }
    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate("/");
    };

    useEffect(() => {
        const user = sessionStorage.getItem('user');

        if (user) {
            const parsedUser = JSON.parse(user);
            setUser(parsedUser);
        } else {
            navigate("/");
        }
    }, [])

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <Menu theme="dark" mode="inline" selectedKeys={[selectedNavItem]}>
                    <Menu.Item key="accueil" onClick={() => { setSelectedNavItem("accueil"); }}>
                        <Link >Accueil</Link>
                    </Menu.Item>
                    <Menu.Item key="planifier" onClick={() => { setSelectedNavItem("planifier"); }}>
                        <Link >Planifier une discussion</Link>
                    </Menu.Item>
                    <Menu.Item key="Salons" onClick={() => { fetchCanalList('http://localhost:8080/api/rooms/owner'); setSelectedNavItem("Salons"); }}>
                        <Link >Mes salons de discussion</Link>
                    </Menu.Item>
                    <Menu.Item key="invitations" onClick={() => { fetchCanalList('http://localhost:8080/api/rooms/invitation'); setSelectedNavItem("invitations"); }}>
                        <Link >Mes invitations</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header>
                    <div className="logo" style={{ width:'800'}}/>
                    <div style={{ display: 'flex'}}>
                        <div>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} style={{ display: 'flex' }} >
                            <Menu.Item key="1">ID: {User && User.id}</Menu.Item>
                            <Menu.Item key="2">Name: {User && User.firstName}</Menu.Item>
                        </Menu >
                        </div>

                        <div style={{ marginLeft: '650px' }}></div> {                               }

                        <div>
                        <Menu  theme="dark" mode="horizontal" defaultSelectedKeys={["3"]} style={{ display: 'flex',justifyContent: 'flex-end'}}>
                            <Menu.Item key="3"  onClick={handleLogout}>Logout</Menu.Item>
                        </Menu>
                        </div>
                    </div>

                </Header>
                <Content style={{ margin: "16px" }}>
                    {selectedNavItem === 'Salons' && (
                        <ChatListSalons chats={chats} User={User} state={'salons'} />
                    )}

                    {selectedNavItem === 'invitations' && (
                        <ChatListSalons chats={chats} User={User} state={'invitations'}/>
                    )}

                    {selectedNavItem === 'accueil' && (
                        <h1>Bienvenue sur la page d'accueil</h1>
                    )}
                    {selectedNavItem === 'planifier' && (
                        <Planifier userid={User.id}/>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
}

export default ChatList;
