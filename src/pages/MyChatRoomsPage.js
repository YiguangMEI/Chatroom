import React,{ useEffect, useState }from 'react';
import axios from 'axios';
function MyChatCanalPage() {
    const [Canal, setCanal] = useState([]);
    const userID=4;
    useEffect(() => {
        // 在组件加载时获取聊天室列表数据
        fetchCanalList();
    }, []);
    const fetchCanalList = async () => {
        try {
            const response = await axios.get('/api/rooms', {
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
            <h2>Mes salons de discussion</h2>
            <u1>
               <p>
                   asdhdaskhsdakj
               </p>
            </u1>

        </div>
    );
}

export default MyChatCanalPage;