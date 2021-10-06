import React, { useState } from 'react'
import { Row, Col, Form, Button, Spinner } from "react-bootstrap"
import { values, size } from 'lodash'
import { toast } from "react-toastify"
import { isEmailValid } from "../../utils/validations"
import { signUpApi } from "../../api/auth"
// import { Redirect, useHistory } from 'react-router-dom';

import "./SignUpForm.scss"

export default function SignUpForm(props) {
    const { setShowModal } = props
    const [formData, setFormData] = useState(initialFormValue())
    const [signUpLoading, setSignUpLoading] = useState(false)
    // const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        // setShowModal(false)
        // console.log(formData)
        let validCount = 0

        values(formData).some(value => {
            value && validCount++
            return null
        })
        if (validCount !== size(formData)) {
            toast.warning("Please complete all the required fields")
        }
        else {
            if (!isEmailValid(formData.email)) {
                toast.warning("The email is not valid.")
            }
            else if(formData.password !== formData.repeatPassword) {
                toast.warning("Passwords do not match")
            }
            else if(size(formData.password) < 6) {
                toast.warning("The password must be at least 6 characters long")
            }
            else {
                setSignUpLoading(true)
                signUpApi(formData).then(response => {
                    if(response.code) {
                        toast.warning(response.message)
                    }
                    else {
                        toast.success("Registration completed successfully.");
                        setShowModal(false);
                        setFormData(initialFormValue());
                        // history.push('/explore')
                        
                    }
                }).catch(() => {
                    return toast.error("Server crashed, please try again later!")
                }).finally(() => {
                    setSignUpLoading(false)
                })
            }
        }
    }

    //inputs only
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    // value = { formData.lastName } onChange = {(e) => setFormData({ ...formData, lastName: e.target.value })}
    return (
        <div className='signup-form'>
            <h2>Create an account</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type='text' placeholder='Name' name="name" defaultValue={formData.name}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control type='text' placeholder='Last Name' name='last' defaultValue={formData.last}></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" name='email' defaultValue={formData.email}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type='password' placeholder='Password' name='password' defaultValue={formData.password}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Control type='password' placeholder='Repeat Password' name='repeatPassword' defaultValue={formData.repeatPassword}></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    {!signUpLoading ? "Register" : <Spinner animation='border'/>}
                </Button>
            </Form>
        </div>
    )
}

function initialFormValue() {
    return {
        name: "",
        last: "",
        email: "",
        password: "",
        repeatPassword: "",
    }
}