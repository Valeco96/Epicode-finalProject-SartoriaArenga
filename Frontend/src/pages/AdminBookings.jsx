import { useContext, useEffect, useState } from "react";
import {
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
} from "../data/bookings";
import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const statusMessage = {
    confirmed: "😎 Email di prenotazione confermata inviata al cliente!",
    cancelled: "❌ Prenotazione annullata",
    completed: "🤩 Whoop whoop un'altro cliente soddisfatto!",
    pending: "⌛ Prenotazione in attesa di conferma",
    changeRequest: "📝 Email di richiesta cambio ora/data inviata al cliente.",
  };

  const { token } = useContext(AuthContext);

  //Fetch iniziale di tutte le prenotazioni
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllBookings(token);
      setBookings(data);
    } catch (error) {
      setError("Errore durante il caricamento delle prenotazioni.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Utente non autenticato. Effettua nuovamente il login.");
      return;
    }
    fetchBookings();
  }, [token]);

  //Filtraggio per stato
  const filteredBookingStatus =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  //Apertura del Modal di modifica
  const handleEdit = (booking) => {
    setSelectedBooking({
      ...booking,
      status: booking.status || "pending",
      date: booking.date || "",
      notes: booking.notes || "",
    });
    setShowModal(true);
  };

  //Salvataggio modifiche (PATCH)
  const handleSaveChanges = async () => {
    try {
      if (!selectedBooking || !selectedBooking._id) {
        throw new Error("Prenotazione non valida o mancante.");
      }

      setShowModal(false);
      fetchBookings();

      await updateBookingStatus(
        selectedBooking._id,
        {
          status: selectedBooking.status,
          notes: selectedBooking.notes,
        },
        token
      );

      alert(
        statusMessage[selectedBooking.status] ||
          "Stato aggiornato con successo!"
      );

      fetchBookings();
    } catch (error) {
      alert("Errore nel salvataggio delle modifiche della prenotazione.");
    }
  };

  //Cancellazione delete
  const handleDelete = async (bookingId) => {
    if (!window.confirm("Sei sicuro di voler cancellare questa prenotazione?"))
      return;

    try {
      setLoading(true);
      await deleteBooking(bookingId, token);
      //Rimuove localmente la riga
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      alert("Prenotazione eliminata con successo!");
    } catch (error) {
      setError("Errore nella cancellazione della prenotazione.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container py-5">
        <h1 className="mb-5 p-3">📅 Gestione Prenotazioni</h1>

        {error && <Alert variant="danger">{error}</Alert>}
        {loading && <Spinner animation="border" />}

        {/*Filtro per stato */}
        <div className="mb-3 d-flex gap-3 align-items-center">
          <Form.Label>Filtra per stato:</Form.Label>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="all">Tutti</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confermata</option>
            <option value="completed">Completata</option>
          </Form.Select>
        </div>

        {/*Tabella prenotazioni*/}
        <Table bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Nome:</th>
              <th>Email:</th>
              <th>Telefono:</th>
              <th>Data:</th>
              <th>Ora:</th>
              <th>Servizio:</th>
              <th>Messaggio:</th>
              <th>Stato:</th>
              <th>Azioni:</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookingStatus.map((booking) => (
              <tr key={booking._id}>
                <td>
                  {booking.name} {booking.surname}
                </td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>
                  {new Date(booking.appointmentDate).toLocaleDateString(
                    "it-IT"
                  )}
                </td>
                <td>
                  {new Date(booking.appointmentDate).toLocaleTimeString(
                    "it-IT",
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </td>
                <td>{booking.service}</td>
                <td>{booking.notes}</td>
                <td>
                  <span
                    className={`badge text-bg-${
                      booking.status === "confirmed"
                        ? "success"
                        : booking.status === "pending"
                        ? "warning"
                        : "secondary"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(booking)}
                  >
                    Modifica
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Elimina
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/*Modal modifica prenotazione*/}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Prenotazione</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBooking && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Stato</Form.Label>
                  <Form.Select
                    value={selectedBooking.status}
                    onChange={(e) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confermata</option>
                    <option value="changeRequest">
                      Richiedi cambio ora/data
                    </option>
                    <option value="completed">Completata</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Note interne</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={selectedBooking.notes || ""}
                    onChange={(e) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        notes: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Salva modifiche
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default AdminBookings;
