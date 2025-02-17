import { useContext } from "react";
import Card from "../Components/Card";
import { GlobalContext } from "../Context/utils/globalContext";

const Home = () => {
  const { state } = useContext(GlobalContext);

  return (
    <main className="home">
      <div className="header-container">
        <p className="header-text">Escoge la Fecha para tu peludito</p>
        
        <div className="date-picker-container">
          <div className="date-picker">
            <label className="date-label">Fecha de ingreso</label>
            <img src="/img/Group_4.png" alt="Calendario de ingreso" className="calendar-box" />
            <img src="/img/calendario.png" alt="Ícono calendario" className="calendar-icon" />
          </div>

          <div className="date-picker">
            <label className="date-label">Fecha salida</label>
            <img src="/img/Group_4.png" alt="Calendario de salida" className="calendar-box" />
            <img src="/img/calendario.png" alt="Ícono calendario" className="calendar-icon" />
          </div>

          <img src="/img/buscar.png" alt="Botón Buscar" className="search-button" />
        </div>
      </div>

      <h1>Mascotas registradas</h1>
      <div className="card-grid">
        {state.mascotas.slice(0, 10).map((mascota) => (
          <Card key={mascota.id} {...mascota} />
        ))}
      </div>
    </main>
  );
};

export default Home;