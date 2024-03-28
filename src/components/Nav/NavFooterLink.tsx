'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MaterialSymbols } from '@/components/MaterialSymbols';
import { twMerge } from 'tailwind-merge';

interface NavFooterLinkProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    title: string;
    icon: {
        type: 'material';
        name: string;
    };
    link: string;
}

export const NavFooterLink = (props: NavFooterLinkProps) => {
    const { title, icon, link, className = '' } = props;
    const pathname = usePathname();
    return (
        <Link
            href={link}
            prefetch={true}
            className={twMerge(
                'flex size-full cursor-pointer select-none flex-col items-center justify-center text-xs',
                className
            )}
        >
            {icon.type === 'material' && (
                // eslint-disable-next-line tailwindcss/no-custom-classname
                <MaterialSymbols type="outlined">{icon.name}</MaterialSymbols>
            )}
            <span>{title}</span>
        </Link>
    );
};
