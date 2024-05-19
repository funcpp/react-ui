"use client";

import TabItem from "@/components/Tabs/TabItem";
import {
    DetailedHTMLProps,
    Fragment,
    HtmlHTMLAttributes,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

interface TabsProps
    extends DetailedHTMLProps<
        HtmlHTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    data: string[];
    scrolling?: boolean;
    sticky?: boolean;
}

const Tabs = ({
    children,
    data,
    scrolling = false,
    sticky = true,
    ...rest
}: TabsProps) => {
    const [menu, setMenu] = useState<number>(0);
    const uuid: string = Math.random().toString(16).slice(2);
    const refs = useRef<HTMLDivElement[] | null>([]);
    const barRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = useMemo(
        () => () => {
            refs.current.forEach((el, i) => {
                if (
                    el.getBoundingClientRect().top < barRef.current.clientHeight
                ) {
                    setMenu(i);
                }
            });
        },
        [barRef]
    );

    useEffect(() => {
        if (scrolling === false) return;
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrolling, handleScroll]);

    return (
        <Fragment>
            <div
                className={`${sticky && "sticky top-0 z-[100]"} bg-white pt-2`}
                ref={barRef}
            >
                <div className="relative flex w-full flex-row">
                    {data.map((title: string, index: number) => (
                        <TabItem
                            key={title}
                            title={title}
                            onClick={() => {
                                if (scrolling) {
                                    // scroll to refs.current[index].clientHeight - barRef.current.clientHeight
                                    window.scrollTo({
                                        top:
                                            refs.current[
                                                index
                                            ].getBoundingClientRect().top +
                                            window.scrollY -
                                            barRef.current.clientHeight,
                                        behavior: "smooth",
                                    });
                                } else {
                                    setMenu(index);
                                }
                            }}
                            isOpen={menu === index}
                        />
                    ))}
                    <div className="absolute bottom-0 z-10 h-[2px] w-full bg-gray-100" />
                </div>
            </div>
            {scrolling === false
                ? Array.isArray(children)
                    ? children[menu]
                    : children
                : Array.isArray(children)
                ? children.map((x, i) => {
                      return (
                          <div
                              key={`${uuid}${i}`}
                              id={`${uuid}${i}`}
                              ref={(el) => {
                                  refs.current[i] = el;
                              }}
                          >
                              {x}
                          </div>
                      );
                  })
                : children}
        </Fragment>
    );
};

export default Tabs;
