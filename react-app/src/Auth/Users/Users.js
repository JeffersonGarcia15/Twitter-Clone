import React from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Spinner, ButtonGroup, Button } from "react-bootstrap";

import "./Users.scss"

export default function Users(props) {
    const { setRefreshCheckLogin } = props
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
