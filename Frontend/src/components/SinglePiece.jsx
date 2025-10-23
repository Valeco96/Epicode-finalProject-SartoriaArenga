import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";
import BookingForm from "./BookingForm";
import "./components.css";
import { Button } from "react-bootstrap";

function SinglePiece({ piece, onClick }) {
  //Mostra l'immagine principale se é un array
  const previewImage = Array.isArray(piece.image)
    ? piece.image[0]
    : piece.image;

  return (
    <>
      <div
        className="card border-0 shadow-sm piece-card h-100"
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
        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title fw-bold mb-4">{piece.title}</h5>
          <p className="flex-grow-1 mb-3">{piece.description}</p>
          <p className="text-muted small mb-0">
            Caratteristiche: {piece.category} {piece.color} {piece.fabric}{" "}
            {piece.season}
          </p>
          <div className="mt-auto">
            <Button className="my-4" style={{ backgroundColor: "#141f36" }}>
              OMG deve essere mia!
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePiece;
