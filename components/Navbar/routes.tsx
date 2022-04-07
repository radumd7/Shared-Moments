import { BsGithub } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAddCircleOutline, MdHistory } from 'react-icons/md';
export const routes = [
    {
        name: "Moments",
        icon: <MdHistory className="mr-2"/>,
        url: "/"
    },
    {
        name: 'My account',
        icon: <FaRegUserCircle className="mr-2"/>,
        url: '/my-account',
    },
    {
        name: "Add moment",
        icon: <MdAddCircleOutline className="mr-2"/>,
        url: '/my-account/add-moment',
    },
    {
        name: "Create account",
        icon: <MdAddCircleOutline className="mr-2"/>,
        url: '/auth/signin',
    },
    {
        name: "Open source",
        icon: <BsGithub className="mr-2"/>,
        url: '/open-source'
    }
];