

import { useState } from "react";
import Modal from "../Components/Modal";

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, nombre: "Roger", apellido: "Mendez", correo: "correo@correo.com", rol: "Administrador", estado: "Activo" },
        { id: 2, nombre: "Nombre", apellido: "Julian", correo: "correo@correo.com", rol: "General", estado: "Inactivo" },
        { id: 3, nombre: "Julio Damian", apellido: "Melendez Mendez", correo: "correo@correo.com", rol: "Administrador", estado: "Inactivo" },
        { id: 4, nombre: "Ryan", apellido: "Pomalaya", correo: "correo@correo.com", rol: "Administrador", estado: "Activo" },
        { id: 5, nombre: "Jhonatan", apellido: "Rulios", correo: "correo@correo.com", rol: "Administrador", estado: "Activo" }
    ]);
    
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filterRole, setFilterRole] = useState("");

    const filteredUsers = filterRole
        ? users.filter(user => user.rol === filterRole)
        : users;

    const handleEdit = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setModalOpen(true);
    };

    const handleDeleteUser = (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
        setUsers(users.filter(user => user.id !== id));
    };

    const handleSave = (userData) => {
        if (selectedUser) {
            setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...userData } : user)));
        } else {
            const newUser = { id: users.length + 1, ...userData, rol: "General" };
            setUsers([...users, newUser]);
        }
        setModalOpen(false);
    };

    return (
        <div className="container">
            <h2 className="title">Gestión Permisos de Usuarios</h2>

            <label>Filtrar por rol:</label>
            <select onChange={(e) => setFilterRole(e.target.value)}>
                <option value="">Todos</option>
                <option value="Administrador">Administrador</option>
                <option value="General">General</option>
            </select>

            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Nombre Completo Usuario</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.nombre + " " + user.apellido}</td>
                                <td>{user.correo}</td>
                                <td>{user.rol}</td>
                                <td className="actions">
                                    <button className="edit" onClick={() => handleEdit(user)}>🔄</button>
                                    <button className="delete" onClick={() => handleDeleteUser(user.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="add-user" onClick={handleAddUser}>➕ Añadir Usuario</button>

            <Modal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onSave={handleSave} 
                initialData={selectedUser} 
            />
        </div>
    );
};

export default UserManagement;