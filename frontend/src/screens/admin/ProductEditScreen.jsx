import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { FaArrowLeft } from "react-icons/fa"
import { toast } from "react-toastify"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadImageMutation } from "../../slices/productsApiSlice"
import FormContainer from "../../components/FormContainer"

const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    console.log(product);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingUploadImage }] = useUploadImageMutation();

    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({ productId, name, price, image, brand, category, countInStock, description });
            toast.success('Product updated successfully');
            navigate('/admin/productlist');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const { data } = await uploadProductImage(formData);
            setImage(data.image);
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

  return (
    <>
        <Link to='/admin/productlist' className="btn btn-light my-3">
            GO BACK
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={ submitHandler }>
                    
                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter name' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="price" className="my-2">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type='number' 
                            placeholder='Enter price' 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="image" className="my-2">
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter image url' 
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <Form.Control type="file" 
                            id="image-file"
                            label="Choose File"
                            onChange={uploadFileHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="brand" className="my-2">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter brand' 
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="category" className="my-2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter category' 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="countInStock" className="my-2">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control 
                            type='number' 
                            placeholder='Enter count in stock' 
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="description" className="my-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter description' 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary' className="my-3">
                        UPDATE
                    </Button>

                </Form>
            )}
                   
        </FormContainer>    
    </>
  )
}

export default ProductEditScreen