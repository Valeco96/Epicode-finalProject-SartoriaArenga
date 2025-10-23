import { useEffect, useState } from "react";
import PortfolioForm from "../components/PortfolioForm";
import { getAllPieces } from "../data/portfolio";
import { Col, Container, Row } from "react-bootstrap";
import SinglePieceAdmin from "../components/SinglePieceAdmin";

function AdminPortfolio() {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching pieces...");
    let isMounted = true; // flag per evitare aggiornamenti su component smontato

    async function fetchPieces() {
      try {
        const piecesFromApi = await getAllPieces();
        console.log("Pieces fetched from API: ", piecesFromApi);
        if (isMounted) setPieces(piecesFromApi);
      } catch (error) {
        console.error("Errore nel fetch dei lavori:", error);
        setError("Errore nel recupero dei lavori.");
      }
    }

    fetchPieces();

    return () => {
      isMounted = false; //impedisce duplicati durante double-mount in dev
    };
  }, []);

  return (
    <>
      {/* <PortfolioForm
        selectedPiece={selectedPiece}
        onFinishEdit={() => setSelectedPiece(null)}
      /> */}

      {/*Griglia lavori*/}
      <Container className="mb-4">
        <h1 className="my-5 p-3 fw-bold">Storico dei lavori pubblicati</h1>
        <Row className="align-items-stretch">
          {pieces && pieces.length === 0 && <p>Nessun lavoro disponibile</p>}
          {pieces &&
            pieces.map((piece) => (
              <Col key={piece._id} className="mb-4" sm={12} md={6} lg={4}>
                <SinglePieceAdmin
                  key={piece.asin}
                  piece={piece}
                  handleEdit={setSelectedPiece}
                />
              </Col>
            ))}
        </Row>
      </Container>

      {/* <div id="cards-container-adminportfolio" className="row g-4">
        {filteredPieces.map((piece) => (
          <option key={piece._id} className="col-12 col-sm-6 col-md-4">
            <SinglePiece
              piece={piece}
              onClick={() => setSelectedPiece(piece)}
            />
          </option>
        ))}
      </div> */}
    </>
  );
}

export default AdminPortfolio;
