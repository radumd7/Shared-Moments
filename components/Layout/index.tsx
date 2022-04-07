import React from "react";
import Navbar from "../Navbar";
import { ThemeProvider } from "next-themes";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
    return(
        <React.Fragment>
            
                <Navbar/>
                <main>{children}</main>
        </React.Fragment>
    );
};