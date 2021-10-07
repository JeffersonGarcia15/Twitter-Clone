import React from 'react'
import User from "./User"

import "./UserList.scss"

export default function UserList(props) {
    const { users } = props

    if(!users.length) {
        return <h2>No results</h2>
    }
    return (
        <ul className="list-users">
            {users.map((user, index) => (
                <User key={index} user={user} />
            ))}
        </ul>
    )
}
