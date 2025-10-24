import { useState } from "react";
import { createBooking } from "../data/bookings";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    appointmentDate: "",
    service: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({ ...prev, appointmentDate: appointmentDate }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const appointment = new Date(formData.appointmentDate);
      const hour = appointment.getHours();

      //Validazione lato client: orario compreso tra le 09:00 e le 18:00
      if (hour < 9 || hour >= 18) {
        throw new Error(
          "L'orario scelto non è valido. Gli appuntamenti sono disponibili tra le 09:00 e le 18:00"
        );
      }
      if (appointment < new Date()) {
        throw new Error("Impossibile scegliere una data passata.");
      }

      //Invia la prenotazione solo se l'orario é valido
      const data = await createBooking(formData);

      if (!data) throw new Error("Errore nella creazione della prenotazione.");

      alert(
        "La tua richiesta di prenotazione è stata inviata. Ti manderemo un'email di conferma della ricevuta del tuo appuntamento."
      );
      //setMessage("Prenotazione crata con successo!");
      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        appointmentDate: "",
        service: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
      alert("La richiesta di prenotazione non è stata inviata correttamente. Vi chiediamo di ricontrollare l'inserimento");
      setError(error.message || "Errore del server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      {/* {message && (
        <Alert className="text-center" variant="success">
          {message}
        </Alert>
      )}
      {error && (
        <Alert className="text-center" variant="danger">
          {error}
        </Alert>
      )} */}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Nome:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Cognome:</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Telefono:</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Data e Ora Appuntamento:</Form.Label>
          {/* <DatePicker
            selected={formData.appointmentDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="dd/MM/yyyy HH:mm"
            className="form-control"
            calendarClassName="custom-calendar"
            placeholderText="Seleziona data e ora"
            minDate={new Date()}
            filterDate={(date) => date.getDay() !== 0} //niente domeniche
            filterTime={(time) => {
              const selectedDate = formData.appointmentDate || new Date();
              const day = selectedDate.getDay();
              const hour = time.getHours();

              if (day === 6) {
                //Sabato 10:00 - 13:00
                return hour >= 10 && hour < 13;
              } else {
                //Altri giorni 09:00 - 18:00
                return hour >= 9 && hour < 18;
              }
            }}
          /> */}
          <Form.Control
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            Orario disponibile (Lun-Ven: 09:00-18:00 / Sab: 10:00-13:00)
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Servizio Richiesto:</Form.Label>
          <Form.Select
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">-- Seleziona un servizio --</option>
            <option value="riparazione">Riparazione</option>
            <option value="su-misura">Abito su misura</option>
            <option value="modifica">Modifica capo</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Messaggio:</Form.Label>
          <Form.Control
            as="textarea"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mt-5">
          <Button
            style={{ backgroundColor: "#141f32" }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Invia Prenotazione"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );

  // const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [appointmentDate, setAppointmentDate] = useState("");
  // const [service, setService] = useState("");
  // const [notes, setNotes] = useState("");
  // const [error, setError] = useState("");

  // const handleChange = (e) => {

  // }

  // const handleDateChange = (e) => {
  //   const selectedDate = new Date(e.target.value);
  //   const now = new Date();

  //   //Reset messaggio
  //   setError("");

  //   //Controllo data nel passato
  //   if (selectedDate < now) {
  //     setError("Possibilmente non selezionare una data o ora passata.");
  //     return;
  //   }

  //   //Controllo orari consentiti
  //   const hour = selectedDate.getHours();
  //   if (hour < 9 || hour >= 18) {
  //     setError("Puoi selezionare solo orari tra le 09:00 e le 18:00.");
  //     return;
  //   }

  //   //Controllo almeno un'ora in anticipo
  //   if (selectedDate.getTime() < now.getTime() + 60 * 60 * 1000) {
  //     setError("E' possibile prenotare con un minimo di un'ora di anticipo.");
  //   }

  //   setAppointmentDate(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!error && appointmentDate) {
  //     onSubmit({ appointmentDate });
  //   }
  // };

  // return (
  //   <>
  //     <h2 className="mb-3 mt-5">📝Prenota il tuo appuntamento</h2>
  //     <form
  //       onSubmit={handleSubmit}
  //       className="flex flex-col gap-3 p-4 max-w-md"
  //     >
  //       <label className="font-medium text-gray-700">Nome:</label>
  //       <input
  //         type="text"
  //         value={name}
  //         onChange={handleChange}
  //         className="border p-2 rounded"
  //       />
  //       <label className="font-medium text-gray-700">
  //         Data e ora appuntamento:
  //       </label>
  //       <input
  //         type="datetime-local"
  //         value={appointmentDate}
  //         onChange={handleDateChange}
  //         className="border p-2 rounded"
  //       />
  //       {error && <p className="text-red-500 text-sm">{error}</p>}
  //       <button
  //         type="submit"
  //         disabled={!error || !appointmentDate}
  //         className={`mt-2 px-4 py-2 rounded text-white ${
  //           error
  //             ? "bg-gray-400 cursor-not-allowed"
  //             : "bg-blue-600 hover:bg-blue-700"
  //         }`}
  //       >
  //         Prenota appuntamento
  //       </button>
  //     </form>
  // </>
  // );
}

export default BookingForm;
