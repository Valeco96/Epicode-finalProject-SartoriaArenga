import { Container } from "react-bootstrap";
import andrea from "../assets/Andrea-4.JPG";
import andrea2 from "../assets/Andrea-2.JPG"

function About() {
  return (
    <>
      <div className="banner-about">
        <h1 className="center-flex text-white big-title">Sartoria Arenga</h1>
      </div>
      <Container className="my-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <img
              alt="Andrea - Sartoria Arenga"
              src={andrea2}
              className="img-fluid rounded-4"
              style={{ height: "400px", width: "100%" }}
            />
          </div>

          <div className="col-12 col-md-6 mb-4 mb-md-0 p-5">
            <h2 className="mb-4 text-center" style={{ color: "#141f32" }}>
              Andrea Arenga
            </h2>
            <p>
              Nato a Napoli nel 1996. Dopo il diploma, inizia a lavorare come
              apprendista in una storica sartoria del centro di Napoli, dove per
              sei anni apprende le tecniche fondamentali del taglio e della
              confezione secondo la tradizione sartoriale napoletana, grazie
              alla guida del titolare e del team di maestri sarti.
              Successivamente, lavora per circa due anni in diverse sartorie
              della città, confrontandosi con nuovi metodi e approcci al
              mestiere.
            </p>
          </div>
        </div>
      </Container>

      <Container className="my-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0 p-5">
            <h2 className="mb-4 text-center" style={{ color: "#141f32" }}>
              Classicità ed eleganza
            </h2>
            <p>
              Trasferitosi poi a Milano, entra a far parte di un'importante
              maison di moda a livello internazionale, dove amplia la sua
              visione, apprendendo tecniche moderne e processi produttivi
              innovativi. <br />
              <br /> Nel 2023 fa ritorno a Napoli per fondare la propria
              sartoria nel cuore della città, unendo la classicità e l’eleganza
              della tradizione napoletana a una visione più contemporanea del su
              misura. Oggi, la sua Sartoria rappresenta un punto di riferimento
              per chi cerca capi artigianali curati in ogni dettaglio,
              realizzati con passione, dedizione e stile.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <img
              alt="Andrea - Sartoria Arenga"
              src={andrea}
              className="img-fluid rounded-4"
              style={{ height: "400px", width: "100%" }}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default About;
