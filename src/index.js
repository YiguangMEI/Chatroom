import React from 'react';
import ReactDOM from 'react-dom/client';
import './chat.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ChatList from "./components/ChatList";
import Planifier from "./components/Planifier";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/api/rooms/owner" element={<ChatList />} />
            <Route path="/api/rooms/invitation" element={<ChatList />} />
            <Route path="/api/rooms/planifier" element={<Planifier />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
