import React, { useState } from "react";
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';
const Planifier = () => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(true);
    const handleSubmit = async (valus) => {
        //event.preventDefault();

        try {

            const response = await axios.post('http://localhost:8080/api/rooms/planifier', {
                user_id: parseInt(valus.userId),
                canal_name: valus.canalName,
                canal_description: valus.canalDescription,
                canal_date: valus.canalDate,
                canal_time: parseInt(valus.canalTime)
            });


            // 处理成功响应逻辑
            console.log("计划成功:", response.data);
            alert("计划成功");
        } catch (error) {
            // 处理错误响应逻辑
            console.error("计划请求错误:", error);
        }
    }

    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }
    return (

        <div >

            {/*<h2>计划频道</h2>*/}
            {/*<Button type="primary" onClick={openModal}>打开模态框</Button>*/}
            <Modal
                title="计划频道"
                visible={modalVisible}
                onCancel={closeModal}
                footer={null}
            >
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item name="userId" label="用户ID" rules={[{ required: true }]}>
                    <Input style={{ width: '300px' }}/>
                </Form.Item>
                <Form.Item name="canalName" label="频道名称" rules={[{ required: true }]}>
                    <Input style={{ width: '300px' }}/>
                </Form.Item>
                <Form.Item name="canalDescription" label="频道描述" rules={[{ required: true }]}>
                    <Input style={{ width: '300px' }}/>
                </Form.Item>
                <Form.Item name="canalDate" label="日期" rules={[{ required: true }]}>
                    <Input type="date" style={{ width: '300px' }}/>
                </Form.Item>
                <Form.Item name="canalTime" label="时间" rules={[{ required: true }]}>
                    <Input style={{ width: '300px' }}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
            </Modal>
        </div>
    );
}

export default  Planifier;
