import React from 'react'

import Directory from '../components/directory-menu/directory-menu.component'
import './homepage.styles.scss'

const HomePage = ({ history }) => {
    return (
        <div className="homepage" history={history}>
            <Directory />
        </div>
    )
}

export default HomePage