import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SinglePiece from "../components/SinglePiece";
import "./pages.css";
import { Modal } from "react-bootstrap";
import { getAllPieces } from "../data/portfolio";

function PortfolioPage() {
  const [pieces, setPieces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tutte");
  const [selectedColor, setSelectedColor] = useState("Tutti");
  const [selectedFabric, setSelectedFabric] = useState("Tutti");
  const [selectedSeason, setSelectedSeason] = useState("quattro stagioni");
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [error, setError] = useState(null);

  //Categorie, colori e tessuti
  const categories = [
    "Tutte",
    "giacca",
    "abito",
    "gilet",
    "pantalone",
    "cappotto",
  ];
  const colors = [
    "Tutti",
    "bianco",
    "beige",
    "grigio",
    "azzurro",
    "blu",
    "arancione",
    "rosso",
    "borgogna",
    "marrone",
  ];
  const fabrics = [
    "Tutti",
    "cotone",
    "lino",
    "lana/lino/seta",
    "lana/lino",
    "lana",
    "cachemire",
    "lana/cachemire",
  ];
  const seasons = ["quattro stagioni", "estate", "inverno"];

  //Fetch dati dal portfolio
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

  //Filtro combinato
  const filteredPieces = pieces.filter((p) => {
    //console.log(p.category, selectedCategory);
    const matchCategory =
      selectedCategory === "Tutte" ||
      (Array.isArray(p.category) &&
        p.category.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
        ));
    const matchColor =
      selectedColor === "Tutti" ||
      (Array.isArray(p.color) &&
        p.color.some(
          (col) => col.toLowerCase() === selectedColor.toLowerCase()
        ));
    const matchFabric =
      selectedFabric === "Tutti" ||
      (Array.isArray(p.fabric) &&
        p.fabric.some(
          (fab) => fab.toLowerCase() === selectedFabric.toLowerCase()
        ));
    const matchSeason =
      selectedSeason === "quattro stagioni" ||
      (Array.isArray(p.season) &&
        p.season.some(
          (sea) => sea.toLowerCase() === selectedSeason.toLowerCase()
        ));
    return matchCategory && matchColor && matchFabric && matchSeason;
  });

  return (
    <>
      <div className="container py-5" style={{ color: "#141f36" }}>
        {/*Header*/}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-3 big-title">Collezione</h1>
          <p className="text-muted">
            <em>
              Ogni capo è realizzato su misura, con attenzione ai dettagli e
              alla qualità dei materiali.
            </em>
          </p>
        </div>
        {/*Filtri*/}
        <div className="portfolio-filter-parent mb-5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="portfolio-filters"
          >
            <option value="Tutte">Categorie per capo</option>
            <option value="giacca">Giacca</option>
            <option value="abito">Abito</option>
            <option value="gilet">Gilet</option>
            <option value="pantalone">Pantalone</option>
            <option value="cappotto">Cappotto</option>
          </select>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="portfolio-filters"
          >
            <option value="Tutti">Tutti i colori</option>
            <option value="bianco">Bianco</option>
            <option value="beige">Beige</option>
            <option value="grigio">Grigio</option>
            <option value="azzurro">Azzurro</option>
            <option value="blu">Blu</option>
            <option value="arancione">Arancione</option>
            <option value="rosso">Rosso</option>
            <option value="borgogna">Borgogna</option>
            <option value="marrone">Marrone</option>
          </select>
          <select
            value={selectedFabric}
            onChange={(e) => setSelectedFabric(e.target.value)}
            className="portfolio-filters"
          >
            <option value="Tutti">Tutti i tessuti</option>
            <option value="cotone">Cotone</option>
            <option value="lino">Lino</option>
            <option value="lana/lino/seta">Lana/Lino/Seta</option>
            <option value="lana/lino">Lana/Lino</option>
            <option value="lana">Lana</option>
            <option value="cachemire">Cachemire</option>
            <option value="lana/cachemire">Lana/Cachimere</option>
          </select>

          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="portfolio-filters"
          >
            <option value="quattro stagioni">Tutte le stagioni</option>
            <option value="estate">Estate</option>
            <option value="inverno">Inverno</option>
          </select>
        </div>
        {/* <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {colors.map((col) => (
            <button
              key={col}
              onClick={() => setSelectedColor(col)}
              className={`btn ${
                selectedColor === col ? "btn-dark" : "btn-outline-secondary"
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
              onClick={() => setSelectedFabric(fab)}
              className={`btn ${
                selectedFabric === fab ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              {fab.charAt(0).toUpperCase() + fab.slice(1)}
            </button>
          ))}
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {seasons.map((sea) => (
            <button
              key={sea}
              onClick={() => setSelectedSeason(sea)}
              className={`btn ${
                selectedSeason === sea ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              {sea.charAt(0).toUpperCase() + sea.slice(1)}
            </button>
          ))}
        </div> */}
        {/*Griglia lavori*/}
        <div id="cards-container" className="row g-4 mb-5 mt-2">
          <AnimatePresence>
            {filteredPieces.map((piece) => (
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
        {/* Modal con Carosello
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
        </Modal> */}
      </div>
    </>
  );
}

export default PortfolioPage;
