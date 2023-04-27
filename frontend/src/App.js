import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    fetch('http://localhost:5000/api').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <Container>
      <Row>
        <Col>
          <h1>React + Flask Tutorial</h1>
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