import BookingForm from "../components/BookingForm";
import { Link } from "react-router";
import logoTrasparenteBianco from "../assets/logo-bianco.png";
import { useEffect, useRef, useState } from "react";
import "./pages.css";

function Homepage() {
  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); //Fa in modo che non osservi il comando dopo il primo utilizzo
        }
      },
      { threshold: 0.2 } // Visiblile quando il 20% del form é nello schermo
    );
    if (formRef.current) observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <div className="banner-homepage">
        <img
          src={logoTrasparenteBianco}
          style={{ width: "250px", height: "200px" }}
        />
      </div>
      <div className="py-4" style={{ color: "#141f32" }}>
        <h1 className=" py-5 px-2">
          Sartoria artigianale su misura nel cuore di Napoli
        </h1>
        <div className="d-flex justify-content-center">
          <div className="d-flex button-navy-background align-items-center my-3">
            <a onClick={scrollToForm}>Prenota un appuntamento</a>
          </div>
        </div>
      </div>

      <div
        className="mt-5 section-fullwidth"
        style={{ backgroundColor: "#141f36" }}
      >
        <div className="section-flex">
          <div className="text-box">
            <h2 className="pb-5 text-white">Su misura</h2>
            <p className="pb-5 px-5 text-white">
              <strong>La giacca Arenga,</strong> realizzata interamente a mano a
              Napoli, rappresenta l’eccellenza del{" "}
              <strong>vero bespoke napoletano.</strong> Ogni dettaglio, dalla
              spalla “a camicia” alla doppia impuntura a mano, segue i
              tradizionali passaggi sartoriali. Un capo unico, leggero e
              impeccabile, pensato per adattarsi perfettamente a chi lo indossa.
            </p>
            <div className="d-flex justify-content-center button-padding">
              <Link
                to="/tradizione-napoletana"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex button-white-background align-items-center">
                  <span style={{ color: "#141f36", fontWeight: 600 }}>
                    Scopri di più
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="image-box tassello-homepage-1"></div>
        </div>
      </div>

      <div className=" section-fullwidth">
        <div className="section-flex">
          <div className="image-box tassello-homepage-2"></div>
          <div className="text-box">
            <h2 className="pb-5">La Sartoria</h2>
            <p className="pb-5 px-5">
              La Sartoria Arenga, fondata a Napoli da Andrea Arenga nel 2023,
              unisce la raffinatezza della tradizione sartoriale napoletana a
              un’eleganza moderna e contemporanea. Frutto di anni di esperienza
              tra le migliori sartorie di Napoli e una maison internazionale a
              Milano, offre capi su misura curati in ogni dettaglio. È oggi un
              punto di riferimento per chi cerca artigianalità, stile e
              autenticità.
            </p>
            <div className="d-flex justify-content-center button-padding">
              <Link to="/about" style={{ textDecoration: "none" }}>
                <div className="d-flex button-navy-background align-items-center">
                  <span style={{ fontWeight: 600 }}>La mia storia</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section-fullwidth" style={{ backgroundColor: "#141f36" }}>
        <div className="section-flex">
          <div className="text-box">
            <h2 className="pb-5 text-white">Portfolio</h2>
            <p className="pb-5 px-5 text-white">
              Ogni creazione racconta una storia di dedizione, stile e
              tradizione sartoriale. Nel portfolio troverai una selezione di
              capi realizzati su misura, dove ogni punto, tessuto e dettaglio
              rispecchia l’essenza del vero “su misura” napoletano.
            </p>
            <div className="d-flex justify-content-center button-padding">
              <Link to="/portfolio" style={{ textDecoration: "none" }}>
                <div className="d-flex button-white-background align-items-center">
                  <span style={{ color: "#141f36", fontWeight: 600 }}>
                    Esplora i nostri lavori
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="image-box tassello-homepage-3"></div>
        </div>
      </div>

      <div
        ref={formRef}
        className={`py-3 appuntamento-form-wrapper fade-section ${
          isVisible ? "visible" : ""
        }`}
        style={{ color: "#141f36" }}
      >
        <h2 className="mb-5 pt-5 fw-bold text-center">
          Prenota un Appuntamento
        </h2>
        <div className="pf-container">
          <BookingForm />
        </div>
      </div>
    </main>
  );
}

export default Homepage;
