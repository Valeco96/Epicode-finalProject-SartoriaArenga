import { Link } from "react-router";


function TradNapoli() {
  return (
    <>
      <main>
        <div className="banner-tradizione">
          <h1 className="center-flex text-white big-title">
            L'ispirazione alla tradizione
          </h1>
        </div>

        <div className="py-4 my-3" style={{ color: "#141f32" }}>
          <h2 className="py-4 px-2 medium-title">La giacca napoletana</h2>
          <p className="px-4 py-3 mx-5">
            La giacca napoletana è un simbolo di eleganza senza tempo,
            apprezzata in tutto il mondo per la sua costruzione leggera e
            confortevole. Questa giacca nasce per adattarsi perfettamente al
            corpo di chi la indossa, esaltando lo stile personale con sobrietà
            ed eleganza. Queste sono alcune delle sue caratteristiche
            principali.
          </p>
        </div>

        <div
          className="section-fullwidth"
          style={{ backgroundColor: "#141f36" }}
        >
          <div className="section-flex">
            <div className="image-box tassello-tradizione-1"></div>
            <div className="text-box">
              <h2 className="pb-5 pt-5 text-white">Struttura destrutturata</h2>
              <p className="pb-5 px-5 text-white">
                Assenza di tela rigida, spalline e imbottiture. La giacca
                risulta leggera e piacevole da indossare, quasi come una seconda
                pelle.
              </p>
            </div>
          </div>
        </div>

        <div className=" section-fullwidth">
          <div className="section-flex">
            <div className="text-box">
              <h2 className="pb-4 pt-3">Spalla "a camicia"</h2>
              <p className="pb-5 px-5">
                La manica è cucita come una camicia, senza imbottitura, per dare
                maggiore naturalezza e libertà nei movimenti. - Rollino morbido
                (“manica a mappina”): la manica termina con una leggera
                arricciatura che conferisce morbidezza e uno stile rilassato.
              </p>
              <h2 className="pb-4">Rollino morbido</h2>
              <p className="pb-3 px-5">
                Detto anche "manica a mappina": la manica termina con una
                leggera arricciatura che conferisce morbidezza e uno stile
                rilassato.
              </p>
            </div>
            <div className="image-box tassello-tradizione-2"></div>
          </div>
        </div>

        <div
          className="section-fullwidth"
          style={{ backgroundColor: "#141f36" }}
        >
          <div className="section-flex">
            <div className="image-box tassello-tradizione-3"></div>
            <div className="text-box">
              <h2 className="pb-4 pt-3 text-white">Revers ampi</h2>
              <p className="pb-5 px-5 text-white">
                Largo rever classico, spesso a lancia, che enfatizza l’eleganza
                della linea.
              </p>
              <h2 className="pb-4 text-white">Doppia impuntura a mano</h2>
              <p className="pb-3 px-5 text-white">
                Cuciture visibili realizzate a mano per valorizzare
                l’artigianalità del capo.
              </p>
            </div>
          </div>
        </div>

        <div className=" section-fullwidth">
          <div className="section-flex">
            <div className="text-box">
              <h2 className="pb-5 pt-5">Tasche a toppa</h2>
              <p className="pb-5 px-5">
                Cucite esternamente, aggiungono un tocco sportivo e artigianale
                al capo.
              </p>
            </div>
            <div className="image-box tassello-tradizione-4"></div>
          </div>
        </div>

        <div
          className="section-fullwidth"
          style={{ backgroundColor: "#141f36" }}
        >
          <div className="section-flex">
            <div className="image-box tassello-tradizione-5"></div>
            <div className="text-box">
              <h2 className="pb-5 pt-5 text-white">Fondo manica "aperto"</h2>
              <p className="pb-5 px-5 text-white">
                Asole vere e funzionanti, spesso con bottoni sfalsati, segno
                distintivo dell’abito su misura.
              </p>
            </div>
          </div>
        </div>

        <div className="py-4 my-4" style={{ color: "#141f32" }}>
          <p className="px-4 py-4 mx-5">
            <em>
              Ogni lavoro presente nel nostro portfolio nasce dall’arte
              sartoriale napoletana, con attenzione ai dettagli e proporzioni,
              per offrire capi che fondono praticità, eleganza e armonia nello
              stile.
            </em>
          </p>
          <div className="d-flex justify-content-center button-padding">
            <Link to="/portfolio" style={{ textDecoration: "none" }}>
              <div className="d-flex button-navy-background align-items-center">
                <span style={{ fontWeight: 600 }}>
                  Dai un'occhiata alle nostre creazioni
                </span>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default TradNapoli;
