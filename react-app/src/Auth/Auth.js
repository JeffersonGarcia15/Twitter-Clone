import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faUsers, faComment } from "@fortawesome/free-solid-svg-icons"
import LogoWhiteTwitter from "../assets/png/logo-white.png"
import LogoTwitter from "../assets/png/logo.png"
import BasicModal from "../components/Modal/BasicModal"
import SignUpForm from "../components/SignUpForm"
import LoginForm from "../LoginForm"

import "./Auth.scss"


export default function Auth() {
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openModal = content => {
        setShowModal(true);
        setContentModal(content)
    }
    return (
        <>
            <Container className="auth" fluid>
                <Row>
                    <LeftComponent></LeftComponent>
                    <RightComponent openModal={openModal} setShowModal={setShowModal}></RightComponent>
                </Row>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModal>
        </>
    )
}

function LeftComponent() {
    return (
        <Col className="auth__left" xs={6}>
            <img src={LogoTwitter} alt="Twitter" />
            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch} /> Twitter. Follow your interests.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUsers} /> Hear what people are talking about.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faComment} /> Join the conversation.
                </h2>
            </div>
        </Col>
    )
}

function RightComponent(props) {
    const { openModal, setShowModal } = props
    return (
        <Col className="auth__right" xs={6}>
            <div>
                <img src={LogoWhiteTwitter} alt="Twitter" />
                <h2>Happening now.</h2>
                <h3>Join Twitter today.</h3>
                <Button variant="primary" onClick={() => openModal(<SignUpForm setShowModal={setShowModal}/>)}>
                    Register
                </Button>
                <Button variant="outline-primary" onClick={() => openModal(<LoginForm />)}>
                    Sign In
                </Button>
            </div>
        </Col>
    )
}
