import React from 'react'
import { Location, Link, BirthDate } from '../../../utils/icons'

import "./InfoUser.scss"

export default function InfoUser(props) {
    const { user } = props
    return (
        <div className="info-user">
            <h2 className="name">
                {user?.name} {user?.last}
            </h2>
            <p className="email">
                {user?.email}
            </p>
            {user?.biography && (
                <div className="description">
                    {user.biography}
                </div>
            )}
            <div>
                {user?.location && (
                    <p>
                        {user.location}
                    </p>
                )}
            </div>
        </div>
    )
}
