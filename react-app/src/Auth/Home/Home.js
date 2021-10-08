import React, { useState, useEffect } from 'react'
import BasicLayout from "../../layout/BasicLayout"
import { getTweetsFollowersApi } from '../../api/tweet'
import TweetList from '../../components/TweetList'
import { Button, Spinner } from 'react-bootstrap'

import "./Home.scss"

export default function Home(props) {
    const { setRefreshCheckLogin } = props
    const [tweets, setTweets] = useState(null)
    const [page, setPage] = useState(1)
    const [loadingTweets, setLoadingTweets] = useState(false)

    useEffect(() => {
        getTweetsFollowersApi(page).then(response => {
            if(!tweets && response) {
                setTweets(formatModel(response))
            }
            else {
                if(!response) {
                    setLoadingTweets(0)
                }
                else {
                    const data = formatModel(response)
                    setTweets([...tweets, ...data])
                    setLoadingTweets(false)
                }
            }
        }).catch(() => {})
    }, [page])

    const moreTweets = () => {
        setLoadingTweets(true)
        setPage(page + 1)
        
    }
    return (
        <BasicLayout className='home' setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="home__title">
                <h2>Tweets</h2>
            </div>
            {tweets && <TweetList tweets={tweets} />}
            <Button onClick={moreTweets} className="load-more">
                {!loadingTweets ? (
                    loadingTweets !== 0 ? "More Tweets" : "There are no more Tweets available, please follow more users to see what's happening around the world!"
                ) : <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />}
            </Button>
        </BasicLayout>
    )
}

function formatModel(tweets) {
    const currentTweets = []
    tweets.forEach(tweet => {
        currentTweets.push({
            _id: tweet.Id,
            userid: tweet.userRelationId,
            body: tweet.Tweets.body,
            date: tweet.Tweets.date,
        })
    })
    console.log(currentTweets)
    return currentTweets
}
