import { useState } from "react";
import { createBooking } from "../data/bookings";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
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

      //Invia la prenotazione solo se l'orario è valido
      const data = await createBooking(formData);

      if (!data) throw new Error("Errore nella creazione della prenotazione.");

      alert(
        "La tua richiesta di prenotazione è stata inviata. Ti manderemo un'email di conferma della ricevuta del tuo appuntamento."
      );

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
      alert(
        "La richiesta di prenotazione non è stata inviata correttamente. Vi chiediamo di ricontrollare l'inserimento"
      );
      setError(error.message || "Errore del server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
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
}

export default BookingForm;
