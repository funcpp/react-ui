"use client";

import useScroll from "@/hooks/useScroll";
import { cssLength } from "@/utils";
import { clamp } from "@/utils/math";
import {
    Fragment,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { twMerge } from "tailwind-merge";

interface NavInstagramProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    id: string;
    height?: number;
}

export const NavInstagram = (props: PropsWithChildren<NavInstagramProps>) => {
    const { id, height = 56, children, style, className = "", ...rest } = props;

    const scroll = useScroll(id);
    const ref = useRef<HTMLDivElement>(null);
    const [childrenHeight, setChildrenHeight] = useState(0);
    const [state, setState] = useState(1);
    const [prevScroll, setPrevScroll] = useState(scroll);

    const containerHeight = useMemo(() => {
        if (ref.current && height < childrenHeight) {
            return childrenHeight + 16;
        }
        return height;
    }, [height, childrenHeight]);

    useEffect(() => {
        if (!height || scroll < 0) return;

        var dt = (scroll - prevScroll) / containerHeight;
        if (dt >= 0) {
            var dt = dt * 1; // velocity
            setState((p) => clamp(p - dt, 0, 1));
        } else {
            var dt = dt * 1;
            setState((p) => clamp(p - dt, 0, 1));
        }
        setPrevScroll(scroll);
    }, [scroll, prevScroll]);

    useEffect(() => {
        if (ref.current) {
            setChildrenHeight(ref.current.clientHeight);
        }
    }, [ref.current]);

    return (
        <Fragment>
            <div
                className={twMerge(
                    `fixed top-0 box-border z-30 w-full flex items-center overflow-hidden border-solid border-b-gray-300 bg-white px-2`,
                    className
                )}
                style={{
                    minHeight: cssLength(containerHeight * state),
                    height: cssLength(containerHeight * state),
                    borderBottomWidth: cssLength(state),
                    ...style,
                }}
                {...rest}
            >
                <div
                    className="w-full"
                    ref={ref}
                    style={{
                        opacity:
                            clamp(
                                state - (childrenHeight * 1) / containerHeight,
                                0,
                                1
                            ) /
                            (1 - (childrenHeight * 1) / containerHeight),
                    }}
                >
                    {children}
                </div>
            </div>
            <div style={{ marginBottom: containerHeight }} />
        </Fragment>
    );
};
