"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cssLength } from "@/utils/css";
import { twJoin, twMerge } from "tailwind-merge";

type CarouselFloatingPositionX = "left" | "right" | "center";
type CarouselFloatingPositionY = "top" | "bottom" | "center";
type CarouselFloatingPosition =
    `${CarouselFloatingPositionY} ${CarouselFloatingPositionX}`;

interface CarouselProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    showArrows?: boolean;
    arrowsPosition?: CarouselFloatingPosition;
    showDots?: boolean;
    dotsPosition?: CarouselFloatingPosition;
    showIndex?: boolean;
    indexPosition?: CarouselFloatingPosition;
    transition: number;
    interval: number;

    height: number;
}

interface CarouselFloatingProps
    extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}

const getXY = (position: CarouselFloatingPosition): string => {
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

const Index = ({ children, className = "" }: CarouselFloatingProps) => {
    return (
        <div
            className={twJoin(
                "z-10 flex justify-center rounded-lg bg-black/50 px-2 py-1 text-center font-semibold text-white",
                className
            )}
        >
            {children}
        </div>
    );
};

/**
 * Carousel for full-width images
 * @param interval Interval between slides (ms)
 * @param transition Transition duration (ms)
 * @param children Array of Images
 */
export const Carousel = (props: PropsWithChildren<CarouselProps>) => {
    const {
        children,
        showArrows = false,
        arrowsPosition = "bottom right",
        showDots = false,
        dotsPosition = "bottom center",
        showIndex = true,
        indexPosition = "bottom center",
        interval = 5000,
        transition = 200,
        height = 300,
        className = "",
        ...rest
    } = props;

    const [index, setIndex] = useState<number>(0);

    const controls = useAnimationControls();

    if (!Array.isArray(children)) return null;

    useEffect(() => {
        if (index === 0) {
            controls
                .start({
                    marginLeft: `${-100 * children.length}%`,
                    transition: { duration: transition / 1000 },
                })
                .then(() => {
                    controls.set({ marginLeft: "0%" });
                    setTimeout(() => {
                        setIndex((p) => (p + 1) % children.length);
                    }, interval);
                });
        } else {
            controls
                .start({
                    marginLeft: `${-100 * index}%`,
                    transition: { duration: transition / 1000 },
                })
                .then(() => {
                    setTimeout(() => {
                        setIndex((p) => (p + 1) % children.length);
                    }, interval);
                });
        }

        return () => {
            controls.stop();
        };
    }, [index]);

    return (
        <div
            className={twMerge("relative w-full overflow-x-hidden", className)}
        >
            <motion.div
                className="flex w-full"
                animate={controls}
                style={{ height: cssLength(height) }}
            >
                {children}
                {children[0] /* dup */}
            </motion.div>

            <Index className={getXY(indexPosition)}>
                {index + 1} / {children.length}
            </Index>
        </div>
    );
};
