import React, { useState } from "react";
import axios from 'axios';

const CanalForm = () => {
    const [userId, setUserId] = useState("");
    const [canalName, setCanalName] = useState("");
    const [canalDescription, setCanalDescription] = useState("");
    const [canalDate, setCanalDate] = useState("");
    const [canalTime, setCanalTime] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await axios.post('http://localhost:8080/api/rooms/planifier', {
                user_id: parseInt(userId),
                canal_name: canalName,
                canal_description: canalDescription,
                canal_date: canalDate,
                canal_time: parseInt(canalTime)
            });


            // 处理成功响应逻辑
            console.log("计划成功:", response.data);
        } catch (error) {
            // 处理错误响应逻辑
            console.error("计划请求错误:", error);
        }
    }

    return (

        <div >
            <h2>计划频道</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">用户ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="canalName">频道名称:</label>
                    <input
                        type="text"
                        id="canalName"
                        value={canalName}
                        onChange={(e) => setCanalName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="canalDescription">频道描述:</label>
                    <input
                        type="text"
                        id="canalDescription"
                        value={canalDescription}
                        onChange={(e) => setCanalDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="canalDate">日期:</label>
                    <input
                        type="date"
                        id="canalDate"
                        value={canalDate}
                        onChange={(e) => setCanalDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="canalTime">时间:</label>
                    <input
                        type="text"
                        id="canalTime"
                        value={canalTime}
                        onChange={(e) => setCanalTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">提交</button>
            </form>
        </div>
    );
}

export default CanalForm;
