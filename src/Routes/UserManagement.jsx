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

import { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import SoloEscritorio from "../Components/SoloEscritorio"; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosConIds = usuariosGuardados.map((u, i) => ({
      id: i + 1,
      ...u,
      rol: u.rol || "General",
      estado: u.estado || "Inactivo"
    }));
    setUsers(usuariosConIds);
  }, []);

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
    const updated = users.filter(user => user.id !== id);
    setUsers(updated);
    localStorage.setItem("usuarios", JSON.stringify(updated));
  };

  const handleSave = (userData) => {
    let updatedUsers;

    if (selectedUser) {
      updatedUsers = users.map(user =>
        user.id === selectedUser.id ? { ...user, ...userData } : user
      );
    } else {
      const newUser = {
        id: users.length + 1,
        ...userData,
        rol: "General",
        estado: "Inactivo"
      };
      updatedUsers = [...users, newUser];
    }

    setUsers(updatedUsers);
    localStorage.setItem("usuarios", JSON.stringify(updatedUsers));
    setModalOpen(false);
  };

  return (
    <SoloEscritorio> 
      <div className="user-management-page">
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
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nombre} {user.apellido}</td>
                    <td>{user.correo}</td>
                    <td>{user.rol}</td>
                    <td>{user.estado}</td>
                    <td className="actions">
                      <button className="edit" onClick={() => handleEdit(user)}>🖊️</button>
                      <button className="delete" onClick={() => handleDeleteUser(user.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="add-user" onClick={handleAddUser}>➕ Añadir Usuario</button>

          {modalOpen && (
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onSave={handleSave}
              initialData={selectedUser}
            />
          )}
        </div>
      </div>
    </SoloEscritorio>
  );
};

export default UserManagement;