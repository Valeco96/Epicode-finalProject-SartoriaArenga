import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";
import BookingForm from "./BookingForm";
import "./components.css";

function SinglePiece({ piece, onClick }) {
  //Mostra l'immagine principale se é un array
  const previewImage = Array.isArray(piece.image)
    ? piece.image[0]
    : piece.image;

  return (
    <>
      <div
        className="card border-0 shadow-sm piece-card"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <div className="overflow-hidden rounded-3">
          <img
            src={previewImage}
            alt={piece.title}
            className="card-img-top piece-image"
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{piece.title}</h5>
          <p>{piece.description}</p>
          <p className="text-muted small mb-0">{piece.category}</p>
        </div>
      </div>
    </>
    // <>
    //   <Col sm={12} md={6} lg={3} className="mt-4">
    //     <Card
    //       className={
    //         "h-100" // + (isSelected ? "border border-3 border-danger" : "")
    //       }
    //     >
    //       <Card.Img
    //         // onClick={() => setSelected(isSelected ? null : book)}
    //         variant="top"

    //         style={{
    //           height: "300px",
    //           width: "100%",
    //           objectFit: "cover",
    //           cursor: "pointer",
    //         }}
    //       />
    //       <Card.Body className="d-flex flex-column">
    //         <Card.Title></Card.Title>
    //         <Card.Text>Prezzo:</Card.Text>
    //         <Link
    //           className="btn btn-outline-primary mt-auto"

    //         >
    //           Mostra dettagli
    //         </Link>
    //         {/*<Button
    //           //variat={selected ? "danger" : "success"}
    //           //  onClick={() => setSelected(isSelected ? null : book)}
    //           >
    //             {/*isSelected ? "Nascondi recensioni" : "Mostra recensioni"}
    //           </Button>*/}
    //       </Card.Body>
    //     </Card>
    //   </Col>
    //   <div className="container mt-5 text-custom-color d-sm-none d-md-block">
    //     <h2>
    //       <i class="fa-solid fa-tags"></i> Deal of the day
    //     </h2>
    //     <div class="card mb-3 border-color mt-5 shadow h-100">
    //       <div class="row g-0">
    //         <div class="col-md-7">
    //           <img
    //             src="https://lanai.it/wp-content/uploads/2024/05/irlanda-2.jpg"
    //             class="img-fluid rounded-start"
    //             alt="ireland-img"
    //           />
    //         </div>
    //         <div class="col-md-5">
    //           <div class="card-body d-flex flex-column">
    //             <h5 class="card-title mt-3">Ireland</h5>
    //             <p class="card-text mb-5 flex-column">
    //               Ireland is an island nation located on the westernmost edge of
    //               Europe. It's the second largest island in Europe, after Great
    //               Britain. The Republic of Ireland, also known as Ireland,
    //               occupies approximately 80% of the island, while the northern
    //               portion is part of the United Kingdom (Northern Ireland).
    //             </p>

    //             <p
    //               class="card-text mt-5 mb-5 flex-column"
    //               id="current-date"
    //             ></p>
    //             <div class="d-flex justify-content-between">
    //               <p class="opacity-8">Direct flights from</p>
    //               <p class="fs-5">
    //                 <strong>50€</strong>
    //               </p>
    //             </div>
    //             <p class="card-text mt-auto">
    //               <small class="text-body-secondary">
    //                 Last updated 3 mins ago
    //               </small>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <BookingForm />
    // </>
  );
}

export default SinglePiece;
