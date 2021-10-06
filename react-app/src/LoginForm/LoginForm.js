import React, { useState } from 'react'
import { Form, Button, Spinner } from "react-bootstrap"
import { values, size } from 'lodash'
import { isEmailValid } from "../utils/validations"
import { toast } from "react-toastify"
import { loginApi } from "../api/auth"

import "./LoginForm.scss"

export default function LoginForm() {
    const [formData, setFormData] = useState(initialFormValue())
    const [signInLoading, setSignInLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        let validCount = 0
        values(formData).some(value => {
            value && validCount++
            return null
        })
        if (size(formData) !== validCount) {
            toast.warning("Please complete all the required fields")
        }
        else {
            if(!isEmailValid(formData.email)) {
                toast.warning("Please enter a valid email address")
            }
            else {
                setSignInLoading(true)
                loginApi(formData).then(response => {
                    if(response.message) {
                        toast.warning(response.message)
                    }
                    else {
                        console.log(response.token)
                    }
                }).catch(() => {
                    toast.error("Server crashed. Please try again later")
                })
            }
        }
    }

    const onChange = (e) => {
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    return (
        <div className="signing-form">
            <h2>Sign in to Twitter</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" name="email" defaultValue={formData.email}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" name='password' defaultValue={formData.password}>
                    </Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    {!signInLoading ? "Login" : <Spinner animation='border' />}
                    
                    </Button>
            </Form>
        </div>
    )
}

function initialFormValue() {
    return {
        email:"",
        password:"",
    }
}