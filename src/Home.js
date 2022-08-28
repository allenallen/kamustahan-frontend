import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import AppNavbar from "./AppNavbar";

const userApi = 'api/v1/user';
const logoutApi = 'api/v1/logout'

const Home = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        setLoading(true);

        fetch(userApi, { credentials: 'include' })
            .then(response => response.text())
            .then(body => {
                console.log(body);
                if (body === '') {
                    setAuthenticated(false);
                } else {
                    setUser(JSON.parse(body));
                    setAuthenticated(true);
                }
                setLoading(false);
            });
    }, [setAuthenticated, setLoading, setUser]);

    const login = () => {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        console.log(`//${window.location.hostname}${port}/private`);
        window.location.href = `//${window.location.hostname}${port}/private`;
    };

    const logout = () => {
        fetch(logoutApi, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN']
            }
        })
            .then(response => response.json())
            .then(data => {
                window.location.href = `${data.logoutUrl}?id_token_hint=${data.idToken}&post_logout_redirect_uri=${window.location.origin}`;
            })
    };

    const message = user ? `Welcome, ${user.name}` : <p>Please login</p>;

    const button = authenticated ?
        <div>
            <Button color="link"><Link to="/category">My Categories</Link></Button>
            <br />
            <Button color="link" onClick={logout}>Logout</Button>
        </div> :
        <Button color="primary" onClick={login}>Login</Button>;

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <AppNavbar />
            <Container>
                {message}
                {button}
            </Container>
        </div>
    );
};

export default Home;