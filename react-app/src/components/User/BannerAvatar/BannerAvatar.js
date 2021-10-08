import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { API_HOST } from '../../../utils/constants'
import ConfigModal from '../../Modal/ConfigModal'
import AvatarNotFound from "../../../assets/png/avatar-no-found.png"
import EditProfileForm from '../../User/EditProfileForm'
import { checkFollowApi, followUserApi, unfollowUserApi } from '../../../api/follow'

import "./BannerAvatar.scss"

export default function BannerAvatar(props) {
    const { user, sessionUser, setRefreshCheckLogin } = props
    const bannerUrl = user?.banner ? `${API_HOST}/getBanner?id=${user.id}` : null
    const avatarUrl = user?.banner ? `${API_HOST}/getAvatar?id=${user.id}` : AvatarNotFound

    const [showModal, setShowModal] = useState(false)
    const [following, setFollowing] = useState(null)
    const [reloadFollow, setReloadFollow] = useState(false)

    useEffect(() => {
        if(user) {
            checkFollowApi(user?.id).then((response) => {
                if(response?.status) {
                    setFollowing(true)
                }
                else {
                    setFollowing(false)
                }
            })    
        }
        setReloadFollow(false)
    }, [user, reloadFollow])

    useEffect(() => {
        setRefreshCheckLogin(true)
    }, [])

    const followUser = () => {
        followUserApi(user?.id).then(() => {
            setReloadFollow(true)
        })
    }

    const unfollowUser = () => {
        unfollowUserApi(user?.id).then(() => {
            setReloadFollow(true)
        })
    }

    return (
        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div className='avatar' style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
            {user && (
                <div className='options'>
                    {sessionUser?._id === user.id &&
                        <Button onClick={() => setShowModal(true)}>Edit Profile</Button>
                    }
                {sessionUser?._id !== user.id && (
                    following !== null && (
                            (following ? <Button className='unfollow' onClick={unfollowUser}><span>Following</span></Button> : <Button onClick={followUser}>Follow</Button>)
                    )
                )
                }
                </div>
            )}
            <ConfigModal show={showModal} setShow={setShowModal} title="Edit Profile">
                <EditProfileForm user={user} setShowModal={setShowModal}></EditProfileForm>
            </ConfigModal>
        </div>
    )
}
