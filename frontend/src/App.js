import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CrosswordGrid from "./CrosswordGrid";
import Clues from "./Clues";

function App() {
  const [theme, setTheme] = useState("");
  const [crossword, setCrossword] = useState(null);
  const [userInput, setUserInput] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://localhost:5000/api?theme=${theme}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("SUCCESS", data);
        setCrossword(data.crossword);
        setUserInput(
          data.crossword.map((row) =>
            row.map((cell) => (cell === null ? null : ""))
          )
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const updateInput = (rowIndex, cellIndex, value) => {
    const updatedInput = [...userInput];
    updatedInput[rowIndex][cellIndex] = value;
    setUserInput(updatedInput);

    if (isCrosswordComplete(updatedInput)) {
      setStatusMessage("Congratulations! You've completed the crossword!");
    } else {
      setStatusMessage("Crossword not finished yet, keep trying!");
    }
  };

  const isCrosswordComplete = (input) => {
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        if (crossword[i][j] !== null && input[i][j] !== crossword[i][j]) {
          return false;
        }
      }
    }
    return true;
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
                <Form.Label>What should the theme of the puzzle be?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Get Puzzle
              </Button>
            </Form>
          </Col>
        </Row>
        {loading && (
          <Row>
            <Col>
              <div className="text-center">Asking GPT for clues...</div>
            </Col>
          </Row>
        )}
        {crossword && (
          <Row className="mt-5">
            <Col>
              <div className="crossword">
                <Clues direction="Across" />{" "}
                <CrosswordGrid
                  crosswordData={crossword}
                  userInput={userInput}
                  updateInput={updateInput}
                />
                <Clues direction="Down" />
              </div>
            </Col>
          </Row>
        )}
        {statusMessage && (
          <Row className="mt-3">
            <Col>
              <p>{statusMessage}</p>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default App;
