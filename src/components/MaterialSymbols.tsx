import React from "react";

export const MaterialSymbols = ({
    type = "outlined",
    children,
    className,
    ...rest
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
> & {
    type?: "filled" | "outlined" | "round" | "sharp";
}) => {
    return (
        // eslint-disable-next-line tailwindcss/no-custom-classname
        <span className={`material-symbols-${type} ${className}`} {...rest}>
            {children}
        </span>
    );
};
