// import { useState } from "react";

// const UserManagement = () => {
//     const [users, setUsers] = useState([
//         { id: 1, name: "Nombre Completo Prueba", email: "correo@correo.com", role: "Administrador" },
//         { id: 2, name: "Nombre Completo Prueba", email: "correo@correo.com", role: "General" },
//     ]);
    
//     const [editingUser, setEditingUser] = useState(null);

//     const handleEdit = (user) => {
//         setEditingUser(user);
//     };

//     const handleClose = () => {
//         setEditingUser(null);
//     };

//     return (
//         <div className="container">
//             <h2 className="title">Gestión Permisos de Usuarios</h2>
//             <div className="table-container">
//                 <table className="user-table">
//                     <thead>
//                         <tr>
//                             <th>Nombre Completo Usuario</th>
//                             <th>Correo</th>
//                             <th>Rol</th>
//                             <th>Acciones</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user.id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.role}</td>
//                                 <td className="actions">
//                                     <button className="edit" onClick={() => handleEdit(user)}>🔄</button>
//                                     <button className="delete">🗑</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <button className="add-user">➕ Añadir Usuario</button>
            
//             {editingUser && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Editar Usuario</h3>
//                         <label>Nombre</label>
//                         <input type="text" value={editingUser.name} readOnly />
//                         <label>Correo</label>
//                         <input type="email" value={editingUser.email} readOnly />
//                         <label>Rol</label>
//                         <select defaultValue={editingUser.role}>
//                             <option value="Administrador">Administrador</option>
//                             <option value="General">General</option>
//                         </select>
//                         <button onClick={handleClose}>Cerrar</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserManagement;

import { useState } from "react";
import Modal from "../Components/Modal"; // Asegúrate de que la ruta sea correcta

const UserManagement = () => {
    // Estado para almacenar los usuarios con datos mockeados
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

    // Filtrar usuarios por rol (Administrador / General)
    const filteredUsers = filterRole
        ? users.filter(user => user.rol === filterRole)
        : users;

    // Función para editar usuario
    const handleEdit = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    // Función para añadir nuevo usuario
    const handleAddUser = () => {
        setSelectedUser(null);
        setModalOpen(true);
    };

    // Función para eliminar usuario con confirmación
    const handleDeleteUser = (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
        setUsers(users.filter(user => user.id !== id));
    };

    // Función para guardar cambios (Agregar o Editar usuario) - Modo Mock
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

            {/* Filtro por rol */}
            <label>Filtrar por rol:</label>
            <select onChange={(e) => setFilterRole(e.target.value)}>
                <option value="">Todos</option>
                <option value="Administrador">Administrador</option>
                <option value="General">General</option>
            </select>

            {/* Tabla de usuarios */}
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

            {/* Botón para agregar usuario */}
            <button className="add-user" onClick={handleAddUser}>➕ Añadir Usuario</button>

            {/* Modal para edición/creación */}
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