"use client";

import { cssLength, cssAdd, cssMul } from "@/utils";
import { useRouter } from "next/navigation";
import { useState, Fragment, DetailedHTMLProps } from "react";
import { MaterialSymbols } from "../Icon/MaterialSymbols";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Icon, IconProps } from "../Icon/Icon";

type NavTreeNode = {
    id?: string;
    title: string;
    link?: string;
    icon?: IconProps;
    children?: NavTreeNode[];
};

interface NavTreeProps {
    node?: NavTreeNode;
    classNames: {
        child: string;
        root: string;
    };
    paddingPerDepth?: number;
    depth?: number;
    linkFormat?: string;
}

export function NavTree({
    node,
    classNames,
    paddingPerDepth = 24,
    depth = 0,
    linkFormat = "{link}",
}: NavTreeProps) {
    const [openChild, setOpenChild] = useState(false);

    const childs = Array.isArray(node?.children)
        ? node.children.map((child, index) => (
              <NavTree
                  key={`${child.title}-${child?.id || index}`}
                  depth={depth + 1}
                  classNames={classNames}
                  paddingPerDepth={paddingPerDepth}
                  linkFormat={linkFormat}
                  node={child}
              />
          ))
        : null;

    const isRoot = depth === 0;
    const isLeaf = !node?.children?.length;

    const className = twMerge(
        "flex cursor-pointer  flex-row items-center",
        isRoot ? classNames?.root : classNames?.child
    );

    if (isLeaf) {
        return (
            <Link
                href={linkFormat
                    .replace("{link}", node?.link || "#")
                    .replace("{title}", node?.title)
                    .replace("{id}", node?.id)}
                className={className}
                style={{
                    paddingLeft: paddingPerDepth * depth + 12,
                }}
            >
                {node?.icon && <Icon {...node.icon} />}
                <div className="ml-2">{node.title}</div>
            </Link>
        );
    } else {
        return (
            <Fragment>
                <div
                    className={className}
                    style={{
                        paddingLeft: paddingPerDepth * depth + 12,
                    }}
                    onClick={() => setOpenChild((prev) => !prev)}
                >
                    {node?.icon && <Icon {...node.icon} />}
                    <div className="ml-2">{node.title}</div>
                    {node.children && (
                        <Icon
                            className="ml-auto"
                            type="material outlined"
                            name={openChild ? "expand_less" : "expand_more"}
                        />
                    )}
                </div>
                {openChild && childs}
            </Fragment>
        );
    }
}
