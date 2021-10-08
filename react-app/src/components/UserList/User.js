import React, { useState, useEffect } from 'react'
import { getUserApi } from "../../api/user"
import { Media, Image } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { API_HOST } from '../../utils/constants'
import AvatarNotFound from '../../assets/png/avatar-no-found.png'

import "./UserList.scss"


export default function User(props) {
    const { user } = props
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        getUserApi(user.id).then((response) => {
            setUserInfo(response)
        })
    }, [user])
    return (
        <Media as={Link} to={`/${user.id}`} className="list-users__user">
            <Image
                width={64}
                height={64}
                roundedCircle
                className="mr-3"
                src={
                    userInfo?.avatar
                        ? `${API_HOST}/getAvatar?id=${user.id}`
                        : AvatarNotFound
                }
                alt={`${user.name} ${user.last}`}
            />
            <Media.Body >
                <h5 className="user-info">
                    {user.name} {user.last}
                </h5>
                <p className="user-bio">{userInfo?.biography}</p>
            </Media.Body>
        </Media>
    )
}
