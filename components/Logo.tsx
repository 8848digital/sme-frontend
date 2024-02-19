import Image from 'next/image'
import React from 'react'
import logoWithBlackText from "@/public/assets/SG_logo.svg"
const Logo = () => {
    return (
        <>
            <Image
                src={logoWithBlackText.src}
                alt="Logo"
                width={143}
                height={33}
                style={{marginLeft:'-28px'}}
            />
        </>
    )
}

export default Logo