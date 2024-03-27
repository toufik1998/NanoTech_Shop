import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer>
            <Row className='px-5 bg-primary'>
                <Col className='text-center pt-3'>
                    <p>NanoTech Shop &copy; {currentYear}</p>
                </Col>
            </Row>
    </footer>
  )
}

export default Footer

