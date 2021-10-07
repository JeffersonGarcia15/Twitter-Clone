import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import BasicLayout from '../../layout/BasicLayout'
import queryString from 'query-string'
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { getFollowsApi } from '../../api/follow'
import UserList from '../../components/UserList';

import "./Users.scss"

export default function Users(props) {
    const { setRefreshCheckLogin } = props

    const location = useLocation()
    const history = useHistory()
    const params = useUsersQuery(location)
    const [users, setUsers] = useState(null)
    const [searchUserType, setSearchUserType] = useState(params.searchType || "follow")

    useEffect(() => {
        getFollowsApi(queryString.stringify(params)).then(response => {
            if(!response.length) {
                setUsers([])
            }
            else {
                setUsers(response)
            }
        }).catch(() => {
            setUsers([])
        })
    }, [location, searchUserType])

    const onChangeType = searchType => {
        setUsers(null)
        if(searchType === "new") {
            setSearchUserType("new")
        }
        else {
            setSearchUserType("follow")
        }
        history.push({
            search: queryString.stringify({ searchType: searchType, page: 1, search: "" })
        })
    }
    return (
        <BasicLayout className="users" title="Users" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="users__title">
                <h2>Users</h2>
                <input type="text" placeholder="Search Twitter" />
            </div>
            <ButtonGroup className="users__options">
                <Button onClick={() => onChangeType("follow")} className={searchUserType === "follow" && "active"}>
                    Following
                </Button>
                <Button onClick={() => onChangeType("new")} className={searchUserType === "new" && "active"}>
                    New Users
                </Button>
            </ButtonGroup>

            {!users ? (
                <div className="users__loading">
                    <Spinner animation='border' variant='info' />
                    Searching for users
                </div>
            ) : (
                <UserList users={users} />
            )}
        </BasicLayout>
    )
}

function useUsersQuery(location) {
    const { page = 1, searchType = 'follow', search = ''} = queryString.parse(location.search)

    return {page, searchType, search}
}