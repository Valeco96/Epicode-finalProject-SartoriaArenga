import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import mailer from "../helpers/mailer.js";

export async function getAllBookings(request, response) {
  try {
    const bookings = await Booking.find().sort({ appointmentDate: 1 });
    response.status(200).json(bookings);
  } catch (error) {
    console.error("Errore nel recupero delle prenotazioni:", error.message);
    response.status(500).json({
      message: "Errore del server nel recupero delle prenotazioni.",
      error: error.message,
    });
  }
}

export async function getUpcomingBookings(request, response) {
  try {
    const now = new Date();
    const upcoming = await Booking.find({
      appointmentDate: { $gte: now },
    }).sort({ appointmentDate: 1 });
    response.status(200).json(upcoming);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero delle prenotazioni future" });
  }
}

export async function getPastBookings(request, response) {
  try {
    const now = new Date();
    const past = await Booking.find({ appointmentDate: { $lt: now } }).sort({
      appointmentDate: -1,
    });
    response.status(200).json(past);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero degli appuntamenti passati." });
  }
}

export async function createBooking(request, response) {
  try {
    const {
      name,
      surname,
      email,
      phone,
      appointmentDate,
      service,
      notes,
      status,
    } = request.body;

    if (!name || !surname || !email || !phone || !appointmentDate) {
      return response.status(400).json({
        message: "Tutti i campi obbligatori devono essere compilati.",
      });
    }

    const nome = name;
    const cognome = surname;
    const indirizzoEmail = email;
    const telefono = phone;
    const appuntamento = appointmentDate;
    const servizio = service;
    const note = notes;
    const stato = status;

    const newBooking = Booking({
      name: nome,
      surname: cognome,
      email: indirizzoEmail,
      phone: telefono,
      appointmentDate: appuntamento,
      service: servizio,
      notes: note,
      status: stato,
    });

    const savedBooking = await newBooking.save();

  //   //Email automatica al cliente
  //   await mailer({
  //     to: email,
  //     subject: "Prenotazione ricevuta - Sartoria Arenga",
  //     text: `Ciao ${name}, la tua prenotazione per il ${new Date(
  //       appointmentDate
  //     ).toLocaleString(
  //       "it-IT"
  //     )}  è stata ricevuta con successo! Ti contatteremo presto per confermare.`,
  //     html: `
  // <p>Ciao <b>${name}</b>,</p>
  // <p>abbiamo ricevuto la tua richiesta di prenotazione per il <b>${new Date(
  //   appointmentDate
  // ).toLocaleString("it-IT")}</b>.</p>
  // <p>Verrai contattato a breve per confermare l'appuntamento.</p>
  // <br />
  // <p><em>Sartoria Arenga</em></p>`,
  //   });

  //   //Email automatica per il sarto
  //   await mailer({
  //     to: process.env.EMAIL_FROM,
  //     subject: "Nuova prenotazione ricevuta",
  //     text: `Nuova prenotazione ricevuta:
  //     - Nome: ${name} ${surname}
  //     - Email: ${email}
  //     - Telefono: ${phone}
  //     - Servizio: ${service || "Non specificato"}
  //     - Data appuntamento: ${new Date(appointmentDate).toLocaleString("it-IT")}
  //     - Note: ${notes || "Nessuna"}
  //     - Stato: ${status || "In attesa"}`,
  //   });

    response.status(201).json({
      message:
        "Prenotazione avvenuta con successo! Ti abbiamo inviato una conferma via email.",
      booking: savedBooking,
    });

    console.log(
      {
        nome,
        cognome,
        indirizzoEmail,
        telefono,
        appuntamento,
        servizio,
        note,
        stato,
      },
      "Prenotazione creata e email inviate con successo!"
    );
  } catch (error) {
    console.log("Errore nella creazione della prenotazione:", error.message);
    response.status(500).json({
      message: "Errore del server nella creazione della prenotazione.",
      error: error.message,
    });
  }
}

export async function getSingleBooking(request, response) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido." });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return response.status(404).json({ message: "Elemento non trovato." });
    }

    response.status(200).json(booking);
  } catch (error) {
    console.error("Errore nel recupero della prenotazione", error.message);
    response.status(500).json({
      message: "Errore del server nel recupero della prenotazione:",
      error: error.message,
    });
  }
}

export async function updateBookingStatus(request, response) {
  try {
    const { id } = request.params;
    const { status } = request.body;

    //Controllo se lo status é valido
    const validStatuses = ["pending", "confirmed", "completed", "cancelled", "changeRequest"];
    if (!validStatuses.includes(status)) {
      return response.status(400).json({ message: "Status non valido." });
    }

    //Trova e aggiorna la prenotazione
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return response
        .status(404)
        .json({ message: "Prenotazione non trovata." });
    }

    response
      .status(200)
      .json({ message: "Status aggiornato correttamente!", booking: booking });
  } catch (error) {
    console.error("Errore nella modifica dello status:", error.message);
    response.status(500).json({
      message: "Errore nell'aggiornamento dello status a livello del server.",
    });
  }
}

export async function updateBookingDate(request, response) {
  try {
    const { id } = request.params;
    const { appointmentDate } = request.body;

    if (!appointmentDate) {
      return response
        .status(400)
        .json({ message: "Data dell'appuntamento mancante." });
    }

    const newDate = new Date(appointmentDate);
    const now = new Date();

    if (newDate < now) {
      return response
        .status(400)
        .json({ message: "Non puoi impostare una data passata." });
    }

    const hour = newDate.getHours();
    if (hour < 9 || hour >= 18) {
      return response.status(400).json({
        message:
          "Gli appuntamenti sono disponibili solo tra le 09:00 e le 18:00.",
      });
    }

    const updateBooking = await Booking.findByIdAndUpdate(
      id,
      { appointmentDate },
      { new: true, runValidators: true }
    );
    if (!updateBooking) {
      return response
        .status(404)
        .json({ message: "Prenotazione non trovata." });
    }

    response.status(200).json({
      message: "Data dell'appuntamento aggiornata con successo!",
      booking: updateBooking,
    });
  } catch (error) {
    console.error("Errore durante l'aggiiornamento della data:", error.message);
    response.status(500).json({
      message: "Errore del server durante l'aggiornamento della data.",
      error: error.message,
    });
  }
}

export async function deleteBooking(request, response) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido." });
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return response
        .status(404)
        .json({ message: "Prenotazione non trovata." });
    }

    response.status(200).json({
      message: "Prenotazione eliminata con successo.",
      booking: deletedBooking,
    });
  } catch (error) {
    console.error("Errore nell'eliminazione della prenotazione.");
    response.status(500).json({
      message: "Errore del server nell'eliminazione della prenotazione:",
      error: error.message,
    });
  }
}
