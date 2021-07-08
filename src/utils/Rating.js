import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import $ from 'jquery';


const Rating = (props) => {

    // const [rating, setRating] = useState('')

    const notifyRatings = (msg) => toast.success(msg, {
        icon: '😀',
    });

    $(function () {

        $(document).on({
            mouseover: function (event) {
                $(this).find('.far').addClass('star-over');
                $(this).prevAll().find('.far').addClass('star-over');
            },
            mouseleave: function (event) {
                $(this).find('.far').removeClass('star-over');
                $(this).prevAll().find('.far').removeClass('star-over');
            }
        }, '.rate');


        $(document).on('click', '.rate', function () {
            if (!$(this).find('.star').hasClass('rate-active')) {
                $(this).siblings().find('.star').addClass('far').removeClass('fas rate-active');
                $(this).find('.star').addClass('rate-active fas').removeClass('far star-over');
                $(this).prevAll().find('.star').addClass('fas').removeClass('far star-over');
            } else {
                console.log('has');
            }
        });

    });

    const submitRating = async (rating) => {
        console.log(rating);
        const res = await fetch('/addRating', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'rating': rating,
                'pid': props.pid
            })
        });

        const data = await res.json();

        if (res.status === 201) {
            notifyRatings(data.message)
            // setTimeout(() => {

            // }, 2000); 
            // window.location.reload()
        } else {
            window.alert(data.message)
        }

    }


    return (


        <div style={{ marginTop: '60px', marginBottom: '60px' }}>
            <div className="wrap">
                <div className="stars">
                    <label className="rate">
                        <input type="radio" name="radio1" id="star1" value="star1" />
                        <div className="face"></div>
                        <i className="far fa-star star one-star" onClick={() => { submitRating(1) }} ></i>
                    </label>
                    <label className="rate">
                        <input type="radio" name="radio1" id="star2" value="star2" />
                        <div className="face"></div>
                        <i className="far fa-star star two-star" onClick={() => { submitRating(2) }}></i>
                    </label>
                    <label className="rate">
                        <input type="radio" name="radio1" id="star3" value="star3" />
                        <div className="face"></div>
                        <i className="far fa-star star three-star" onClick={() => { submitRating(3) }}></i>
                    </label>
                    <label className="rate">
                        <input type="radio" name="radio1" id="star4" value="star4" />
                        <div className="face"></div>
                        <i className="far fa-star star four-star" onClick={() => { submitRating(4) }}></i>
                    </label>
                    <label className="rate">
                        <input type="radio" name="radio1" id="star5" value="star5" />
                        <div className="face"></div>
                        <i className="far fa-star star five-star" onClick={() => { submitRating(5) }}></i>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Rating
