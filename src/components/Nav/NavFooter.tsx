import { cssLength } from "@/utils";
import { PropsWithChildren } from "react";
import { Fragment } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";

interface NavFooterProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    height?: number;
}

export const NavFooter = (props: PropsWithChildren<NavFooterProps>) => {
    const { children, height = 56, style, className = "", ...rest } = props;
    return (
        <Fragment>
            <div
                className="w-full"
                style={{
                    marginTop: cssLength(height),
                }}
            />
            <div
                className={twMerge(
                    "fixed bottom-0 flex w-full flex-row border-t border-t-gray-300 bg-white",
                    className
                )}
                style={{
                    height: cssLength(height),
                    ...style,
                }}
                {...rest}
            >
                {children}
            </div>
        </Fragment>
    );
};
