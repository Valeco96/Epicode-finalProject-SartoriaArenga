import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SinglePiece from "../components/SinglePiece";
import "./pages.css";
import { Modal } from "react-bootstrap";
import { getAllPieces } from "../data/portfolio";

function PortfolioPage() {
  const [pieces, setPieces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tutte");
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [error, setError] = useState(null);

  const categories = [
    "Tutte",
    "giacca",
    "cappotto",
    "gilet",
    "smoking",
    "completo",
    "evento",
  ];
  const colors = ["blu", "grigio", "nero"];
  const fabrics = ["cotone", "100% lana", "flanella"];

  useEffect(() => {
    console.log("Fetching pieces..");
    let isMounted = true;

    async function fetchPieces() {
      try {
        const piecesFromApi = await getAllPieces();
        console.log("Pieces fetched from API:", piecesFromApi);
        if (isMounted) setPieces(piecesFromApi);
      } catch (error) {
        console.error("Errore nel fetch dei lavori:", error);
        setError("Errore nel recupero dei lavori.");
      }
    }
    fetchPieces();
    return () => {
      isMounted = false;
    };
  }, []);
  //   fetch("http://localhost:2000/api/portfolio")
  //     .then((response) => response.json())
  //     .then((data) => setPieces(data))
  //     .catch((error) =>
  //       console.error("Errore nel caricamento del Portfolio:", error)
  //     );
  // }, []);

  const filteredPieces =
    selectedCategory === "Tutte"
      ? pieces
      : pieces.filter((p) => p.category === selectedCategory);

  return (
    <>
      <div className="container py-5">
        {/*Header*/}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">Collezione</h1>
          <p className="text-muted">
            <em>
              Ogni capo è realizzato su misura, con attenzione ai dettagli e
              alla qualità dei materiali.
            </em>
          </p>
        </div>
        {/*Filtri*/}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${
                selectedCategory === cat ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {colors.map((col) => (
            <button
              key={col}
              onClick={() => setSelectedCategory(col)}
              className={`btn ${
                selectedCategory === col ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </button>
          ))}
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {fabrics.map((fab) => (
            <button
              key={fab}
              onClick={() => setSelectedCategory(fab)}
              className={`btn ${
                selectedCategory === fab ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              {fab.charAt(0).toUpperCase() + fab.slice(1)}
            </button>
          ))}
        </div>
        {/*Griglia lavori*/}
        <div id="cards-container" className="row g-4">
          <AnimatePresence>
            {pieces.map((piece) => (
              <motion.div
                key={piece._id}
                className="col-12 col-sm-6 col-md-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <SinglePiece
                  piece={piece}
                  onClick={() => setSelectedPiece(piece)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/*Nessun risultato*/}
        {filteredPieces.length === 0 && (
          <p className="text-center text-muted mt-4">
            Nessun lavoro trovato per questa categoria.
          </p>
        )}
        ;{/*Modal con Carosello*/}
        <Modal
          show={!!selectedPiece}
          onHide={() => setSelectedPiece(null)}
          centered
          size="lg"
        >
          {selectedPiece && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedPiece.title}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {Array.isArray(selectedPiece.image) ? (
                  <Carousel>
                    {selectedPiece.image.map((img, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={img}
                          alt={`${selectedPiece.title} ${index + 1}`}
                          className="d-block w-100 rounded"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <img
                    src={selectedPiece.image}
                    alt={selectedPiece.title}
                    className="img-fluid rounded mb-3"
                  />
                )}

                <div className="mt-3">
                  <p className="text-muted">{selectedPiece.description}</p>
                  <p>
                    <strong>Categoria:</strong> {selectedPiece.category}
                  </p>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedPiece(null)}
                >
                  Chiudi
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    </>
  );
}

export default PortfolioPage;
