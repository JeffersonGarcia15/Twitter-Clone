import React, { useState, useEffect } from 'react'
import BasicLayout from "../../layout/BasicLayout"
import { getTweetsFollowersApi } from '../../api/tweet'

import "./Home.scss"

export default function Home(props) {
    const [tweets, setTweets] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getTweetsFollowersApi(page).then(response => {
            console.log(response)
        })
    }, [page])
    const { setRefreshCheckLogin } = props
    return (
        <BasicLayout className='home' setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="home__title">
                <h2>Tweets</h2>
            </div>
            <p>Tweet List</p>
            <p>More Tweets</p>
        </BasicLayout>
    )
}
