import './App.css';
import { createContext, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import data from './data';
import Detail from './pages/Detail.js';
import Cart from './pages/Cart.js';
import Card from './components/Card.js';

export let Context1 = createContext()

function App() {
    let [shoes, setShoes] = useState(data);
    let [재고, 재고변경] = useState([10, 11, 12]);
    let [btnCount, setBtnCount] = useState(0);
    let [loadingTxt,setLoadingTxt] = useState(false);
    console.log(btnCount);

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
                            <Nav.Link>
                                <Link to="/cart">Cart</Link>
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
                    {
                    btnCount == 3 
                    ? <div className="alert alert-warning">더 이상 제품이 없습니다.</div>
                    : <button onClick={() => {
                        setLoadingTxt(true);
                        setBtnCount(btnCount + 1);
                        axios.get('https://codingapple1.github.io/shop/data' + (btnCount+2) + '.json').then((result)=>{
                            console.log(result.data);
                            // * [...shoes] -> shoes의 깊은 복사, 전개 연산자를 이용
                            let shoes_copy = [...shoes, ...result.data];
                            console.log(shoes_copy);
                            // var newShoesArr = shoes_copy.concat(result.data);
                            // console.log(newShoesArr);
                            // setShoes(newShoesArr);
                            setShoes(shoes_copy);
                            setLoadingTxt(false);
                        })
                        .catch(() => {
                            console.log('실패');
                            setLoadingTxt(false);
                        })
                    }}>더보기, {btnCount}</button>
                    }
                    {
                        loadingTxt == true
                        ? <div className="alert alert-warning">로딩중입니다.</div>
                        : null
                    }
                </Route>
                <Route path="/detail/:id">
                    <Context1.Provider value={{재고}}>
                    <Detail shoes={shoes}></Detail>
                    </Context1.Provider>
                </Route>
                <Route path="/cart">
                    <Cart></Cart>
                </Route>
                <Route path="/:id">
                    <div>아무거나 적었을때 이거 보여주셈</div>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
