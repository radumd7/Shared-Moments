import { useTheme } from "next-themes";
import React, { FC } from "react";

interface ButtonProps {
    onClick?:()=>void,
    variant?: 'contained' | 'outlined' | 'text',
    color?: 'primary' | 'secondary',
    style?: {},
    extratw?: string,
    size?: 'small' | 'standard' | 'large',
    type?: any
}
const Button: FC<ButtonProps> = ( props ) => {
    const { theme } = useTheme();
    const {
        children,
        onClick,
        variant,
        color,
        style,
        extratw,
        size,
        type,
    } = props;
    return(
        <button
            onClick={onClick}
            style={style && style}
            className={`px-4 py-2 uppercase font-medium ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-md'} rounded w-fit ${extratw && extratw}
                ${variant === 'contained' || !variant && 'border border-blue-500 dark:border-blue-300 bg-blue-500 dark:bg-blue-300 text-white dark:text-neutral-900 hover:bg-blue-600 dark:hover:bg-blue-400 shadow-sm shadow-gray-600 dark:shadow-black'}
                ${variant === 'text' && 'text-md bg-transparent text-blue-500 dark:text-blue-300'}
                ${variant === 'outlined' && 'border border-blue-500 dark:border-blue-300 text-blue-500 dark:text-blue-300'}
            `}
            type={type ? type : null}
        >
            {children}
        </button>
    );
};
export default Button;