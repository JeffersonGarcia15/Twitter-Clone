import React from 'react'
import BasicLayout from "../../layout/BasicLayout"

import "./Home.scss"

export default function Home(props) {
    const { setRefreshCheckLogin } = props
    return (
        <BasicLayout className='home' setRefreshCheckLogin={setRefreshCheckLogin}>
                    <h2>Hello from the home page</h2>

                </BasicLayout>
    )
}
