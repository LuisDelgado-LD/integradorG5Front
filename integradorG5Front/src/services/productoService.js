export const getProductos = async () => {
  const response = await fetch(" http://localhost:5173/api/producto");
  return response.json();
};