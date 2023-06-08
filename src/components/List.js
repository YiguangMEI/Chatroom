import React, {useEffect, useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import Login from "./Login";

const List = (User,chats) =>{


    return (
    <div className="content">
        <aside>
            <p>ID: {User && User.id}</p>
            <p>Name: {User && User.firstName}</p>
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
                {chats && chats.map((chats) => (
                    <tr key={chats.id}>
                        <td>{chats.titre}</td>
                        <td>{chats.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    </div>)


}
export default List;