"use client";

import { useEffect, useState } from "react";

const useScroll = (id: string) => {
    const [element, setElement] = useState<Window | HTMLElement | null>(null);

    useEffect(() => {
        if (id) setElement(window.document.getElementById(id));
        else setElement(window);
    }, [id]);

    const [scrollY, setScrollY] = useState<number>(
        element
            ? id
                ? (element as HTMLElement)?.scrollTop
                : (element as Window)?.scrollY
            : 0
    );

    useEffect(() => {
        if (!element) return;

        const handleScroll = () => {
            setScrollY(
                id
                    ? (element as HTMLElement)?.scrollTop
                    : (element as Window)?.scrollY
            );
        };

        element.addEventListener("scroll", handleScroll);

        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }, [element]);

    return scrollY;
};

export default useScroll;
