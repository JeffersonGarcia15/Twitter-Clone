import React from 'react'
import {  Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import LogoWhite from "../../assets/png/logo-white.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { logoutApi } from '../../api/auth'
import userAuth from "../../hooks/userAuth"

import "./LeftMenu.scss"

export default function LeftMenu(props) {
    const { setRefreshCheckLogin } = props
    const user = userAuth()


    const logout = () => {
        logoutApi()
        setRefreshCheckLogin(true)
    }
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
            <Link to="" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} /> Logout
            </Link>

            <Button>Tweet</Button>
        </div>
    )
}
