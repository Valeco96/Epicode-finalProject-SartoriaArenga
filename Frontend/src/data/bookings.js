import axios from "./axios.js";

export async function getAllBookings() {
  try {
    const response = await axios.get("/api/bookings");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createBooking(newBooking) {
  try {
    const response = await axios.post("/api/bookings", newBooking);
    return response.data;
  } catch (error) {
    console.error("Errore nella creazine della prenotazione.", error);
    throw error.response?.data || error;
  }
}

export async function getUpcomingBookings(bookingDate, token) {
  try {
    const response = await axios.get("/api/bookings/upcoming", bookingDate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    console.log(
      "Response completa con dati delle prenotazioni:",
      response.data
    );
  } catch (error) {
    console.log("Errore getUpcomingBooking", error);
    throw error;
  }
}

export async function getPastBookings(bookingDate, token) {
  try {
    const response = await axios.get("/api/bookings/past", bookingDate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    console.log(
      "Response completa con dati delle prenotazioni:",
      response.data
    );
  } catch (error) {
    console.log("Errore getPastBooking", error);
    throw error;
  }
}

export async function getSingleBooking(bookingId, token) {
  try {
    const response = await axios.get(`/api/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    console.log("Response completa:", response.data);
  } catch (error) {
    console.log("Errore getSingleBooking:", error);
    throw error;
  }
}

export async function updateBookingStatus(bookingId, updatedStatus) {
  try {
    const response = await axios.patch(
      `api/bookings/${bookingId}/status`,
      updatedStatus
    );
    console.log("Status updated:", response.data);
    return response;
  } catch (error) {
    console.error("Errore updateBookingStatus:", error);
    throw error;
  }
}

export async function updateBookingDate(bookingId, updatedDate) {
  try {
    console.log("Patch body inviato:", updatedDate);
    const response = await axios.patch(
      `api/bookings/${bookingId}/date`,
      updatedDate
    );
    console.log("Date updated:", response.data);
    return response;
  } catch (error) {
    console.error("Errore updateBookingDate:", error);
    throw error;
  }
}

export async function deleteBooking(bookingId) {
  try {
    const response = await axios.delete(`api/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
