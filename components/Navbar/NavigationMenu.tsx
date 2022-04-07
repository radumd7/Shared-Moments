import { Dialog } from "@headlessui/react";
import { useTheme } from "next-themes";
import React from "react";
import { CgClose } from 'react-icons/cg';
import { HiChevronRight, HiOutlineDesktopComputer } from 'react-icons/hi';
import { BsSun, BsMoon } from 'react-icons/bs';
import Link from "next/link";
import { routes } from "./routes";
import Button from "../UI/Button";
import { signOut, useSession } from "next-auth/react";
import NavigationUser from "./NavigationUser";
interface NavigationMenu {
    open: boolean,
    setOpen: any
};

function ListItem({ children }: React.PropsWithChildren<{}>) {
    return(
        <div className="w-full h-12 flex flex-row items-center justify-between px-4 border-b border-gray-200 dark:border-neutral-600 font-semibold text-md">
            {children}
        </div>
    );
};

export default function NavigationMenu({ open, setOpen }: NavigationMenu) {
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();
    return(
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="fixed z-10 inset-0 overflow-y-auto"
        >
            <Dialog.Overlay className="fixed inset-0 bg-black dark:bg-neutral-800 opacity-30 w-screen"/>
            <div className="fixed top-0 right-0 w-screen md:w-96 h-full bg-white dark:bg-neutral-900 flex flex-col">
                <div className="w-full h-16 border-b border-gray-200 dark:border-neutral-600 flex flex-row justify-end items-center px-4">
                    <CgClose onClick={() => setOpen(false)} className="cursor-pointer text-xl font-semibold"/>
                </div>
                {
                    //@ts-ignore
                    session ? <NavigationUser user={session.user}/> : null
                }
                {
                    routes.map((route, index) => {
                        if(!session && ( route.name === 'My account' || route.name === 'Add moment' )){
                            return null;
                        }
                        if(session && route.name === 'Create account'){
                            return null;
                        }
                        return(
                            <React.Fragment key={index}>
                                <ListItem>
                                    <Link href={route.url} passHref>
                                        <a className="w-full h-full flex items-center outline-none" onClick={() => setOpen(false)}>
                                            <div className="w-full flex flex-row items-center justify-between cursor-pointer">
                                                <div className="flex items-center">
                                                    {route.icon}
                                                    <p>{route.name}</p>
                                                </div>
                                                <HiChevronRight className="text-xl"/>
                                            </div>
                                        </a>
                                    </Link>
                                </ListItem>
                            </React.Fragment>
                        );
                    })
                }
                <ListItem>
                    <label htmlFor="theme">
                        <div className="flex items-center">
                            {
                                theme === 'light' && <BsSun/> ||
                                theme === 'dark' && <BsMoon/> ||
                                theme === 'system' && <HiOutlineDesktopComputer/>
                            }
                            <p className="ml-2">Active theme</p>
                        </div>
                    </label>
                    <select 
                        defaultValue={theme}
                        name="theme"
                        id="theme"
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-1/2 px-2 py-1"
                    >
                        <option value="system">System default</option>
                        <option value="light">Light mode</option>
                        <option value="dark">Dark mode</option>
                    </select>
                </ListItem>
                {session ? 
                    <div className="flex items-end justify-center flex-grow p2-4">
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Sign out
                        </Button>
                    </div>
                    :null
                }
            </div>
        </Dialog>
    );
};