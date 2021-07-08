import { mdiFormatHeader6 } from '@mdi/js';
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CartProducts = () => {
    const location = useLocation()
    const history = useHistory()

    const notifyCart = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    const notifyOrder = (msg) =>
        toast.success(msg, {
            icon: "😀",
        });
    const [count, setCount] = useState(1)

    const [dataa, setData] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartProducts, setCartProducts] = useState([])
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
                setCartProducts(data[0].cartProducts)


            } else {

                window.alert('Something went wrong')
            }


        } catch (error) {
            console.log(error);

        }
    }

    const placeOrder = async (pid, uid, url, name, price, type) => {
        const res = await fetch("/userOrders", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pid: pid,
                uid: uid,
                productUrl: url,
                productName: name,
                productPrice: price,
                productType: type,
                qty: 1

            }),
        });

        const data = await res.json();

        if (res.status === 201) {
            notifyOrder(data.message);

            setTimeout(() => { }, 2000);
        } else {
            notifyError(data.message);
        }
    };
    const removefromCart = async (pid) => {

        try {

            const res = await fetch('/removefromCart', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uid": dataa._id['$oid'],
                    "cid": pid
                })
            });

            const data = await res.json();
            if (res.status === 201) {
                notifyCart(data.message)
                window.location.reload()
            } else {

                notifyError(data.message)
            }


        } catch (error) {
            console.log(error);

        }
    }

    const orderAll = (userid) => {

        for (var i = 0; i < cartProducts.length; i++) {
            placeOrder(cartProducts[i].pid, userid,
                cartProducts[i].productUrl,
                cartProducts[i].productName,
                cartProducts[i].productPrice,
                cartProducts[i].productType,

            )
        }


        history.push("/allOrders");
        window.location.reload();
    }


    useEffect(() => {
        getUserData()

        var total = 0;
        for (var i = 0; i < cartProducts.length; i++) {
            total = parseFloat(total) + parseFloat(cartProducts[i].productPrice)
            console.log(total);
        }
        setTotalPrice(total)

    }, [])

    return (
        <div>
            <Toaster />
            <div className="container py-3">
                {cartProducts.length === 0 ?

                    <div className="row text-center align-self-center" style={{ marginTop: '20%' }}>
                        <div className="col-lg-7 mx-auto">
                            <h1 className="display-4">Your Cart is Empty</h1>
                            {/* <p className="lead mb-0" onClick={history.push('/')}>Go Back to Home</p> */}
                            <NavLink to='/' className="lead mb-0" style={{ color: '#0066ff' }}>Go Back to Home</NavLink>
                        </div>
                    </div>
                    :
                    <div className="row text-center mb-5 ">
                        <div className="col-lg-7 mx-auto">
                            <h1 className="display-4">My Cart</h1>
                            <p className="lead mb-0">...</p>

                        </div>
                    </div>
                }


                <div className="row">
                    <div className="col-lg-8 mx-auto">

                        <ul className="list-group shadow">

                            {cartProducts && cartProducts.slice(0).reverse().map(p => {
                                return (

                                    <li className="list-group-item" key={p._id}>

                                        <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                                            <div className="media-body order-2 order-lg-1">
                                                <h6 className="mt-0 font-weight-bold mb-2">{p.productName}</h6>

                                                <p className="font-italic text-muted mb-0 small">₹ {p.productPrice} for {p.productType}</p>
                                                <div style={{ flexDirection: 'row' }}>
                                                    <NavLink to={{
                                                        pathname: '/orders',
                                                        state: { pid: p.pid, uid: dataa._id['$oid'], productUrl: p.productUrl, productName: p.productName, productType: p.productType, productPrice: p.productPrice }
                                                    }}

                                                    >PLACE ORDER</NavLink>&nbsp; &nbsp;
                                                    <NavLink to='/cartProducts' style={{ color: 'red' }} onClick={() => { removefromCart(p._id['$oid']) }}>  REMOVE</NavLink>
                                                </div>
                                            </div><img src={p.productUrl} alt="Product image" width="200" className="ml-lg-5 order-1 order-lg-2" />
                                        </div>


                                    </li>
                                )
                            })}

                        </ul>
                        {/* {cartProducts && cartProducts.length != 0 &&
                            <>
                                <br /><br /><br />
                                <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                                    <div className="media-body order-2 order-lg-1">
                                        <h6 className="mt-0 font-weight-bold mb-2">Order All at One Place...</h6>

                                        <p className="font-italic text-muted mb-0 small">Total Price ₹{totalPrice}</p>
                                        <div style={{ flexDirection: 'row' }}>
                                            <NavLink to={{
                                                pathname: '/orders',
                                                // state: { pid: p.pid, uid: dataa._id['$oid'], productUrl: p.productUrl, productName: p.productName, productType: p.productType, productPrice: p.productPrice }
                                            }}
                                                onClick={() => { orderAll(dataa._id['$oid']) }}
                                            >PLACE ORDER</NavLink>&nbsp; &nbsp;
                                        </div>
                                    </div>


                                </div>
                                <br /><br /><br />
                            </>
                        } */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProducts

