"use client";

import { motion } from "framer-motion";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TabItemProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
    isOpen: boolean;
}

export const TabItem = ({
    className,
    title,
    isOpen,
    ...rest
}: TabItemProps) => {
    return (
        <div
            className={twMerge(
                "relative flex w-full cursor-pointer select-none flex-col items-center justify-center pb-[3px]",
                className
            )}
            {...rest}
        >
            <div className="p-3">
                <div className="text-base font-semibold">{title}</div>
            </div>
            {isOpen && (
                <motion.div className="absolute bottom-0 z-20 h-[3px] w-full" />
            )}
        </div>
    );
};
