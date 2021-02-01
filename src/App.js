// import logo from './logo.svg';
import React from 'react';
import AppBody from './components/AppBody';
import AppNavBar from './components/AppNavBar';
import AppTools from './components/AppTools';
import { 
  Container, 
  Row, 
  Col 
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppNavBar />
      <AppTools />
      <Container className="BodyContainer" fluid>
        <Row>
          <Col className="border" md={{ size: 2 }}>
            lalalal
          </Col>
          <Col md={{ size: 8 }}>
            <AppBody />
          </Col>
          <Col className="border" md={{ size: 2 }}>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
