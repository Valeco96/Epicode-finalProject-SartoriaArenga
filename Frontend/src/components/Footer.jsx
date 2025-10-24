import "./components.css";

function Footer() {
  return (
    <>
      <footer className="">
        <section className="grid grid-3-col">
          <div>
            <h3>Informazioni</h3>
            <ul>
              <li>Vico Lungo del Gelso 66, Napoli - Italia</li>
              <li>
                Email:
                <a href="mailto:sartoria.arenga@gmail">
                  sartoria.arenga@gmail.com
                </a>
              </li>
              <li>
                Whatsapp: <a href="tel:+393335603412">0039 333 5603412</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Aspetti legali</h3>
            <ul>
              <li>Privacy policy</li>
              <li>Cookie policy</li>
              <li>Termini e condizioni</li>
            </ul>
          </div>
          <div>
            <h3>Social Network</h3>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/sartoria_arenga/"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </section>
        <div className="bottom-text">
          <p>All rights reserved at SARTORIA ARENGA</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
