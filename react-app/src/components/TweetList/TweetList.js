import React from 'react'
import { Image } from "react-bootstrap";
import { map } from "lodash";
import moment from "moment";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constants";
import { getUserApi } from "../../api/user";

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
    return <h2>{tweet.body}</h2>
}
