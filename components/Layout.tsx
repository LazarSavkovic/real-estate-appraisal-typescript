import Nav from './Nav'
import { FC } from 'react'

const Layout: FC = ({ children }) => {
    return (
        <div>
            <Nav/>
            {children}

        </div>
    )
}

export default Layout