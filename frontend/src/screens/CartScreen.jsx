import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart } from '../slices/cartSlice'

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}))
    };
  return (
    <Row>
        <Col md={8}>
            <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message>
                    Your Cart is empty <Link to={'/'}>Go Back</Link>
                </Message>
            ): (
                <ListGroup variant='flush'>
                    {cartItems.map((cartItem) => (
                        <ListGroup.Item key={cartItem._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={cartItem.image} alt={cartItem.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/products/${item._id}`}></Link>
                                </Col>
                                <Col md={2}>
                                    {cartItem.price}
                                </Col>
                                <Col md={2}>
                                <Form.Control 
                                        as='select'
                                        value={cartItem.qty}
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    >
                                        {[...Array(cartItem.countInStock).keys()].map((x) => (
                                            <option key={ x + 1 } value={ x + 1 }>{ x + 1 }</option>
                                        ))}
                                </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light'>
                                            <FaTrash/>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0) })
                            items
                        </h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixef(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cartItems.length === 0}>
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen