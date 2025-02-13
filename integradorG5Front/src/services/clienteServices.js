export const getClientes = async () => {
    try {
      const response = await fetch("http://localhost:5173/api/producto"); 
      return await response.json();
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      return [];
    }
  };