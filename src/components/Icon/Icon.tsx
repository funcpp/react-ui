import { PropsWithChildren } from "react";
import { MaterialSymbols, MaterialSymbolsType } from "./MaterialSymbols";

export type IconProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    type: `material ${MaterialSymbolsType}` | "image" | "svg";
    name?: string;
};

export const Icon = ({ children, type, name, ...rest }: IconProps) => {
    if (type.startsWith("material")) {
        return (
            <MaterialSymbols
                type={type.split(" ")?.[1] as MaterialSymbolsType}
                {...rest}
            >
                {name}
            </MaterialSymbols>
        );
    }
};
