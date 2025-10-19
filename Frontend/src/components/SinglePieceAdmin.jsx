import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./components.css";
import { useEffect, useState } from "react";
import { deletePiece } from "../data/portfolio";

function SinglePieceAdmin({ piece, onClick }) {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (isDeleted) {
      alert("Il lavoro è stato elminato");
      navigate("/portfolio");
    }
  }, [isDeleted, navigate]);

  const handleEdit = () => {
    navigate(`/PortfolioForm/${piece._id}`); //naviga al form per modificare il post
  };

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro di voler eliminare questo lavoro?")) return;
    try {
      //qui da mettere autenticazione token quendo la dobbiamo inserire
      const response = await deletePiece(piece._id); //da aggiungere anche il token quando faremo tutto loggato
      if (response) {
        setIsDeleted(true);
      } else {
        alert("Errore nell'eliminazione del lavoro.");
      }
    } catch (error) {
      console.error(error);
      alert("Errore nella richiesta di eliminazione del lavoro.");
    }
  };

  return (
    <>
      <div
        className="card border-0 shadow-sm"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <div className="overflow-hidden rounded-3">
          <img
            src={piece.image}
            alt={piece.title}
            className="card-img-top piece-image-admin"
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">Titolo: {piece.title}</h5>
          <p>Descrizione: {piece.description}</p>
          <p className="mb-0">
            Categorie: {piece.category}, {piece.color}, {piece.fabric}
          </p>
          <p>Visibile sul sito: {piece.visible}</p>
          <Button
            variant="warning"
            className="me-2"
            onClick={() => handleEdit(piece._id)}
          >
            Modifica
          </Button>
          <Button variant="danger" onClick={() => handleDelete(piece._id)}>
            Elimina
          </Button>
        </div>
      </div>
    </>
  );
}

export default SinglePieceAdmin;
