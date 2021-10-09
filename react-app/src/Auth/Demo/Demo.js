import React, { useState } from 'react'
import { loginApi, setTokenApi } from '../../api/auth'
import { Form, Button, Spinner } from "react-bootstrap"
import { toast } from 'react-toastify'

export default function Demo(props) {
    const { setRefreshCheckLogin } = props

    const [signingLoading, setSigningLoading] = useState(false)

    const onLogin = (e) => {
        e.preventDefault()
        loginApi({email: 'jonas@aa.io', password: '123456'}).then(response => {
            setTokenApi(response.token)
            setRefreshCheckLogin(true)
            setSigningLoading(true)

        }).catch(() => {
            toast.error("Server crashed. Please try again later")
        })
    }

    return (
        <div>
            <Form onSubmit={onLogin}>
                <Button type='submit' variant="outline-primary">
                {!signingLoading ? "Demo" : <Spinner animation='border' />}
                </Button>
            </Form>
        </div>
    )
}
