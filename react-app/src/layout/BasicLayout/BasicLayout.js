import React from 'react'

import "./BasicLayout.scss"

export default function BasicLayout(props) {
    const { children } = props
    return (
        <div>
            <h2>BasicLayout...</h2>
            {children}
        </div>
    )
}
