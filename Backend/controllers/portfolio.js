import mongoose from "mongoose";
import Portfolio from "../models/Portfolio.js";

export async function getAllPieces(request, response) {
  try {
    const { title, category } = request.query;
    let filter = {};

    //Se viene passato un titolo nella query > ricerca parziale (case-insensitive)
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    //Se viene passata una categoria -> filtra per quella categoria
    if (category) {
      filter.categories = category;
    }

    //Se non viene passato nulla, -> restituisce tutti i lavori
    const pieces = await Portfolio.find(filter);

    if (pieces.length === 0) {
      return response
        .status(404)
        .json({ message: "Nessun elemento trovato nel portfolio." });
    }
    response.status(200).json(pieces);
  } catch (error) {
    console.error("Errore nel recupero del portfolio:", error.message);
    response.status(500).json({
      message: "Errore nel recupero degli elementi del portfolio, ",
      error: error.message,
    });
  }
}

export async function createPiece(request, response) {
  try {
    const {
      title,
      description,
      category,
      color,
      fabric,
      image,
      imagePublicId,
      visible,
    } = request.body;

    const titolo = title;
    const descrizione = description;
    const categoria = category;
    const colore = color;
    const tessuto = fabric;
    const immagine = image;
    const cloudinaryId = imagePublicId;
    const visibile = visible;

    if (descrizione < 10) {
      return response.status(400).json({
        message:
          "La descrizione deve avere una lunghezza non inferiore a 10 caratteri",
      });
    }

    const newPiece = Portfolio({
      title: titolo,
      description: descrizione,
      category: categoria,
      color: colore,
      fabric: tessuto,
      image: immagine,
      imagePublicId: cloudinaryId,
      visible: visibile,
    });

    const savedPiece = await newPiece.save();
    response.status(201).json(savedPiece);

    console.log({
      titolo,
      descrizione,
      categoria,
      colore,
      tessuto,
      immagine,
      cloudinaryId,
      visibile,
    });
  } catch (error) {
    console.error(
      "Errore nella creazione di un nuovo elemento nel Portfolio",
      error.message
    );
    response
      .status(500)
      .json({ message: "Errore del server - creazione Portfolio" });
  }
}

export async function getSinglePiece(request, response) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido." });
    }

    //Recupera il lavoro e popola titolo e categorie
    const piece = await Portfolio.findById(id);

    if (!piece) {
      return response.status(404).json({ message: "Elemento non trovato" });
    }

    response.status(200).json(piece);
  } catch (error) {
    console.error("Errore nel recupero del singolo lavoro:", error.message);
    response.status(500).json({
      message: "Errore nel recupero del lavoro",
      error: error.message,
    });
  }
}

export async function editPiece(request, response) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).json({ message: "ID non valido." });
    }

    //Controllo che esista un body o un file
    if (!request.body && !request.file) {
      return response
        .status(400)
        .json({ message: "Nessun dato fornito per l'aggiornamento." });
    }

    //Estraggo i dati solo se il body é definito
    const {
      title = "",
      description = "",
      category = [],
      color = [],
      fabric = [],
      image = "",
      visible = true,
    } = request.body || {};

    //Se ho un file cloudinary prendo l'URL
    const imageUrl = request.file ? request.file.path : image?.trim();

    //Creo l'oggetto di aggiornamento solo con i campi presenti
    const updateData = {
      ...(title && { title: title.trim() }),
      ...(description && { description: description.trim() }),
      ...(category && { category }),
      ...(color && { color }),
      ...(fabric && { fabric }),
      ...(typeof visible !== "undefined" && { visible }),
      ...(imageUrl && { image: imageUrl }),
    };

    //Con questo ora eseguo l'update
    const updatedPiece = await Portfolio.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // serve a far rispettare lo schema Mongoose anceh nella PUT
    );

    if (!updatedPiece) {
      return response.status(400).json({ message: "Lavoro non trovato." });
    }

    response
      .status(200)
      .json({ message: "Lavoro aggiornato con successo!", updatedPiece });
  } catch (error) {
    console.error("Errore nella modifica del lavoro", error.message);
    response.status(500).json({
      message: "Errore del server - modifica del lavoro fallita",
      error: error.message,
    });
  }
}

export async function deletePiece(request, response) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido." });
    }

    const deletedPiece = await Portfolio.findByIdAndDelete(id);
    if (!deletedPiece) {
      return response.status(404).json({ message: "Elemento non trovato" });
    }
    response.status(200).json(deletedPiece);
  } catch (error) {
    console.error("Non é stato possibile eliminare il lavoro", error.message);
    response.status(500).json({
      message: "Errore del server - lavoro non eliminato correttamente",
      error: error.message,
    });
  }
}

export async function updateImage(request, response) {
  try {
    const { imageId } = request.params;

    if (!mongoose.Types.ObjectId.isValid(imageId)) {
      return response.status(400).json({ message: "ID non valido" });
    }

    if (!request.file) {
      return response
        .status(400)
        .json({ message: "Nessuna immagine caricata" });
    }

    //URL Cloudinary
    const newImageUrl = request.file.path;

    //Aggiorna solo l'immagine
    const updatedPiece = await Portfolio.findByIdAndUpdate(
      imageId,
      { image: newImageUrl },
      { new: true }
    );

    if (!updatedPiece) {
      return response.status(404).json({ message: "Elemento non trovato" });
    }

    response
      .status(200)
      .json({ message: "Immagine aggiornata con successo!", updatedPiece });
  } catch (error) {
    console.error("Errore nell'aggiornamento dell'immagine:", error.message);
    response.status(500).json({
      message: "Errore del server durante l'aggiornamento dell'immagine",
      error: error.message,
    });
  }
}
