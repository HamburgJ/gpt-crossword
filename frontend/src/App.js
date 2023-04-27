import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [getMessage, setGetMessage] = useState({});
  const [theme, setTheme] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => {
        console.log("SUCCESS", response);
        setGetMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/theme/${theme}`)
      .then((response) => {
        console.log("SUCCESS", response);
        setGetMessage(response);
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
          <div>{getMessage.status === 200 ? 
            <h3>{getMessage.status}</h3>
            :
            <h3>LOADING</h3>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
