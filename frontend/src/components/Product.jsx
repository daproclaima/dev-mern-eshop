import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className='product-card mx-2 my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' alt={`Image of ${product.name}`}/>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={product.rating} reviews={product.numReviews}/>
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
