"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialSymbols } from "@/components/Icon/MaterialSymbols";
import { twMerge } from "tailwind-merge";
import { PropsWithChildren, ReactNode } from "react";
import { Icon, IconProps } from "../Icon/Icon";

interface NavFooterLinkProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    title: string;
    icon?: IconProps;
    link: string;
}

export const NavFooterLink = (props: PropsWithChildren<NavFooterLinkProps>) => {
    const { title, icon, link, className = "" } = props;
    const pathname = usePathname();
    return (
        <Link
            href={link}
            prefetch={true}
            className={twMerge(
                "flex size-full cursor-pointer select-none flex-col items-center justify-center text-xs",
                className
            )}
        >
            {icon && <Icon {...icon} />}
            <span>{title}</span>
        </Link>
    );
};
