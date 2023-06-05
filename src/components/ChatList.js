import React, {useEffect, useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
const ChatList = (props) => {
    const [chats, setChats] = useState([])
    const [User, setUser] = useState([])
    const navigate = useNavigate();

    const cookies = document.cookie.split('; ');
    const userCookie = cookies.find(cookie => cookie.startsWith('user='));
    const apiUrl1 = 'http://localhost:8080/api/inivitatroomsion';
    // => "onload"
    useEffect(() => {
        //TODOuseEffect Recuperer la liste des chats du user depuis le backend spring
        // axios.get...


        if (userCookie) {
            const user = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
            const userid=user.id;
            setUser(user);
            const fetchCanalList = async (event) => {
                try {
                    const response = await axios.get('http://localhost:8080/api/rooms/owner', {
                        params: {
                            user_Id: userid // 将 userId 替换为实际的用户ID
                        }
                    });
                    setChats(response.data);
                } catch (error) {
                    console.error('Error fetching Canal list:', error);
                }

            }
            fetchCanalList();
        } else {
            navigate("/");
        }



    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className={'navbar-brand'} to="/api/chats">Accueil</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={'nav-link'} to="/api/rooms/planifier">Planifier une discussion</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link'} to="/api/rooms/owner" >Mes salons de discussion</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link'} to="/api/rooms/inivitation">Mes invitations</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link'} to="/api/rooms/inivitation">Mes invitations</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="content">
                <aside>
                    <p>{User && User.name}</p>


                </aside>
                <main>
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
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}

export default ChatList;
