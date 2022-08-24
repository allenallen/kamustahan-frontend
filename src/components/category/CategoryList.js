import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "../../AppNavbar";

const apiUrl = 'api/v1/category';

const CategoryList = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setCategory(data);
                setLoading(false);
            })

    }, []);

    const remove = async (id) => {
        await fetch(apiUrl + '/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedCategory = [...category].filter(i => i.id !== id);
            setCategory(updatedCategory);
        })
    }

    if (loading) {
        return <p>Loading...</p>
    }

    const categoryList = category.map(c => {
        return <tr key={c.id}>
                <td style={{whitespace: 'nowrap'}}>{c.name}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/category/" + c.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => remove(c.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>;
    });

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/category/new">Add Category</Button>
                </div>
                <h3>Categories</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="50%">
                                Name
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryList}
                    </tbody>
                </Table>
            </Container>
        </div>
      );
}

export default CategoryList;