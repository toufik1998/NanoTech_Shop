import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa"
import {toast} from "react-toastify"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice"


const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    
    const [createProduct, {isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();

    const deletHandler = async (id) => {
        if(window.confirm('Are you sure you want to delete')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted successfully');
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    const createProductHandler = async (id) => {
        if(window.confirm('Are you sure you want to create a product?')) {
            try {
                await createProduct();
                toast.success('Product created successfully');
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

  return (
    <>
        <Row>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                {/* <LinkContainer to='/admin/productlist/create'> */}
                    <Button className='btn-sm my-3' onClick={createProductHandler}>
                        <FaEdit /> Create Product
                    </Button>
                {/* </LinkContainer> */}
            </Col>
        </Row>

        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}

        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deletHandler(product._id)}>
                                        <FaTrash style={{ color: 'white' }}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )}
    </>
  )
}

export default ProductListScreen