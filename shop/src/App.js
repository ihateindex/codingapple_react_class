import './App.css';
import { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import data from './data';
import Detail from './Detail';

import { Link, Route, Switch } from 'react-router-dom';

function App() {
    let [shoes, shoes변경] = useState(data);

    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">ShoeShop</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link to="/">Home</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/detail">Detail</Link>
                            </Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route exact path="/">
                    <div className="banner-main">
                        <h1>20% Season Off</h1>
                        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        <p>
                            <Button bsStyle="primary">Learn more</Button>
                        </p>
                    </div>
                    <div className="container">
                        <div className="row">
                            {shoes.map(function (shoe, idx) {
                                return (
                                    // * 기본
                                    // <Card key={idx} id={shoes.id} title={shoes.title} content={shoes.content} price={shoes.price}></Card>
                                    // * 축약형
                                    <Card key={idx} idx={idx} shoes={shoes[idx]}></Card>
                                );
                            })}
                        </div>
                    </div>
                </Route>
                <Route path="/detail/:id">
                    <Detail shoes={shoes}></Detail>
                </Route>
                <Route path="/:id">
                    <div>아무거나 적었을때 이거 보여주셈</div>
                </Route>
            </Switch>
        </div>
    );
}

function Card(props) {
    return (
        <div className="col-md-4">
            <img src={'https://codingapple1.github.io/shop/shoes' + (props.idx + 1) + '.jpg'} alt="" width="100%" />
            <h4>{props.shoes.title}</h4>
            <p>
                {props.shoes.content} & {props.shoes.price}
            </p>
        </div>
    );
}

export default App;
