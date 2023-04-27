import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CrosswordGrid from "./CrosswordGrid";

function App() {
  const [theme, setTheme] = useState("");
  const [crossword, setCrossword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api?theme=${theme}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("SUCCESS", data);
        setCrossword(data.crossword);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">GPT Crossword</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formCrosswordTheme">
                <Form.Label>Theme</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Fetch Theme
              </Button>
            </Form>
          </Col>
        </Row>
        {crossword && (
          <Row className="mt-5">
            <Col>
              <CrosswordGrid crosswordData={crossword} />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default App;
