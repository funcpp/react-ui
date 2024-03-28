"use client";

import { useEffect, useState } from "react";

const useScroll = (id: string) => {
    const [element, setElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setElement(window.document.getElementById(id));
    }, [id]);

    const [scrollY, setScrollY] = useState<number>(
        element ? element?.scrollTop : 0
    );

    useEffect(() => {
        if (!element) return;

        const handleScroll = () => {
            setScrollY(element.scrollTop);
        };

        element.addEventListener("scroll", handleScroll);

        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }, [element]);

    return scrollY;
};

export default useScroll;
