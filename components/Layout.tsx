import Nav from './Nav'
import { FC, ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <div>
            <Nav/>
            {children}

        </div>
    )
}

export default Layout