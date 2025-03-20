const SoloEscritorio = ({ children }) => {
  const esMovil = window.innerWidth <= 768;

  if (esMovil) {
    return (
      <div className="bloqueo-movil">
        <p>🚫 Esta página no está disponible para móviles.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default SoloEscritorio;