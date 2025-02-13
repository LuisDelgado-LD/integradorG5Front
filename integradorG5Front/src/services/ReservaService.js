const reservas = [
  { id: 1, habitacion: "01", cliente: "Juan Cuadra" },
  { id: 2, habitacion: "02", cliente: "Luis Delgado" },
];

const getReservas = () => {
  return Promise.resolve(reservas);
};

export default { getReservas };