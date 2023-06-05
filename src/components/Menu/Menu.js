import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Menu() {
    const [Canal, setCanal] = useState([]);
    const userID=4;
    useEffect(() => {
        // 在组件加载时获取聊天室列表数据
        fetchCanalList();
    }, []);
    const fetchCanalList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/rooms', {
                params: {
                    user_Id: userID // 将 userId 替换为实际的用户ID
                }
            });
            setCanal(response.data);
        } catch (error) {
            console.error('Error fetching Canal list:', error);
        }
    };


    return (
        <div>
            <div>
                <h2>Canal List</h2>
                <ul>
                    {Canal.map(Canal=> (
                        <li key={Canal.id}>{Canal.canal.titre}</li>
                    ))}
                </ul>
            </div>

            <h3>Menu</h3>
            <ul>
                <li>
                    <Link to="/plan">Planifier une discussion</Link>
                </li>
                <li>
                    <Link to="/myChatRooms">Mes salons de discussion</Link>
                </li>
                <li>
                    <Link to="/myInvitations">Mes invitations</Link>
                </li>
            </ul>
        </div>
    );
}

export default Menu;