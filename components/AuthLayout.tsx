import styles from '../styles/AuthLayout.module.css'
import { FC, ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }: AuthLayoutProps) => {

    return (
        <div className="flex h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
            <div className="m-auto bg-slate-50 rounded-md shadow-md md:w-3/5 w-[92%] min-h-[75%] grid lg:grid-cols-2">
                <div className={styles.imgStyle}>
                    <div className={styles.cartoonImg}>

                    </div>
                    <div className={styles.shadowImg}>

                    </div>
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AuthLayout