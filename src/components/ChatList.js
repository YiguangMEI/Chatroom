import React, {useEffect, useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import {ChatListSalons} from "./ChatListContent.js";
import {ChatListInvitations} from "./ChatListContent";
import Planifier from "./Planifier";
// const currentUrl = window.location.href;
// const updatedUrl = currentUrl.replace('3000', '8080');
// console.log(updatedUrl);

const ChatList = (props) => {
    const [chats, setChats] = useState([])
    const [User, setUser] = useState([]);
    const navigate = useNavigate();
    const [selectedNavItem, setSelectedNavItem] = useState(null);
    const [showModalVisible, setShowModalVisible] = useState(null);
    const fetchCanalList = async (url) => {
        try {
                const userid=User.id;
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



    async function handleEdit(id) {
        try {
            // 执行异步编辑操作
            const response = await axios.put(`http://localhost:8080/api/chats/${id}`, { /* 编辑数据 */ });
            // 处理成功的响应
            console.log("编辑成功", response.data);
        } catch (error) {
            // 处理错误
            console.error("编辑失败", error);
        }
    }

    async function handleDelete(id) {
        try {
            // 执行异步删除操作
            const response = await axios.delete(`http://localhost:8080/api/rooms/owner/${id}`);
            // 处理成功的响应
            if(response.data){
                alert('删除成功');
            }else {
                alert('删除失败');
            }
        } catch (error) {
            // 处理错误
            console.error("删除失败", error);
        }
    }

    useEffect(() => {
        //TODOuseEffect Recuperer la liste des chats du user depuis le backend spring
        // axios.get...
        const user = sessionStorage.getItem('user');

        if (user) {
            const parsedUser = JSON.parse(user);
            setUser(parsedUser);
        } else {
            navigate("/");
        }
    }, [])



    // => "onload"


    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className={'navbar-brand'} onClick={()=>{setSelectedNavItem("accueil");}}>Accueil</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={'nav-link'} onClick={()=>{setSelectedNavItem("planifier");}}  >Planifier une discussion</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link'} onClick={() =>{
                                    fetchCanalList('http://localhost:8080/api/rooms/owner');setSelectedNavItem("Salons");}}>Mes salons de discussion</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link'} onClick={() =>{
                                    fetchCanalList('http://localhost:8080/api/rooms/invitation');setSelectedNavItem("invitations");}}>Mes invitations</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="content">
                <aside>
                    <p>ID: {User && User.id}</p>
                    <p>Name: {User && User.firstName}</p>
                </aside>
                <main>
                    {selectedNavItem === 'Salons' && (
                        <ChatListSalons
                            chats={chats}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    )}

                    {selectedNavItem === 'invitations' && (
                        <ChatListInvitations chats={chats} />
                    )}

                    {selectedNavItem === 'accueil' &&(
                        <h1>Bienvenue sur la page d'accueil</h1>
                    )}
                    {selectedNavItem === 'planifier' &&(
                        <Planifier/>
                    )}
                    {/*{showModalVisible === 'edit' && (*/}
                    {/*    <Modal>*/}
                    {/*        <h2>编辑</h2>*/}
                    {/*        /!* 编辑框内容 *!/*/}
                    {/*        <button onClick={closeEditModal}>关闭</button>*/}
                    {/*    </Modal>*/}
                    {/*)}*/}
                </main>
            </div>
        </div>
    );
}

export default ChatList;
