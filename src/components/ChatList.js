import React, {useEffect, useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import Planifier from './Planifier';
import List from './List';
const currentUrl = window.location.href;
const updatedUrl = currentUrl.replace('3000', '8080');
console.log(updatedUrl);


const ChatList = (props) => {
    const [chats, setChats] = useState([])
    const [showPlanifier, setShowPlanifier] = useState(false);
    const navigate = useNavigate();
    const [User, setUser] = useState([])

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
                    <Link className={'navbar-brand'} >Accueil</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={'nav-link'}  onClick={() => setShowPlanifier(true)}> Planifier une discussion</Link>
                            </li>
                            <li className="nav-item">
                                <Link  className={'nav-link'} onClick={() => {
                                    fetchCanalList('http://localhost:8080/api/rooms/owner');
                                    setShowPlanifier(false);
                                }
                                }>Mes salons de discussion</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link'} onClick={() =>{
                                    fetchCanalList('http://localhost:8080/api/rooms/invitation');
                                    setShowPlanifier(false);}
                                }>Mes invitations</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link'} to="/api/rooms/inivitation">Mes invitations</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                {showPlanifier ? <Planifier /> : <List User={User} chats={chats}/>}

            </div>
        </div>
    );
}






export default ChatList;
