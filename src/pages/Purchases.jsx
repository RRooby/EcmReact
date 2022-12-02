import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, []);

    return (
        <div>
            <h2>pruchases hello</h2>
            <ListGroup>
                {purchases.map(purchase => (
                    <ul >
                        {purchase.cart.products.map(product => (
                            <li >
                                <Link to={`/products/${product?.id}`}>
                                    {product.title}
                                    {product.price}
                                    {product.createdAt}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </ListGroup>
        </div>
    );
};

export default Purchases;