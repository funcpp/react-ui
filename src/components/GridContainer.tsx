import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
import { twJoin, twMerge } from "tailwind-merge";

interface GridContainerProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    columns?: number;
    rows?: number;
    direction: "row" | "column";
}

const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
};

const gridRows = {
    1: "grid-rows-1",
    2: "grid-rows-2",
    3: "grid-rows-3",
    4: "grid-rows-4",
    5: "grid-rows-5",
    6: "grid-rows-6",
    7: "grid-rows-7",
    8: "grid-rows-8",
    9: "grid-rows-9",
    10: "grid-rows-10",
};

export const GridContainer = (props: PropsWithChildren<GridContainerProps>) => {
    const {
        children,
        columns = 2,
        rows = 2,
        direction = "column",
        className,
        style,
        ...rest
    } = props;
    return (
        <div
            className={twJoin(
                `grid`,
                direction === "column" ? gridColumns[columns] : gridRows[rows],
                className
            )}
            {...rest}
        >
            {children}
        </div>
    );
};
