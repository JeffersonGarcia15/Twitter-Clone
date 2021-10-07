import React, { useState, useEffect } from 'react'
import { Image } from "react-bootstrap";
import moment from "moment";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constants";
import { replaceURLWithHTMLLinks } from '../../utils/functions'
import { getUserApi } from "../../api/user";

import "./TweetList.scss"

export default function TweetList(props) {
    const { tweets } = props;
    return (
        <div className='list-tweets'>
            {tweets.map((tweet, index) => (
                <Tweet key={index} tweet={tweet} />
            ))}
        </div>
    )
}


function Tweet(props) {
    const { tweet } = props;
    const [userInfo, setUserInfo] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)

    // console.log(tweet)

    useEffect(() => {
        getUserApi(tweet.userid).then(response => {
            setUserInfo(response)
            setAvatarUrl(response?.avatar ? `${API_HOST}/getAvatar?id=${response?.id}` : AvatarNotFound)
        })
    }, [tweet])
    return (
        <div className='tweet'>
            <Image className='avatar' src={avatarUrl} roundedCircle/>
            <div>
                <div className='name'>
                    {userInfo?.name} {userInfo?.last}
                    <span>{moment(tweet.date).calendar()}</span>
                </div>
                    <div dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(tweet.body) }} />
            </div>
        </div>
    )
}
