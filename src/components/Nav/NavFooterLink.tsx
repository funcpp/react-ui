"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    prefetch?: boolean;
}

export const NavFooterLink = (props: PropsWithChildren<NavFooterLinkProps>) => {
    const { title, icon, link, className = "", prefetch = true } = props;
    const pathname = usePathname();
    return (
        <Link
            href={link}
            prefetch={prefetch}
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
