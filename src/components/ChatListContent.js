const ChatListSalons = ({ chats, handleEdit, handleDelete }) => (
    <table className="table">
        <thead>
        <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Editer</th>
            <th>Supprimer</th>
        </tr>
        </thead>
        <tbody>
        {chats && chats.map((chat) => (
            <tr key={chat.id}>
                <td>{chat.titre}</td>
                <td>{chat.description}</td>
                <td>
                    <button onClick={() => handleEdit(chat.id)}>编辑</button>
                </td>
                <td>
                    <button onClick={() => handleDelete(chat.id)}>删除</button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
);

const ChatListInvitations = ({ chats }) => (
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
);

export { ChatListSalons, ChatListInvitations };