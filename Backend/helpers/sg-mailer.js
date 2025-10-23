import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Funzione generica di invio con logging degli errori
// async function safeSend(msg, templateName) {
//   try {
//     await sgMail.send(msg);
//     console.log(`Email ${templateName} inviata a ${msg.to}`);
//   } catch (error) {
//     console.error(`Errore nell'invio dell'email ${templateName} a ${msg.to}`);
//     //Se Sendgrid restituisce una risposta HTTP
//     if (error.response) {
//       console.error("Dettagli SendGrid:", error.response.body);
//     } else {
//       console.error("Errore generico:", error.message);
//     }
//   }
// }

//Email di conferma invio prenotazione lato cliente
export async function sendReceivedBooking({ to, name, date, service }) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Prenotazione ricevuta",
    html: `<p>Gentile ${name || "cliente"},</p>
    <p>abbiamo ricevuto la tua richiesta di prenotazione del giorno ${new Date(
      date
    ).toLocaleDateString("it-IT")} alle ${new Date(date).toLocaleTimeString(
      "it-IT",
      { hour: "2-digit", minute: "2-digit" }
    )} per il seguente servizio: <strong>${service}</strong></p>
    <p>Verrai contattato al più presto per la conferma dell'appuntamento.</p>
    <p>Intanto ti ringraziamo per averci scelto, e ti auguriamo una piacevole giornata.</p>`,
  };

  await sgMail.send(msg);
}

//Email di prenotazione ricevuta per il sarto
export async function sendNewBooking({
  to,
  name,
  surname,
  email,
  phone,
  date,
  service,
  notes,
  status,
}) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Nuova prenotazione",
    html: `<p>Nuova prenotazione ricevuta:</p>
    <div>
    <ul>
    <li>Nome: ${name} ${surname}</li>
    <li>Email: ${email}</li>
    <li>Telefono: ${phone}</li>
    <li>Data e ora: ${new Date(date).toLocaleString("it-IT")}</li>
    <li>Servizio: ${service}</li>
    <li>Note: ${notes || "Nessuna nota"}</li>
    <li>Status: ${status}</li>
    </ul>
    </div>`,
  };

  await sgMail.send(msg);
}

//Email di conferma appuntamento
export async function sendConfirmationEmail({ to, name, date, service }) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Conferma appuntamento",
    html: `<p>Gentile ${name || "cliente"},</p>
    <p>il tuo appuntamento per il servizio selezionato (<strong>${service}</strong>) è stato confermato!</p>
    <p>Data e ora: ${new Date(date).toLocaleString("it-IT")}</p>
    <p>Grazie per averci scelto, ti aspettiamo!</p>`,
  };

  await sgMail.send(msg);
}

//Email per richiesta cambio data/ora
export async function sendRescheduleEmail({ to, name, date, service }) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Richiesta cambio data/ora dell'appuntamento",
    html: `
      <p>Gentile ${name || "cliente"},</p>
      <p>abbiamo ricevuto la tua richiesta di prenotazione del <b>${new Date(
        date
      ).toLocaleString(
        "it-IT"
      )}</b> per il seguente servizio: <b>${service}</b>. Questo slot non è disponibile al momento, sarebbe possibile concordare una nuova data e un nuovo orario per l'appuntamento?</p>
      <p>Restiamo disponibili e rintracciabili sia via email che whatsapp al numero 0039 333 560 3412.</p>
      <p>Restiamo in attesa di un riscontro, e ti auguriamo una piacevole giornata!</p>
      <p>Grazie per averci scelto.</p>
    `,
  };

  await sgMail.send(msg);
}
