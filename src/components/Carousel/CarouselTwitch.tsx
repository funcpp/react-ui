"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cssLength } from "@/utils/css";
import { twJoin, twMerge } from "tailwind-merge";
import { AbsolutePosition, abspos2className } from "@/utils/abspos";

interface CarouselTwitchProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    transition: number;
    interval: number;
    height: number;
}

/**
 * Twitch style Carousel for full-width images
 * @param interval Interval between slides (ms)
 * @param transition Transition duration (ms)
 * @param children Array of Images
 */
export const CarouselTwitch = (
    props: PropsWithChildren<CarouselTwitchProps>
) => {
    const {
        children,
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
            {children.map((child, i) => (
                <motion.div
                    key={i}
                    className="relative w-full"
                    style={{ height: cssLength(height) }}
                    layout
                >
                    {child}
                </motion.div>
            ))}
        </div>
    );
};
