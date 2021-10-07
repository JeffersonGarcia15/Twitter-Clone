import React, { useState, useEffect } from 'react'
import {  Button } from "react-bootstrap"
import { Link, useLocation } from 'react-router-dom'
import LogoWhite from "../../assets/png/logo-white.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { logoutApi } from '../../api/auth'
import userAuth from "../../hooks/userAuth"
import TweetModal from "../Modal/TweetModal"

import "./LeftMenu.scss"

export default function LeftMenu(props) {
    const { setRefreshCheckLogin } = props
    const location = useLocation()
    const user = userAuth()
    const logout = () => {
        logoutApi();
        setRefreshCheckLogin(true);
    }

    const LogoutButton = () => {
        if(location.pathname === '/') {
            return (
                <Link to="" onClick={logout}>
                    <FontAwesomeIcon icon={faPowerOff} /> Logout
                </Link>
            )
        }
        else {
            return <a disabled >Logout From The Home Page</a>
        }
    }

    const [showModal, setShowModal] = useState(false)
    return (
        <div className="left-menu">
            <img src={LogoWhite} alt="Twitter" className="logo" />

            <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} /> Users
            </Link>
            <Link to={`/${user?._id}`}>
                <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
            {/* <Link to="" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} /> Logout
            </Link> */}
            <LogoutButton />

            <Button onClick={() => setShowModal(true)}>Tweet</Button>

            <TweetModal show={showModal} setShow={setShowModal}></TweetModal>
        </div>
    )
}
