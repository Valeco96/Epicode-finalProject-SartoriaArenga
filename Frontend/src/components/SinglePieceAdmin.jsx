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
        className="card border-0 shadow-sm h-100"
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
        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title mb-4 fw-bold">Titolo: {piece.title}</h5>
          <p className="fst-italic mb-2 flex-grow-1">
            Descrizione: {piece.description}
          </p>
          <p className="mb-0">
            Categorie: {piece.category}, {piece.color}, {piece.fabric}
          </p>
          <div className="mt-auto"> 
            <Button
              style={{ backgroundColor: "#141f32" }}
              className="my-4 mx-3"
              onClick={() => handleEdit(piece._id)}
            >
              Modifica
            </Button>
            <Button
              className="my-4 mx-3"
              style={{ backgroundColor: "rgba(206, 78, 3, 1)" }}
              onClick={() => handleDelete(piece._id)}
            >
              Elimina
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePieceAdmin;
