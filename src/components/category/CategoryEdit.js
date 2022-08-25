import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "../../AppNavbar";

const apiUrl = '/api/v1/category/';

const CategoryEdit = () => {
    const initialFormState = {
        name: ''
    }

    const [category, setCategory] = useState(initialFormState);
    const navigage = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(apiUrl + id)
                .then(response => response.json())
                .then(data => setCategory(data));
        }
    }, [id, setCategory]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(apiUrl + (category.id ? category.id : ''), {
            method: (category.id ? 'PUT' : 'POST'),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });

        setCategory(initialFormState);
        navigage('/category')
    };

    const title = <h2>{category.id ? 'Update Category' : 'Create Category'}</h2>

    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={category.name || ''} onChange={handleChange} autoComplete="name" />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">{category.id ? 'Update' : 'Create'}</Button>
                        <Button color="secondary" tag={Link} to="/category">Cancel</Button> 
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

export default CategoryEdit;