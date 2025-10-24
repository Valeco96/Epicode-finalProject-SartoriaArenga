import BookingForm from "../components/BookingForm";
import clienteSpecchio from "../assets/IMG_3740.jpeg";
import { Container } from "react-bootstrap";

function RichiediAppuntamento() {
  return (
    <>
      <div className="banner-appuntamento center-flex p-4">
        <h1 className="text-align-center big-title text-white">
          <span>Richiedi un appuntamento</span>
          <br />
          <span className="text-white medium-title">
            Vieni a trovarci nei Quartieri Spagnoli
          </span>
        </h1>
      </div>

      <Container className="my-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h2
              className="mb-4 text-center fw-bold"
              style={{ color: "#141f32" }}
            >
              Prenota un Appuntamento
            </h2>
            <div className="bf-container">
              <BookingForm />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <img
              alt="cliente prova giacca allo specchio"
              src={clienteSpecchio}
              className="img-fluid rounded-4"
            />
          </div>
        </div>
      </Container>

      <Container className="my-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.1013600372657!2d14.247921199999999!3d40.84000249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b08510ed6cc35%3A0x270569c7c2e5ccf5!2sVico%20Lungo%20del%20Gelso%2C%2066%2C%2080132%20Napoli%20NA%2C%20Italia!5e1!3m2!1sit!2snl!4v1760901769039!5m2!1sit!2snl"
              style={{
                border: 0,
                borderRadius: "20px",
                width: "100%",
                height: "350px",
              }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="col-12 col-md-6" style={{ color: "#141f32" }}>
            <h2>Sartoria Arenga</h2>
            <h3>Nei Quartieri Spagnoli</h3>
            <p className="mt-4">
              Vico Lungo del Gelso 66 Napoli- Italia
              <br />
              sartoria.arenga@gmail.com
              <br />
              0039 resto del numero
            </p>
          </div>{" "}
        </div>
      </Container>
    </>
  );
}

export default RichiediAppuntamento;
