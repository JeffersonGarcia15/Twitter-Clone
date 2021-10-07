import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import BasicLayout from '../../layout/BasicLayout'
import queryString from 'query-string'
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { getFollowsApi } from '../../api/follow'

import "./Users.scss"

export default function Users(props) {
    const { setRefreshCheckLogin } = props

    const [users, setUsers] = useState(null)
    const location = useLocation()
    const params = useUsersQuery(location)
    console.log(params)
    console.log('dddddd', queryString.stringify(params))

    useEffect(() => {
        getFollowsApi(queryString.stringify(params)).then(response => {
            console.log(response)
        }).catch(() => {
            setUsers([])
        })
    })
    return (
        <BasicLayout className="users" title="Users" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="users__title">
                <h2>Users</h2>
                <input type="text" placeholder="Search Twitter" />
            </div>
            <ButtonGroup className="users__options">
                <Button className='k'>
                    Following
                </Button>
                <Button className>
                    New Users
                </Button>
            </ButtonGroup>
        </BasicLayout>
    )
}

function useUsersQuery(location) {
    const { page = 1, searchType = 'follow', search = ''} = queryString.parse(location.search)

    return {page, searchType, search}
}