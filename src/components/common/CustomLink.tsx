import React from 'react';

type LinkButtonVariantType = 'primary' | 'secondary' | 'tertiary';

type LinkButtonProps = {
    variant?: LinkButtonVariantType;
    className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkButton = ({ variant = 'primary', className, ...rest }: LinkButtonProps) => {
    if (variant === 'primary') {
        return (
            <a
                {...rest}
                className={`ease-in-out duration-300 px-10 py-2 border-2 hover:bg-red dark:hover:text-white bg-transparent border-red font-semibold text-sm text-white dark:text-black rounded-full shadow-sm ${
                    className && className
                }`}
            >
                My Resume
            </a>
        );
    }

    return (
        <a {...rest} className={className}>
            My Resume
        </a>
    );
};

export default LinkButton;
