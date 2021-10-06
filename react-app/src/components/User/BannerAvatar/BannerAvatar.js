import React from 'react'
import { Button } from 'react-bootstrap'
import { API_HOST } from '../../../utils/constants'
import AvatarNotFound from "../../../assets/png/avatar-no-found.png"

import "./BannerAvatar.scss"

export default function BannerAvatar(props) {
    const { user, sessionUser } = props
    const bannerUrl = user?.banner ? `${API_HOST}/getBanner?id=${user.id}` : null
    const avatarUrl = user?.banner ? `${API_HOST}/getAvatar?id=${user.id}` : AvatarNotFound

    return (
        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div className='avatar' style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
            {user && (
                <div className='options'>
                    {sessionUser?._id === user.id &&
                        <Button>Edit Profile</Button>
                    }
                {sessionUser?._id !== user.id && 
                    <Button>Follow</Button>
                }
                </div>
            )}
        </div>
    )
}
