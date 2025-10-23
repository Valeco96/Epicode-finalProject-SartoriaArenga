import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Alert, Spinner } from "react-bootstrap";
import {
  createPiece,
  editPiece,
  getAllPieces,
  getSinglePiece,
} from "../data/portfolio"; // importa le funzioni API corrette
import { useNavigate, useParams } from "react-router";
import SinglePieceAdmin from "./SinglePieceAdmin";

function PortfolioForm() {
  const { id } = useParams();
  const isEdited = !!id; //true se stiamo modificando il <lavoro />
  const navigate = useNavigate();

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

  //Precompilazione dei dati se stiamo modificando
  useEffect(() => {
    if (isEdited) {
      const fetchData = async () => {
        try {
          const data = await getSinglePiece(id); //da inserire anche il token om im secondo momento
          console.log("Lavoro ricevuto", data);

          if (!data) {
            console.error("Nessun lavoro trovato.");
            return;
          }

          setFormData({
            title: data.title || "",
            description: data.description || "",
            category: data.category || "",
            color: data.color || "",
            fabric: data.fabric || "",
            season: data.season || "",
          });
        } catch (error) {
          console.error("Errore nel caricamento del lavoro:", error);
        }
      };
      fetchData();
    }
  }, [id, isEdited]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      //Creo un FormData per inviare tutto insieme
      const formToSend = new FormData();

      for (const key in formData) {
        formToSend.append(key, formData[key]);
      }

      if (image) {
        formToSend.append("image", image);
      }

      //Scelgo il metodo corretto (POST o PUT)
      let response;
      if (!isEdited) {
        response = await fetch("http://localhost:2000/api/portfolio", {
          method: "POST",
          body: formToSend, // ❗ niente headers JSON qui
        });
      } else {
        response = await fetch(`http://localhost:2000/api/portfolio/${id}`, {
          method: "PUT",
          body: formToSend,
        });
      }

      //Gestione della risposta
      if (!response.ok) {
        throw new Error("Errore nella creazione o modifica del lavoro.");
      }

      const data = await response.json();
      console.log("Lavoro salvato:", data);

      alert(
        isEdited
          ? "Lavoro modificato con successo!"
          : "Lavoro creato con successo!"
      );
      navigate("/portfolio");
    } catch (error) {
      console.error("Errore nel caricamento del lavoro:", error);
      setMessage("Errore nel caricamento del lavoro.");
    } finally {
      setLoading(false);
    }

    // try {
    //   let data;

    //   if (!isEdited) {
    //     const response = await createPiece(formData);
    //     data = response;
    //     console.log("Lavoro creato:", data);
    //     alert("Lavoro creato con successo!");
    //     navigate("/portfolio");
    //   } else {
    //     const response = await editPiece(id, formData);
    //     data = response;
    //     console.log("Lavoro modificato:", data);
    //     alert("Lavoro modificato con successo!");
    //     navigate("/portfolio");
    //   }

    //   //Aggiornamento dell'immagine
    //   if (image) {
    //     const formImage = new FormData();
    //     formImage.append("image", image);

    //     const imageRes = await fetch(
    //       `http://localhost:2000/api/portfolio/${data._id}/image`,
    //       {
    //         method: "PATCH",
    //         body: formImage,
    //       }
    //     );

    //     if (!imageRes.ok)
    //       throw new Error("Errore nell'aggiornamento dell'immagine.");
    //     const imageData = await imageRes.json();
    //     setFormData((prev) => ({ ...prev, image: imageData.image }));
    //     setMessage("Immagine aggiornata con successo!");
    //   }
    // } catch (error) {
    //   console.error("Errore nel caricamento del lavoro:", error);
    //   setMessage("Errore nel caricamento del lavoro.");
    // }
  };

  //Reset form
  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      color: "",
      fabric: "",
    });
    setImage(null);
    setMessage("");
    setErrorMessage("");
  };

  // useEffect(() => {
  //   console.log("Fetching pieces...");
  //   let isMounted = true; // flag per evitare aggiornamenti su component smontato

  //   async function fetchPieces() {
  //     try {
  //       const piecesFromApi = await getAllPieces();
  //       console.log("Pieces fetched from API: ", piecesFromApi);
  //       if (isMounted) setPieces(piecesFromApi);
  //     } catch (error) {
  //       console.error("Errore nel fetch dei lavori:", error);
  //       setError("Errore nel recupero dei lavori.");
  //     }
  //   }

  //   fetchPieces();

  //   return () => {
  //     isMounted = false; //impedisce duplicati durante double-mount in dev
  //   };
  // }, []);

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
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            {/* <Form.Group className="mb-4">
            <Form.Check
              name="visible"
              type="checkbox"
              label="Visibile nel portfolio"
              checked={formData.visible}
              onChange={(e) =>
                setFormData({ ...formData, visible: e.target.checked })
              }
            />
          </Form.Group> */}

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

      {/* Griglia lavori
      <Container>
        <h2 className="p-4">Storico dei lavori pubblicati</h2>
        <Row className="align-items-stretch">
          {pieces && pieces.length === 0 && <p>Nessun lavoro disponibile</p>}
          {pieces &&
            pieces.map((piece) => (
              <Col key={piece._id} className="mb-4" sm={12} md={6} lg={4}>
                <SinglePieceAdmin key={piece.asin} piece={piece} />
              </Col>
            ))}
        </Row>
      </Container> */}
    </>
  ); //FINE FORM ORIGINALE
}

export default PortfolioForm;

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("Scegli tra le categorie");
//   const [image, setImage] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const categories = [
//     "stile",
//     "quotidiano",
//     "evento",
//     "matrimonio",
//     "giacca",
//     "pantalone",
//     "completo",
//   ];

//   const manageSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Mi hai submittato");

//     //validazione
//     if (!title || !image) {
//       return setErrorMessage(
//         "I campi titolo e immagine devono essere compilati"
//       );
//     }

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append(
//         "categories",
//         category === "Scegli tra le categorie" ? "" : category
//       );
//       formData.append("visible", visible);
//       formData.append("image", image);

//       const response = await fetch("http://localhost:2000/api/portfolio", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         throw new Error("Errore durante la creazione del lavoro.");
//       }

//       const data = await response.json();
//       console.log("Lavoro con immagine creato con successo!", data);
//     } catch (error) {
//       console.error("Errore: ", error);
//       setErrorMessage("Errore durante l'invio del lavoro.");
//     }
//   };

//   return (
//     <>
//       <h1 className="mb-5">👔 Aggiorna / Modifica Portfolio</h1>

//       {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

//       <Form noValidate onSubmit={manageSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Titolo</Form.Label>
//           <Form.Control
//             placeholder="Titolo lavoro"
//             value={title}
//             onChange={(event) => setTitle(event.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Descrizione</Form.Label>
//           <Form.Control
//             placeholder="Descrizione - min. 10 caratteri"
//             value={description}
//             onChange={(event) => setDescription(event.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Categoria</Form.Label>
//           <Form.Select
//             value={category}
//             onChange={(event) => setCategory(event.target.value)}
//           >
//             <option>Scegli tra le categorie</option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Immagine</Form.Label>
//           <Form.Control
//             type="file"
//             placeholder="Carica foto"
//             value={image}
//             onChange={(event) => setImage(event.target.files[0])}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Check
//             type="checkbox"
//             label="Visibile"
//             checked={visible}
//             onChange={(event) => setVisible(!visible)}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//         <Button variant="warning" type="button">
//           Reset
//         </Button>
//       </Form>
//     </>
//   );
// }
