import { useContext } from "react";
import Card from "../Components/Card";
import { GlobalContext } from "../Context/utils/globalContext";

const Home = () => {
  const { state } = useContext(GlobalContext);

  return (
    <main className="home">
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