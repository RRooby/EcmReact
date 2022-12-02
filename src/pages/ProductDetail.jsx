import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [])

    const newsProducts = useSelector(state => state.products)

    const productsFound = newsProducts.find(news => news.id === Number(id))

    const productsRelated = newsProducts.filter(news =>
        news.category.id === productsFound.category.id);

    console.log(productsRelated);

    return (
        <div>
            <h2>{productsFound?.title}</h2>
            <Row>
                <Col>
                    <img src={productsFound.productImgs[0]} alt="" />

                </Col>
                <Col><p>{productsFound.description}</p></Col>
            </Row>

            <h3>Products Related:</h3>

            <Row xs={1} md={2} lg={3} className="g-4">
            {productsRelated.map(news => (
                    <Col>
                        <Card  >
                        <Link to={`/products/${news?.id}`} style={{textDecoration: "none"}} >
                        <Card.Title>{news.title}</Card.Title>
                            <Card.Img 
                                variant="top" 
                                src={news.productImgs[0]} 
                                style={{height: 200, objectFit: "contain"}}
                            />
                            <Card.Body>
                                
                                <Card.Text>
                                    S/. {news.price}
                                </Card.Text>
                            </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    );
};

export default ProductDetail;

