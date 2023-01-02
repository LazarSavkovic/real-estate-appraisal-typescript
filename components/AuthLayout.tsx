import styles from '../styles/AuthLayout.module.css'

const AuthLayout = ({ children }) => {

    return (
        <div className="flex h-screen bg-blue-400">
            <div className="m-auto bg-slate-50 rounded-md w-3/5 min-h-[75%] grid lg:grid-cols-2">
                <div className={styles.imgStyle}>
                    <div className={styles.cartoonImg}>

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