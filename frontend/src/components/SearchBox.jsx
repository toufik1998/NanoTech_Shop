import {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import {useParams, useNavigate} from 'react-router-dom';

const SearchBox = () => {
    const { keyword: urlKeyword } = useParams();
    const [searchKeyword, setSearchKeyword] = useState(urlKeyword || '');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(searchKeyword.trim()) {
            navigate(`/search/${searchKeyword}`);
            setSearchKeyword('')

        } else {
            navigate('/');
        }
    }
  return (
    <Form onSubmit={submitHandler}>
        <Form.Group className='d-flex align-items-center'>
            <Form.Control 
                type='text' 
                name='q' 
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder='Search Products...' 
                className='me-sm-2 ms-sm-5'
                value={searchKeyword}
            ></Form.Control>
            <Button 
                type='submit' 
                variant='outline-light' 
                className='p-2 mx-2'
                
            >
                Search
            </Button>
        </Form.Group>
    </Form>
  )
}

export default SearchBox