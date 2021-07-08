import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import AllProducts from '../userPages/AllProducts';
import plus from '../images/plus.jpg'
import logo from '../images/logo.png'
import '../App.css'
import Carousel from '../userPages/Carousel';


const Home = ({ props }) => {
    const history = useHistory()

    const [dataa, setData] = useState('');
    const [show, setShow] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [searchProducts, setSearchProducts] = useState([])
    const [searchText, setsearchText] = useState('')

    const t = localStorage.getItem('token')


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
                getAllProducts()


            } else {

                window.alert('Something went wrong')
            }


        } catch (error) {
            console.log(error);

        }
    }

    const getAllProducts = async () => {
        try {

            const res = await fetch('/getAllProducts', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const allprods = await res.json();
            setAllProducts(allprods)

        } catch (error) {
            console.log(error);

        }
    }

    const handleSearch = (txt) => {
        setsearchText(txt);
        if (txt) {
            const newList = allProducts.filter((item) => {
                const itemData = item.productName
                    ? item.productName.toUpperCase()
                    : ''.toUpperCase();
                const textData = txt.toString().toUpperCase();
                return itemData.indexOf(textData) > -1
            })
            setShow(true)
            setSearchProducts(newList)
        } else {
            setAllProducts(allProducts)
            setShow(false)
            setsearchText('')
            getUserData()

        }
    }

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="search-result-box card-box">
                            <div className="row">
                                <div className="col-md-8 offset-md-2">
                                    <div className="pt-3 pb-4">
                                        <div className="input-group">
                                            <input type="text" id="searchBox" name="searchBox" value={searchText} className="form-control" placeholder="Enter the Product" onChange={(e) => { setsearchText(e.target.value); handleSearch(e.target.value) }} />
                                            <div className="input-group-append">
                                                <button type="button" className="btn waves-effect waves-light btn-custom" onClick={() => { handleSearch(searchText) }}><i className="fa fa-search mr-1" style={{ color: '#0066ff' }}></i> Search</button>
                                            </div>
                                        </div>
                                        {/* {show &&
                                            <div className="mt-4 text-center">
                                                <h4>Search Results For "{searchText}"</h4>
                                                <NavLink to='#' className="font-italic text-muted mb-0 small" onClick={() => { setsearchText(''); getUserData() }}>Click here to view all products</NavLink>
                                            </div>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div >
                {!show &&
                    <div>
                        {/* <Carousel /> */}
                        <br />
                        <h3 >Groceries</h3>
                        <hr />
                        <div className='scroll-products'>
                            {/* <AllProducts productUrl={plus} addButton={true} /> */}
                            {t && allProducts.slice(0).reverse().map(p => {
                                return (
                                    <>
                                        <AllProducts key={p._id['$oid']} uid={dataa._id['$oid']} productUrl={p.productUrl} productName={p.productName} productType={p.productPrice.split('<=>')[1]} productPrice={p.productPrice.split('<=>')[0]} pid={p._id['$oid']} rating={p.rating} />

                                    </>
                                )
                            })}
                        </div>
                    </div>
                }

                <div>
                    {show &&

                        <div>
                            <h3 >Search Results</h3>
                            <hr />
                            <div className='scroll-products'>
                                {t && searchProducts.slice(0).reverse().map(p => {
                                    return (
                                        <>
                                            <AllProducts key={p._id['$oid']} uid={dataa._id['$oid']} productUrl={p.productUrl} productName={p.productName} productType={p.productPrice.split('<=>')[1]} productPrice={p.productPrice.split('<=>')[0]} pid={p._id['$oid']} />

                                        </>
                                    )
                                })}

                            </div>



                        </div>

                    }

                    {t && searchText && searchProducts.length === 0 && <div>
                        <div className="row text-center align-self-center">
                            <div className="col-lg-7 mx-auto">
                                <NavLink to='/' className="lead mb-0" style={{ color: '#0066ff' }}>No results Found :(</NavLink>
                            </div>
                        </div>
                    </div>}
                </div>

                <div>
                    {!t && <div>
                        <div className="row text-center align-self-center">
                            <div className="col-lg-7 mx-auto">
                                <h1 className="display-4">Please Login to See the Products</h1>
                                {/* <p className="lead mb-0" onClick={history.push('/')}>Go Back to Home</p> */}
                                <NavLink to='/login' className="lead mb-0" style={{ color: '#0066ff' }}>Login here</NavLink>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

        </>

    )
}

export default Home

