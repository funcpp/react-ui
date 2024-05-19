"use client";

import { motion } from "framer-motion";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface TabItemProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
    isOpen: boolean;
}

const TabItem = ({ title, isOpen, ...rest }: TabItemProps) => {
    return (
        <div
            className="relative flex w-full cursor-pointer select-none flex-col items-center justify-center pb-[3px]"
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

export default TabItem;
