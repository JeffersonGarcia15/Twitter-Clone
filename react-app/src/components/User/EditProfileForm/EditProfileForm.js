import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import DatePicker from "react-datepicker"

import "./EditProfileForm.scss"

export default function EditProfileForm(props) {
    const { setShowModal, user } = props
    const [formData, setFormData] = useState(initialValue(user));

    const onSubmit = e => {
        e.preventDefault()

    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="edit-user-form">
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Name" name="name"  defaultValue={formData.name} onChange={onChange}/>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Last Name" name="last" defaultValue={formData.last}onChange={onChange} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" row="3" placeholder="Add a biography" type="text" name='biography' defaultValue={formData.biography} onChange={onChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control placeholder="Website" type="text" name='website' defaultValue={formData.website} onChange={onChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <DatePicker placeholder='Date of birth' selected={new Date(formData.bod)} onChange={date => setFormData({...formData, bod: date})}></DatePicker>
                </Form.Group>
                <Button className='btn-submit' variant="primary" type="submit">Update</Button>
            </Form>
        </div>
    )
}

function initialValue(user) {
    return {
        name: user.name || "",
        last: user.last || "",
        biography: user.biography || "",
        location: user.location || "",
        website: user.website || "",
        bod: user.bod || "",
    };
}