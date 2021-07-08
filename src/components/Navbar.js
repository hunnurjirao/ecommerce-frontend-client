import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../img/logo.jpg'



const Navbar = () => {
    const history = useHistory();
    const [dataa, setData] = useState('');

    const token = localStorage.getItem('token')

    const getUserData = async () => {

        const token = await localStorage.getItem('token')
        try {

            const res = await fetch('/getUserData', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "auth": token
                })
            });

            const data = await res.json();
            if (res.status === 201) {
                setData(data[0]);


            } else {

                window.alert('Something went wrong')
            }


        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getUserData()
    }, [])
    const RenderNavbar = () => {
        if (token) {

            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">HOME</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/cartProducts">CART</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/allOrders">ORDERS</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">LOGOUT</NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" >HOME</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">REGISTER</NavLink>
                    </li>

                </>
            )
        }

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    {/* <img className='logo' src={logo} alt='logo' /> */}
                    <b>E-Website</b>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {token && <ul className="navbar-nav mr-auto">
                        <NavLink className="nav-link" to="#" style={{ cursor: 'default', fontStyle: 'italic' }}>Hello, <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}> {dataa.username}</span></NavLink>
                    </ul>}

                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <RenderNavbar />
                    </ul>

                </div>
            </nav>
        </>
    )

}

export default Navbar
