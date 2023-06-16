import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import {Form, Input, Button} from "antd";

const Login = (props) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [User, setUser] = useState([]);
    const navigate = useNavigate();

    const handleLogin =async (event) => {
        event.preventDefault();
        console.log("mail = " + mail)
        console.log("password = " + password)

        //TODO Requete http login au backend spring
        // axios.post...
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                mail: mail,
                password: password
            });

            if (response && response.data) {
                setUser(response.data); // 处理登录成功逻辑
                console.log("登录成功");
                sessionStorage.setItem('user', JSON.stringify(response.data));
                // 跳转到其他页面
                navigate("/rooms");
            } else {
                // 处理登录失败逻辑
                console.log("登录失败");
            }
        } catch (error) {
            // 处理请求错误逻辑
            console.error("登录请求错误:", error);
        }
    }

    return (
        <div className="login-container">
            {/*<form>*/}
            {/*    <div className="mb-3">*/}
            {/*        <label htmlFor="mail" className="form-label">Email</label>*/}
            {/*        <input type="email" name="mail" className="form-control" id="mail" value={mail}*/}
            {/*               onChange={e => {*/}
            {/*                   setMail(e.target.value)*/}
            {/*               }} required={true}/>*/}
            {/*    </div>*/}
            {/*    <div className="mb-3">*/}
            {/*        <label htmlFor="password" className="form-label">Password</label>*/}
            {/*        <input type="password" name="password" className="form-control" id="password" value={password}*/}
            {/*               onChange={e => {*/}
            {/*                   setPassword(e.target.value)*/}
            {/*               }} required={true}/>*/}
            {/*        <div className="invalid-feedback">Login ou mot de passe incorrect</div>*/}
            {/*    </div>*/}
            {/*    <button type="submit" className="btn btn-primary w-100" onClick={handleLogin}>Connexion</button>*/}
            {/*    <Link to="/chats">POUR TEST UNIQUEMENT</Link>*/}
            {/*</form>*/}
            <Form>
                <Form.Item label="Email" name="mail" rules={[{ required: true, message: 'Please input your email' }]}>
                    <Input value={mail} onChange={(e) => setMail(e.target.value)} />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password' }]}>
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" block onClick={handleLogin}>
                        Connexion
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to="/chats">POUR TEST UNIQUEMENT</Link>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
