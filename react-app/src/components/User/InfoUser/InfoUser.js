import React from 'react'
import { Location, Link, BirthDate } from '../../../utils/icons'
import moment from 'moment'
// import localization from "moment/locale/en"
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
            <div className='more-info'>
                {user?.location && (
                    <p>
                        <Location />
                        {user.location}
                    </p>
                )}
                {user?.website && (
                    <a href={user.website} alt={user.website} target="_blank" rel="noopener noreferrer"><Link /> {user.website}</a>
                )}
                {user?.bod && (
                    <p>
                        <BirthDate />
                        {moment(user.bod).format("LL")}

                    </p>
                )}
            </div>
        </div>
    )
}
