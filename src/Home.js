import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import AppNavbar from "./AppNavbar";

const userApi = 'api/v1/user';

const Home = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        setLoading(true);

        fetch(userApi, {credentials: 'include'})
        .then(response => response.text)
        .then(body => {
            if (body === '') {
                setAuthenticated(false);
            } else {
                setUser(JSON.parse(body));
                setAuthenticated(true);
            }
            setLoading(false);
        }, [setAuthenticated, setLoading, setUser]);
    });
    
    const login = () => {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        window.location.href = `//${window.location.hostname}${port}/private`;
    };

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