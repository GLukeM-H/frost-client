// import logo from './logo.svg';
import React from 'react';
import AppBody from './components/AppBody';
import AppNavBar from './components/AppNavBar';
import { Container, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { useSelector, useDispatch } from 'react-redux';
// import actions from './actions';


function App() {
  // const div = useSelector(state => state.contentTree.div);
  // const txt = useSelector(state => state.contentTree.text);
  // const comp = useSelector(state => state.contentTree.contComp);
  // const dispatch = useDispatch();

  return (
    <div className="App">
      <AppNavBar />
      <Container fluid>
        <Row>
          <Col className="border" md={{ size: 2 }}>
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
