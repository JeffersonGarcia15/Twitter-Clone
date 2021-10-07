import React, { useState, useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import BasicLayout from '../../layout/BasicLayout'
import { useParams } from 'react-router-dom'
import { getUserApi } from '../../api/user'
import { toast } from 'react-toastify'
import BannerAvatar from '../../components/User/BannerAvatar'
import userAuth from '../../hooks/userAuth'
import InfoUser from '../../components/User/InfoUser'
import { getUserTweetsApi } from '../../api/tweet'
import TweetList from '../../components/TweetList'

import "./User.scss"

export default function User(props) {
    // console.log('USER', props)
    const { setRefreshCheckLogin } = props
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [tweets, setTweets] = useState(null)
    const sessionUser = userAuth()

    useEffect(() => {
        getUserApi(id).then(response => {
            setUser(response)
            if(!response) {
                toast.error("The user you visited does not exist")
            }
        }).catch(() => {
            toast.error("The user you visited does not exist")
        })
    }, [id])
    
    useEffect(() => {
        getUserTweetsApi(id, 1).then(response => {
            setTweets(response)
        }).catch(() => {
            setTweets([])
        })
    }, [id])

    return (
        <BasicLayout className="user"> 
            <div className="user__title">
                <h2>{
                    user ? `${user.name} ${user.last}`
                    : "User not found"
                    }</h2>
            </div>
            <BannerAvatar setRefreshCheckLogin={setRefreshCheckLogin} user={user} sessionUser={sessionUser}/>
            <InfoUser user={user} />
            <div className='user__tweets'>
                <h3>Tweets</h3>
                {tweets && <TweetList tweets={tweets} />}
            </div>
        </BasicLayout>
    )
}

// export default withRouter(User)