import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { FaArrowLeft } from "react-icons/fa"
import { toast } from "react-toastify"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice"
import FormContainer from "../../components/FormContainer"

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    

    const { data: user, refetch ,isLoading, error } = useGetUserDetailsQuery(userId);
    console.log(user);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();


    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success('User updated successfully');
            navigate('/admin/userlist');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };



  return (
    <>
        <Link to='/admin/userlist' className="btn btn-light my-3">
            GO BACK
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
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

                    <Form.Group controlId="email" className="my-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type='email' 
                            placeholder='Enter email address'  
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                  
                    <Form.Group controlId="isadmin" className="my-2">
                        <Form.Check 
                            type='checkbox' 
                            label='Is Admin' 
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
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

export default UserEditScreen