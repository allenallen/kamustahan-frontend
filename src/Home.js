import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import AppNavbar from "./AppNavbar";

const Home = () => {
    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <Button color="link"><Link to="/category">Categories</Link></Button>
            </Container>
        </div>
    );
};

export default Home;