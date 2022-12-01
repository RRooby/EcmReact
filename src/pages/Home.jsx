import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductsThunk, filterSearchByIdThunk, getProductsThunk } from '../store/slices/products.slice';


const Home = () => {

    const dispatch = useDispatch();

    const newsProducts = useSelector(state => state.products);

    const [categoriesList, setCategoriesList] = useState([])

    const [inputSearch, setInputSearch] = useState("");

    useEffect(() => {
        dispatch(getProductsThunk());

        axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
            .then(res => setCategoriesList(res.data.data.categories))
    }, [])

    console.log(categoriesList);

    return (
        <div>
            <Row>
                <Col lg={3}>
                    <ListGroup>
                        {categoriesList.map(category => (
                            <ListGroup.Item
                                onClick={() => dispatch(filterProductsThunk(category.id))}
                                style={{ cursor: "pointer" }}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))
                        }
                    </ListGroup>
                </Col>
                <Col lg={9}>
                    <h2>Component home</h2>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={inputSearch}
                            onChange={e => setInputSearch(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => dispatch(filterSearchByIdThunk(inputSearch))}
                        >
                            Seacrh
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {newsProducts.map(news => (
                            <Col>
                                <Card>
                                    <Link to={`/products/${news.id}`} style={{textDecoration: "none"}} >
                                    <Card.Img 
                                        variant="top" 
                                        src={news.productImgs[0]} 
                                        style={{height: 200, objectFit: "contain"}}
                                        
                                    />
                                    <Card.Body
                                        style={{height: 200, objectFit: "contain"}}
                                    >
                                        <Card.Title>
                                            <p>
                                            {news?.title}
                                                </p>
                                                </Card.Title>
                                        <Card.Text>
                                        S/. {news.price}
                                        </Card.Text>
                                        
                                    </Card.Body>
                                    
                                    </Link>
                                    <i class="fa-solid fa-cart-shopping" style={{color: "red", textAlign: "center"}} ></i>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

        </div>
    );
};

export default Home;