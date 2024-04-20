export type AbsolutePositionX = "left" | "right" | "center";
export type AbsolutePositionY = "top" | "bottom" | "center";
export type AbsolutePosition = `${AbsolutePositionY} ${AbsolutePositionX}`;

export const abspos2className = (position: AbsolutePosition): string => {
    const [y, x] = position.split(" ");
    const _y =
        y === "top"
            ? "top-4"
            : y === "bottom"
            ? "bottom-4"
            : "top-1/2 -translate-y-1/2";
    const _x =
        x === "left"
            ? "left-4"
            : x === "right"
            ? "right-4"
            : "left-1/2 -translate-x-1/2";
    return `absolute ${_y} ${_x}`;
};
