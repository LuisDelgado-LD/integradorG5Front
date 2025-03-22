import { useEffect, useState } from "react";
import Modal from "../Components/Modal"; // Asegúrate de que la ruta sea correcta
import axios from "axios"

const UserManagement = () => {
    
    const { state } = useContext(GlobalContext);
    const { API_URL } = state;
    const [users, setUsers] = useState([]);
    // Estado para almacenar los usuarios con datos mockeados
    // const [users, setUsers] = useState([
    //     { id: 1, nombre: "Roger", apellido: "Mendez", email: "email@email.com", rol: "Administrador", estado: "Activo" },
    //     { id: 2, nombre: "Nombre", apellido: "Julian", email: "email@email.com", rol: "General", estado: "Inactivo" },
    //     { id: 3, nombre: "Julio Damian", apellido: "Melendez Mendez", email: "email@email.com", rol: "Administrador", estado: "Inactivo" },
    //     { id: 4, nombre: "Ryan", apellido: "Pomalaya", email: "email@email.com", rol: "Administrador", estado: "Activo" },
    //     { id: 5, nombre: "Jhonatan", apellido: "Rulios", email: "email@email.com", rol: "Administrador", estado: "Activo" }
    // ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filterRole, setFilterRole] = useState("");
    useEffect(() => {
        axios.get(`${API_URL}/${ENDPOINT_TODOS_LOS_USUARIOS}`)
        .then((response)=>{
            console.log(response.data)
            setUsers(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }),[];
    

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
            // setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...userData } : user)));
            axios.post(`${URL_ENDPOINT}/${selectedUser.id}`, userData)
            .then((response)=>{
                console.log(response.data)
                setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...userData } : user)));
            })
            .catch((error)=>{
                console.log(error)
            })
            
        } else {
            // const newUser = { id: users.length + 1, ...userData, rol: "General" };
            // setUsers([...users, newUser]);
            userData = {...userData, telefono: "12345667890", direccion: "gaviotas la casas"}
            axios.post(`${API_URL}/auth/register`, userData)
            .then((response)=>{
                console.log(response.data)
                setUsers([...users, { id: users.length + 1, ...userData }]);
            })
            .catch((error)=> {
                console.log(error)
            })
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
                            <th>email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.nombre + " " + user.apellido}</td>
                                <td>{user.email}</td>
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