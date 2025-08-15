import React from "react";

interface HeaderProps {
    rightContent?: React.ReactNode;
    className?: string;
}

const Header = ({ rightContent, className }: HeaderProps) => {
    return (
        <div className={`flex flex-row justify-between items-center text-black absolute top-0 left-0 right-0 mx-4 md:mx-10 mt-4 md:mt-7 mb-10 md:mb-25 bg-white ${className}`}>
            <div className="flex items-center gap-2">
                <img src="/mouse.svg" alt="logo" className="size-[34px]" />
                <p className="text-base font-bold">foo-rum</p>
            </div>
            <div>
                {rightContent}
            </div>
        </div>
    )
}

export default Header;