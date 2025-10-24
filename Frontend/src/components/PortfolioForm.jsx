import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Alert, Spinner } from "react-bootstrap";
import {
  createPiece,
  editPiece,
  getSinglePiece,
  updateImage,
} from "../data/portfolio"; // importa le funzioni API corrette
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

function PortfolioForm() {
  const { id } = useParams();
  const isEdited = !!id; //true se si tratta di modifica del lavoro
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    color: "",
    fabric: "",
    season: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pieces, setPieces] = useState([]);

  const categories = ["giacca", "abito", "gilet", "pantalone", "cappotto"];
  const colors = [
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
    "cotone",
    "lino",
    "lana/lino/seta",
    "lana/lino",
    "lana",
    "cachemire",
    "lana/cachemire",
  ];
  const seasons = ["quattro stagioni", "estate", "inverno"];

  //Precompilazione dei dati se è in fase di modifica
  useEffect(() => {
    if (isEdited && token) {
      const fetchData = async () => {
        try {
          const data = await getSinglePiece(id, token);

          setFormData({
            title: data.title || "",
            description: data.description || "",
            category: data.category || "",
            color: data.color || "",
            fabric: data.fabric || "",
            season: data.season || "",
          });
        } catch (error) {
          setError("Errore nel caricamento del lavoro.");
        }
      };
      fetchData();
    }
  }, [id, isEdited, token]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = async (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    if (isEdited && selectedImage) {
      try {
        setLoading(true);
        setMessage("");
        setErrorMessage("");

        const response = await updateImage(id, selectedImage, token);
        setMessage("Immagine aggiornata con successo!");
      } catch (error) {
        setErrorMessage("Errore nell'aggiornamento dell'immagine");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setMessage("");

    try {
      //Creazione di un FormData per inviare tutto insieme
      const formToSend = new FormData();

      for (const key in formData) {
        formToSend.append(key, formData[key]);
      }
      if (image) {
        formToSend.append("image", image);
      }
      //Sceglie tra POST e PUT
      let responseData;

      if (isEdited) {
        responseData = await editPiece(id, formToSend, token);

        setMessage("Lavoro modificato con successo!");
      } else {
        responseData = await createPiece(formToSend, token);
        setMessage("Lavoro creato con successo!");
      }

      alert(
        isEdited
          ? "Lavoro modificato con successo!"
          : "Lavoro creato con successo!"
      );
      navigate("/portfolio");
    } catch (error) {
      setMessage("Errore nel caricamento del lavoro.");
    } finally {
      setLoading(false);
    }
  };

  //Reset form
  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      color: "",
      fabric: "",
      season: "",
    });
    setImage(null);
    setMessage("");
    setErrorMessage("");
  };

  return (
    <>
      <div className="portfolio-form-wrapper">
        <div className="pf-container py-5">
          <h1 className="mb-4 text-center fw-bold">Form Portfolio</h1>

          {message && (
            <Alert className="text-center" variant="success">
              {message}
            </Alert>
          )}
          {errorMessage && (
            <Alert className="text-center" variant="danger">
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="p-5 wrapper">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Titolo del lavoro:</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Descrizione:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Descrizione - min. 10 caratteri"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Categoria:</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option>Scegli tra le categorie</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Colore:</Form.Label>
              <Form.Select
                name="color"
                value={formData.color}
                onChange={handleChange}
              >
                <option value="">Scegli tra i colori</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Tessuto:</Form.Label>
              <Form.Select
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
              >
                <option value="">Scegli tra i tessuti</option>
                {fabrics.map((fabric) => (
                  <option key={fabric} value={fabric}>
                    {fabric}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Stagione:</Form.Label>
              <Form.Select
                name="season"
                value={formData.season}
                onChange={handleChange}
              >
                <option value="">Scegli la stagione</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Immagine:</Form.Label>
              <Form.Control
                type="file"
                placeholder="Carica foto"
                onChange={handleChangeImage}
              />
            </Form.Group>

            <div className="d-flex gap-4 mt-5  flex-wrap justify-content-center">
              <Button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#141f32" }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Salva"}
              </Button>
              <Button
                variant="warning"
                type="button"
                onClick={handleReset}
                style={{
                  backgroundColor: "rgb(255, 115, 34)",
                  color: "#FFFFFF",
                }}
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PortfolioForm;
