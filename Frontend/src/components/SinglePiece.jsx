import { Button } from "react-bootstrap";
import "./components.css";

function SinglePiece({ piece, onClick }) {
  //Mostra l'immagine principale se è  un array
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
        </div>
      </div>
    </>
  );
}

export default SinglePiece;
