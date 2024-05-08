"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cssLength } from "@/utils/css";
import { twJoin, twMerge } from "tailwind-merge";
import { AbsolutePosition, abspos2className } from "@/utils/abspos";

interface CarouselProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    showArrows?: boolean;
    arrowsPosition?: AbsolutePosition;
    showDots?: boolean;
    dotsPosition?: AbsolutePosition;
    showIndex?: boolean;
    indexPosition?: AbsolutePosition;
    transition: number;
    interval: number;

    //height: number;
}

interface CarouselFloatingProps
    extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}

const Index = ({ children, className = "" }: CarouselFloatingProps) => {
    return (
        <div
            className={twJoin(
                "z-10 flex justify-center rounded-lg bg-black/50 px-2 py-1 text-center font-semibold text-white text-sm",
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
        //height = 300,
        className = "",
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
                    try {
                        controls.set({ marginLeft: "0%" });
                        setTimeout(() => {
                            setIndex((p) => (p + 1) % children.length);
                        }, interval);
                    } catch (e) {
                        return;
                    }
                });
        } else {
            controls
                .start({
                    marginLeft: `${-100 * index}%`,
                    transition: { duration: transition / 1000 },
                })
                .then(() => {
                    try {
                        setTimeout(() => {
                            setIndex((p) => (p + 1) % children.length);
                        }, interval);
                    } catch (e) {
                        return;
                    }
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
            <motion.div className="flex w-full" animate={controls}>
                {children}
                {children[0] /* dup */}
            </motion.div>

            {showIndex && (
                <Index className={abspos2className(indexPosition)}>
                    {index + 1} / {children.length}
                </Index>
            )}
        </div>
    );
};
