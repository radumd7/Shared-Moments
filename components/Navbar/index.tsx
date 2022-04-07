import React, { useState } from "react";
import dynamic from "next/dynamic";
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
const NavigationMenu = dynamic(() => import('./NavigationMenu'));
export default function Navbar() {
    const [ menu, setMenu ] = useState(false);
    return(
        <React.Fragment>
            <header className="w-full h-16 fixed top-0 flex flex-row items-center px-4 text-xl font-semibold border-b border-gray-200 dark:border-neutral-600 select-none backdrop-filter backdrop-blur bg-opacity-50 bg-white dark:bg-neutral-900 dark:bg-opacity-50 z-10">
                <Link href="/" passHref>
                    <a className="flex items-center">
                        <FaHeart className="mx-1 text-sm text-blue-500 dark:text-blue-300"/><p>SM</p>
                    </a>
                </Link>
                <div className="flex flex-grow justify-end">
                    <GiHamburgerMenu onClick={()=>setMenu(true)} className="cursor-pointer"/>
                    {menu && <NavigationMenu open={menu} setOpen={setMenu}/>}
                </div>
            </header>
            <div className="h-16"/>
        </React.Fragment>
    );
};