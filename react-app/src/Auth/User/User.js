import React, { useState, useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import BasicLayout from '../../layout/BasicLayout'
import { useParams } from 'react-router-dom'
import { getUserApi } from '../../api/user'
import { toast } from 'react-toastify'

import "./User.scss"

export default function User() {
    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserApi(id).then(response => {
            setUser(response)
            if(!response) {
                toast.error("The user you visited does not exist")
            }
        }).catch(() => {
            toast.error("The user you visited does not exist")
        })
    }, [id])

    return (
        <BasicLayout className="user"> 
            <div className="user__title">
                <h2>React</h2>
            </div>
            <div>Banner</div>
            <div>Information</div>
            <div className='user__tweets'>Tweet List</div>
        </BasicLayout>
    )
}

// export default withRouter(User)