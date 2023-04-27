import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [theme, setTheme] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/${theme}`)
      .then((response) => {
        console.log("SUCCESS", response);
        setTheme(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <header>
        <h1>GPT Crossword</h1>
      </header>
      <Row>
        <Col>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
            <button type="submit">Fetch Theme</button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
