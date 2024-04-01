import React from "react";

export type MaterialSymbolsType = "filled" | "outlined" | "round" | "sharp";

export const MaterialSymbols = ({
    type = "outlined",
    children,
    className,
    style,
    ...rest
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
> & {
    type?: MaterialSymbolsType;
}) => {
    //const size = style?.fontSize || 24;

    const variants = {
        FILL: type === "filled" ? 1 : 0,
        //opsz: size,
    };

    const variantsStr = Object.entries(variants)
        .map(([key, value]) => `'${key}' ${value}`)
        .join(", ");

    return (
        // eslint-disable-next-line tailwindcss/no-custom-classname
        <span
            className={`material-symbols-outlined ${className}`}
            style={{
                fontVariationSettings: variantsStr,
                ...style,
            }}
            {...rest}
        >
            {children}
        </span>
    );
};
