import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';



const Logout = () => {


    const [show, setShow] = useState(false)
    const history = useHistory();

    const adminLogout = async () => {

        const token = await localStorage.getItem('token')

        try {

            const res = await fetch('/logoutUser', {
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
                setShow(true)
                await localStorage.removeItem('token')
                // window.alert('Successfully Logout')

                history.push('/login', { replace: true })
                window.location.reload();
            }


        } catch (error) {
            console.log(error);

        }

    }


    useEffect(() => {
        const confirmBox = window.confirm(
            "Do you really want to Logout?"
        )
        if (confirmBox === true) {
            adminLogout()
        } else {

            localStorage.removeItem('token')


            history.push('/login', { replace: true })
            history.push('/')
        }
    })

    return (
        <div>
            <h1>{show ? 'Logout Successfully!' : 'please wait...'}</h1>
        </div>
    )
}

export default Logout
