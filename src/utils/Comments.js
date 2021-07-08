import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Comments = (props) => {

    const [msg, setMsg] = useState('')
    const [allComments, setAllComments] = useState([])

    const notifymsg = (msg) => toast.success(msg, {
        icon: '😀',
    });

    const submitMsg = async (e) => {
        e.preventDefault()


        const res = await fetch('/addComments', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'comment': msg,
                'uid': props.uid,
                'pid': props.pid
            })
        });

        const data = await res.json();

        if (res.status === 201) {
            notifymsg(data.message)
            setTimeout(() => {

            }, 4000);
            setMsg('')
            window.location.reload()
        } else {
            window.alert(data.message)
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



            allprods.map(c => {
                if (c._id['$oid'] === props.pid) {

                    setAllComments(c.comments)

                }
            })



        } catch (error) {
            console.log(error);

        }
    }

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2)
        // hours = ("0" + date.getHours()).slice(-2),
        // minutes = ("0" + date.getMinutes()).slice(-2)
        return [day, mnth, date.getFullYear()].join("/");
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <div>
            <Toaster />
            <section className="content-item" id="comments">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <form method="POST">
                                <h3 className="pull-left">New Comment</h3>


                                <fieldset>
                                    <div className="row">

                                        <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                            <textarea className="form-control" id="message" value={msg} placeholder="Your message" required onChange={(e) => { setMsg(e.target.value) }}></textarea>
                                        </div>
                                    </div>
                                </fieldset>
                                <button type="submit" className="btn btn-normal pull-right " onClick={submitMsg}>Submit</button>
                            </form>

                            {allComments &&
                                <>
                                    <h3>{allComments.length} Comments</h3>


                                    {allComments.length > 0 && allComments.slice(0).reverse().map(p => {
                                        return (
                                            <div className="media" key={Math.random()}>
                                                <div className="media-body">
                                                    <h4 className="media-heading">{p.username}</h4>
                                                    <p>{p.comment}</p>
                                                    <ul className="list-unstyled list-inline media-detail pull-left">
                                                        <li><i className="fa fa-calendar"></i>{convert(Date(p.date))}</li>
                                                        {/* <li><i className="fa fa-thumbs-up"></i>13</li> */}
                                                    </ul>
                                                    <ul className="list-unstyled list-inline media-detail pull-right">
                                                        {/* <li className=""><NavLink to="">Like</NavLink></li> */}
                                                        {p.sentiment === 1 ?
                                                            <i className="far fa-grin" style={{ fontSize: '24px' }}></i>
                                                            :
                                                            <i className="far fa-frown" style={{ fontSize: '24px' }}></i>

                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            }





                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Comments
