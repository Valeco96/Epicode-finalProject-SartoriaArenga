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
    },
    validate: {
      validator: function (value) {
        //Rimuove tutti i simboli per contare solo le cifre
        const digits = value.replace(/\D/g, "");
        return digits.length >= 6 && digits.length <= 15;
      },
      message: "Il numero di telefono deve contenere tra 6 e 15 cifre.",
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    service: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
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
});

const Booking = model("Booking", bookingSchema);

export default Booking;

// {
//   "_id": "ObjectId",
//   "name": "Mario Rossi",
//   "email": "mario.rossi@email.com",
//   "phone": "3331234567",
//   "service": "Abito da cerimonia",
//   "preferredDate": "2025-09-12T15:00:00Z",
//   "status": "pending",   // pending | confirmed | completed
//   "createdAt": "2025-09-05T09:45:00Z"
// }
