import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import products from '../products'
import Rating from '../components/Rating'

const ProductScreen = () => {
    const { id:productId} = useParams();
    const product = products.find((product) => product._id === productId);
    console.log(product);
  return (
    <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        <Row>
            <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price
                                </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroupItem>
                            <Button className='btn-block' variant='outline-info' type='button' disabled={product.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroupItem> 
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen