import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
      match: [/^[\d\s+()-]+$/, "Formato del numero non valido"],
      validate: {
        validator: function (value) {
          //Rimuove tutti i simboli per contare solo le cifre
          const digits = value.replace(/\D/g, "");
          return digits.length >= 6 && digits.length <= 15;
        },
        message: "Il numero di telefono deve contenere tra 6 e 15 cifre.",
      },
    },
    appointmentDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const appointment = new Date(value);
          const now = new Date();

          // Dev’essere almeno 1 ora nel futuro
          if (appointment.getTime() < now.getTime() + 60 * 60 * 1000)
            return false;

          // Controlla orario di apertura (es. 9:00 - 18:00)
          const hour = appointment.getHours();
          if (hour < 9 || hour >= 18) return false;

          return true;
        },
        message:
          "La data dell'appuntamento deve essere almeno tra 1 ora e durante l'orario di apertura (09:00-18:00).",
      },
    },
    service: { type: String, required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "changeRequest"],
      default: "pending",
    },
  },
  { timestamps: true }
);

//Indice combinato su appointmentDate e status
bookingSchema.index({ appointmentDate: 1, status: 1 });

//PRE-SAVE HOOK per ripulire il numero prima del salvataggio
bookingSchema.pre("save", function (next) {
  if (this.phone) {
    //Rimuove spazi, trattini e parentesi
    this.phone = this.phone.replace(/[\s()-]/g, "");
    //Mantiene solo il + se all'inizio
    if (!this.phone.startsWith("+")) {
      this.phone = this.phone.replace(/\+/g, "");
    }
  }
  next();
});

const Booking = model("Booking", bookingSchema);

export default Booking;
