import React, { useState } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Comments from '../utils/Comments';
import Rating from '../utils/Rating';

const Orders = () => {

    const location = useLocation()
    const history = useHistory()
    console.log(location.state.rating);
    const [count, setCount] = useState(1)

    const notifyOrder = (msg) => toast.success(msg, {
        icon: '😀',
    });

    const notifyError = (msg) => toast.error(msg);

    const placeOrder = async () => {
        const res = await fetch('/userOrders', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'pid': location.state.pid,
                'uid': location.state.uid,
                'productUrl': location.state.productUrl,
                'productName': location.state.productName,
                'productPrice': location.state.productPrice,
                'productType': location.state.productType,
                'qty': count
            })
        });

        const data = await res.json();

        if (res.status === 201) {

            notifyOrder(data.message)

            setTimeout(() => {

            }, 2000);
            history.push('/allOrders')
            window.location.reload();
        } else {

            notifyError(data.message)
        }
    }

    // const NumRates = () => {
    //     if (location.state.rating === 5) {
    //         return (
    //             <>
    //                 <i className="fa fa-star" ></i>
    //                 <i className="fa fa-star" ></i>
    //                 <i className="fa fa-star" ></i>
    //                 <i className="fa fa-star" ></i>
    //                 <i className="fa fa-star" ></i>
    //                 {/* <i className="fa fa-star-half-o" ></i> */}
    //             </>
    //         )

    //     }

    //     for (var i =0;i<location.state.rating;i+=0.5){
    //         if(i === 1 || i === 2 || i === 3|| i === 4|| i === 5 ){
    //             return(
    //                 <i className="fa fa-star" ></i>

    //             )
    //         }


    //     }



    // }


    return (
        <>
            <div className="container d-flex justify-content-center">
                <Toaster />
                <figure className="card card-product-grid card-lg"> <NavLink to="#" className="img-wrap" data-abc="true"> <img src="https://i.imgur.com/MPqUt62.jpg" /> </NavLink>
                     <figcaption className="info-wrap">
                        <div className="row">
                            <div className="col-md-9 col-xs-9"> <NavLink to="#" className="title" data-abc="true">{location.state.productName}</NavLink>
                                <span className="rated">Laptops</span>  
                            </div>

                        </div>
                    </figcaption> 
                    <div className="bottom-wrap-payment">
                        <figcaption className="info-wrap">
                            <div className="row">
                                <div className="col-md-9 col-xs-9"> <NavLink to="#" className="title" data-abc="true">Price</NavLink> <span className="rated">for {location.state.productType}</span> </div>
                                <div className="col-md-3 col-xs-3">
                                    <div className="rating text-right">₹ {location.state.productPrice}</div>
                                </div>
                            </div>
                        </figcaption>
                    </div>

                    <div className="bottom-wrap-payment">
                        <figcaption className="info-wrap">
                            <div className="row">
                                <div className="col-md-9 col-xs-9"> <NavLink to="#" className="title" data-abc="true">Quantity</NavLink> <br />
                                    <i className="fas fa-plus " onClick={() => {
                                        setCount(count + 1)
                                    }} /> &nbsp;  &nbsp;
                                    <i className="fas fa-minus " onClick={() => {
                                        if (count > 1) setCount(count - 1)
                                    }} />
                                </div>
                                <div className="col-md-3 col-xs-3">
                                    <div className="rating text-right"> {count}</div>
                                </div>
                            </div>
                        </figcaption>
                    </div>

                    <div className="bottom-wrap-payment">
                        <figcaption className="info-wrap">
                            <div className="row">
                                <div className="col-md-9 col-xs-9"> <NavLink to="#" className="title" data-abc="true">Rating</NavLink>

                                </div>
                                <div className="col-md-3 col-xs-3">
                                    {location.state.rating ?
                                        <div className="rating text-right">{location.state.rating}/5</div>
                                        :
                                        <div className="rating text-right">No Ratings</div>

                                    }
                                </div>
                            </div>
                        </figcaption>
                    </div>
                    <div className="bottom-wrap" style={{ marginBottom: '30px' }}> <NavLink to="/allOrders" className="btn btn-primary float-right" data-abc="true" onClick={placeOrder}> Buy now </NavLink>
                        <div className="price-wrap "> <NavLink to="/" className="btn btn-warning float-left" data-abc="true"> Cancel </NavLink> </div>
                    </div>
                </figure>

            </div>

            <div style={{ marginTop: '20px' }}>
                <Rating pid={location.state.pid} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <Comments pid={location.state.pid} uid={location.state.uid} />
            </div>
        </>
    )
}

export default Orders