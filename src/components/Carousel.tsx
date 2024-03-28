"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cssLength } from "@/utils/css";

interface CarouselProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    showArrows?: boolean;
    showDots?: boolean;
    showIndex?: boolean;
    transition: number;
    interval: number;

    height: number;
}

const Index = ({ children }: PropsWithChildren<{}>) => {
    return (
        <div className="absolute bottom-16 right-16 flex justify-center text-center p-4 round-md">
            {children}
        </div>
    );
};

export const Carousel = (props: PropsWithChildren<CarouselProps>) => {
    const {
        children,
        showArrows = false,
        showDots = false,
        showIndex = true,
        interval = 5000,
        transition = 200,
        height = 300,
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
    }, [index]);

    return (
        <div className="w-full relative overflow-hidden">
            <motion.div
                className="flex w-full overflow-hidden"
                animate={controls}
                style={{ height: cssLength(height) }}
            >
                {children}
                {children[0] /* dup */}
            </motion.div>

            <Index>
                {index + 1} / {children.length}
            </Index>
        </div>
    );
};
