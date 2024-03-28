"use client";

import Image from "next/image";
import { PropsWithChildren } from "react";
import { MaterialSymbols } from "../MaterialSymbols";
import { ProductThumbnail } from "./ProductThumbnail";

type ProductType = "default" | "discount";

interface ProductProps {
    title: string;
    brand: string;
    price: {
        default: number;
        discount?: number;
    };
    priceFormat?: (price: number) => string;
    image: string;
    link: string;
    type?: ProductType;
}

export const Product = (props: PropsWithChildren<ProductProps>) => {
    const {
        title,
        brand,
        price,
        priceFormat = (price) => `${price.toLocaleString()}원`,
        image,
        link,
        type = "default",
        children,
    } = props;
    return (
        <div className="flex w-full flex-col">
            {/* <ProductThumbnail image={image} alt={title} />
            <div className="mt-1.5 text-base font-medium leading-tight text-gray-800">
                {brand && (
                    <span className="font-bold text-black">{brand}&nbsp;</span>
                )}
                {title}
            </div>
            {price.discount ? (
                <div className="flex flex-col leading-tight">
                    <div className="text-xs text-gray-600 line-through">
                        {priceFormat(price.default)}
                    </div>
                    <div className="text-lg font-semibold text-orange-500">
                        {priceFormat(price.discount)}
                    </div>
                </div>
            ) : (
                <div className="text-lg font-semibold ">
                    {priceFormat(price.default)}
                </div>
            )} */}
            {children}
        </div>
    );
};
