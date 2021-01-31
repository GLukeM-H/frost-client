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
      <Container fluid={true}>
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


      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{comp}</div>
        <button onClick={() => dispatch(actions.addLink("google.com"))} >add link to google</button>
        <button onClick={() => dispatch(actions.addDiv("adding a div"))} >add a div</button>
        <button onClick={() => dispatch(actions.addText("some different text"))} >add some text</button>
        <div>{div}</div>
        <div>{txt}</div>
      </header> */}
    </div>
  );
}

export default App;
