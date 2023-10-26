import React from 'react'
import styles from "@/styles/account.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from 'next/link';
const BuildBioExistingUser = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={`text-center ${styles.account_wrapper} card p-4`}>
                            <div>
                                <h1>
                                    You Have not buid your bio Yet !!!!!

                                </h1>
                                <div className='mt-5'>

                                <Link href='/build-your-bio' target='_blank' className='btn btn-signup mx-2'>Build Your Bio Here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuildBioExistingUser