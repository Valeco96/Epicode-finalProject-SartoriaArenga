import BookingForm from "../components/BookingForm";
import coverGalleria from "../assets/cover-galleria.jpeg";
import logoTrasparenteBianco from "../assets/logo-bianco.png";
import jacketSide from "../assets/home-side.jpeg";
import "./pages.css";
import { Container } from "react-bootstrap";

function Homepage() {
  return (
    <main>
      <div className="banner-homepage">
        <img
          src={logoTrasparenteBianco}
          style={{ width: "250px", height: "200px" }}
        />
      </div>
      <div style={{ color: "#141f32" }}>
        <h1 className=" py-5">
          Sartoria artigianale su misura nel cuore di Napoli
        </h1>
        <div className="d-flex justify-content-center">
          <div className="d-flex button-navy-background align-items-center">
            <a target="_self">Prenota un appuntamento</a>
          </div>
        </div>
      </div>

      <div className="mt-5" style={{ backgroundColor: "#141f32" }}>
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h2 className="pb-5 text-white">Su misura</h2>
            <p className="pb-5 text-white">
              We offer a true handmade suit and bespoke service all over the
              world. When a garment is sewn by hand, its component pieces move
              with greater freedom, providing more flexibility and range of
              motion in the finished garment. Feel for yourself the luxury of a
              handmade bespoke suit. Non sembra andare oltre.
            </p>
            <div className="d-flex align-items-center justify-content-evenly py-4 flex-wrap">
              <div className="d-flex justify-content-center">
                <div className="d-flex button-navy-background align-items-center">
                  <a target="_self">Dai uno sguardo ai lavori</a>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="d-flex button-navy-background align-items-center">
                  <a target="_self">Prenota un appuntamento</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="tassello-homepage-1"></div>
          </div>
        </div>
      </div>

      <div>
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="tassello-homepage-2"></div>
          </div>
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h2 className="pb-5">L'ispirazione alla tradizione napoletana</h2>
            <p className="pb-5">
              We offer a true handmade suit and bespoke service all over the
              world. When a garment is sewn by hand, its component pieces move
              with greater freedom, providing more flexibility and range of
              motion in the finished garment. Feel for yourself the luxury of a
              handmade bespoke suit. Non sembra andare oltre.
            </p>
            <div className="d-flex align-items-center justify-content-evenly py-4 flex-wrap">
              <div className="d-flex justify-content-center">
                <div className="d-flex button-navy-background align-items-center">
                  <a target="_self">Dai uno sguardo ai lavori</a>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="d-flex button-navy-background align-items-center">
                  <a target="_self">Prenota un appuntamento</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* 
      <div className="mb-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-4">
            <div className="tassello-homepage-1"></div>
          </div>
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h2 className="pb-5">L'ispirazione alla tradizione napoletana</h2>
            <p className="pb-5">
              We offer a true handmade suit and bespoke service all over the
              world. When a garment is sewn by hand, its component pieces move
              with greater freedom, providing more flexibility and range of
              motion in the finished garment. Feel for yourself the luxury of a
              handmade bespoke suit. Non sembra andare oltre.
            </p>
            <div className="d-flex align-items-center justify-content-evenly py-4 flex-wrap">
              <div className="d-flex justify-content-center">
                <div className="d-flex button-navy-background align-items-center">
                  <a target="_self">Dai uno sguardo ai lavori</a>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="d-flex button-navy-background align-items-center">
                  <a target="_self">Prenota un appuntamento</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="tassello-homepage-3"></div>
          </div>
        </div>
      </div> */}

      <div className="d-flex align-items-center">
        <div style={{ border: "1px solid black", borderRadius: "50%" }}></div>
      </div>
      <div className="text-white py-3" style={{ backgroundColor: "#141f32" }}>
        <h2 className="mb-4 pt-5 text-center">
          📅 Prenota un Appuntamento
        </h2>
        <BookingForm />
      </div>
    </main>
  );
}

export default Homepage;
