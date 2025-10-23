import { Button } from "react-bootstrap";
import { Link } from "react-router";

function NotFound() {
  return (
    <>
      <div className="main m-5">
        {" "}
        <h1 className="p-4">Not Found - Error 404</h1>
        <p>
          Siamo spiacenti, il percorso selezionato non ha sezioni dedicate o non
          è disponibile.
        </p>
        <Button className="my-5" to="/" as={Link} style={{backgroundColor: "#141f42"}}>
          Torna alla homepage
        </Button>
      </div>
    </>
  );
}

export default NotFound;
