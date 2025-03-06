const Footer = () => {
    return (
    <footer className="footer">
        <div className="footer-CopyRight">
            <img src="/img/ImagenFooter.png" alt="Footer Logo" />
            <small>Copyright © 2025 Pet Paradise S.A.</small>
            <small>Todos los derechos reservados.</small>
        </div>
        <div className="RedesSociales">
            <small>Español</small>
            <small>$ COP</small>

            <a href="https://www.facebook.com" target="_blank" title="Visita nuestra página de Facebook">
                <img src="/img/Facebook.png" alt="Facebook Logo"/>
            </a>
            <a href="https://www.Instagram.com" target="_blank" title="Visita nuestro Instagram">
                <img src="/img/Instagram.png" alt="Instagram Logo" />
            </a>
            <a href="https://www.X.com" target="_blank" title="Visita nuestra página en X">
                <img src="/img/X.png" alt="X Logo" />
            </a>
        </div>
    </footer>
    )
}

export default Footer;
