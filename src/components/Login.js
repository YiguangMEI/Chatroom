import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import chatList from "./ChatList";
const Login = (props) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [User, setUser] = useState([]);
    const handleLogin =async (event) => {
        event.preventDefault();
        console.log("mail = " + mail)
        console.log("password = " + password)
        //TODO Requete http login au backend spring
        // axios.post...
        try {
            const response = await axios.post('localhost:8080/api/login', {
                email: mail,
                password: password
            }).then(setUser(response.data));
// 处理登录成功的逻辑

        }catch (error){
            console.error("登录失败");
            console.error("错误信息:", error.response.data);
        }
    }

    return (
        <div className="login-container">
            <form>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Email</label>
                    <input type="email" name="mail" className="form-control" id="mail" value={mail}
                           onChange={e => {
                               setMail(e.target.value)
                           }} required={true}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={password}
                           onChange={e => {
                               setPassword(e.target.value)
                           }} required={true}/>
                    <div className="invalid-feedback">Login ou mot de passe incorrect</div>
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={handleLogin}>Connexion</button>
                <Link to="/chats">POUR TEST UNIQUEMENT</Link>
            </form>
        </div>
    );
}

export default Login;
