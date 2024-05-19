import Image from "next/image";
import {
    Children,
    DetailedHTMLProps,
    MouseEventHandler,
    PropsWithChildren,
} from "react";
import { MaterialSymbols } from "../Icon/MaterialSymbols";
import { twMerge } from "tailwind-merge";
import { Icon } from "../Icon";
import { AbsolutePosition, abspos2className } from "@/utils";

interface ProductThumbnailProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    image: string;
    aspect?: number; /// Aspect ratio of the image, width/height
    alt: string;
    showCart?: boolean;
    addedToCart?: boolean;
    onClickCart?: MouseEventHandler<HTMLDivElement>;
    showWish?: boolean;
    addedToWish?: boolean;
    onClickWish?: MouseEventHandler<HTMLDivElement>;
    classNames?: {
        ops?: string;
        cartContainer?: string;
        wishContainer?: string;
        cart: string;
        cart_added: string;
        wish: string;
        wish_added: string;
    };
    icons?: {
        cart?: string;
        wish?: string;
    };
    floating?: [
        {
            position: AbsolutePosition;
            className: string;
            children: [
                {
                    className: string;
                    content: string;
                }
            ];
        }
    ];
}

export const ProductThumbnail = (
    props: PropsWithChildren<ProductThumbnailProps>
) => {
    const {
        image,
        aspect = 5 / 6,
        alt,
        showCart,
        onClickCart,
        addedToCart,
        showWish,
        addedToWish,
        onClickWish,
        classNames,
        className,
        children,
        icons,
        floating,
        ...rest
    } = props;
    return (
        <div
            className={twMerge(
                "relative w-full overflow-hidden rounded-xl border border-gray-200",
                className
            )}
            {...rest}
        >
            <Image
                className="object-contain"
                src={image}
                alt={alt}
                width={300}
                height={0}
                style={{ aspectRatio: aspect }}
            />
            <div
                className={twMerge(
                    "absolute bottom-0 right-0 flex flex-row rounded-tl-md bg-black/50 z-30",
                    classNames?.ops
                )}
            >
                {showCart && (
                    <div
                        className={twMerge(
                            "z-50 flex size-[40px] cursor-pointer select-none items-center justify-center",
                            classNames.cartContainer
                        )}
                        onClick={onClickCart}
                    >
                        <Icon
                            type={`material ${
                                addedToCart ? "filled" : "outlined"
                            }`}
                            name={icons?.cart ?? "shopping_bag"}
                            className={twMerge(
                                `font-medium`,
                                addedToCart
                                    ? classNames?.cart_added
                                    : classNames?.cart
                            )}
                        />
                    </div>
                )}
                {showWish && (
                    <div
                        className={twMerge(
                            "z-50 flex size-[40px] cursor-pointer select-none items-center justify-center",
                            classNames.wishContainer
                        )}
                        onClick={onClickWish}
                    >
                        <Icon
                            type={`material ${
                                addedToWish ? "filled" : "outlined"
                            }`}
                            name={icons?.wish ?? "favorite"}
                            className={twMerge(
                                `font-medium`,
                                addedToWish
                                    ? classNames?.wish_added
                                    : classNames?.wish
                            )}
                        />
                    </div>
                )}
            </div>
            {Array.isArray(floating) &&
                floating.map(({ position, className, children }) => {
                    return (
                        <div
                            className={twMerge(
                                `absolute ${abspos2className(
                                    position
                                )} flex z-30`,
                                className
                            )}
                        >
                            {Array.isArray(children) &&
                                children.map(({ className, content }) => {
                                    return (
                                        <div
                                            className={twMerge(
                                                "z-30 flex",
                                                className
                                            )}
                                        >
                                            {content}
                                        </div>
                                    );
                                })}
                        </div>
                    );
                })}
            {children}
        </div>
    );
};
