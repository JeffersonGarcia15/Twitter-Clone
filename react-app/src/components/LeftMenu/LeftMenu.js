import React from 'react'
import {  Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import LogoWhite from "../../assets/png/logo-white.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons'

import "./LeftMenu.scss"

export default function LeftMenu() {
    return (
        <div className="left-menu">
            <img src={LogoWhite} alt="Twitter" className="logo" />

            <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} /> Users
            </Link>
            <Link to="/profile">
                <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
            <Link to="/logout">
                <FontAwesomeIcon icon={faPowerOff} /> Logout
            </Link>

            <Button>Tweet</Button>
        </div>
    )
}
