function Home() {
  return (
    <div className="main-container">
      <section className="section">
        <h2>Buscar</h2>
        <input
          type="text"
          placeholder="Buscar por fecha disponible..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </section>

      <section className="section">
        <h2>Categoria</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button style={categoryButtonStyle}>Habitacion grande</button>
          <button style={categoryButtonStyle}>Habitacion mediana</button>
          <button style={categoryButtonStyle}>Habitacion pequeña</button>
        </div>
      </section>

      <section className="section">
        <h2>Recomendaciones</h2>
        <p>Explora los mejores planes recomendados para ti.</p>
      </section>
    </div>
  );
}

const categoryButtonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#535bf2",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
};

export default Home;