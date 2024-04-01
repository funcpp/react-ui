import Image from "next/image";
import { DetailedHTMLProps, MouseEventHandler, PropsWithChildren } from "react";
import { MaterialSymbols } from "../Icon/MaterialSymbols";

interface ProductThumbnailProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    image: string;
    alt: string;
    showCart?: boolean;
    addedToCart?: boolean;
    onClickCart?: MouseEventHandler<HTMLDivElement>;
    showWish?: boolean;
    addedToWish?: boolean;
    onClickWish?: MouseEventHandler<HTMLDivElement>;
}

export const ProductThumbnail = (
    props: PropsWithChildren<ProductThumbnailProps>
) => {
    const {
        image,
        alt,
        showCart,
        onClickCart,
        addedToCart,
        showWish,
        addedToWish,
        onClickWish,
    } = props;
    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-gray-200">
            <Image
                className="object-contain"
                src={image}
                alt={alt}
                width={300}
                height={0}
                style={{
                    aspectRatio: "5 / 6",
                }}
            />
            <div className="absolute bottom-0 right-0 flex flex-row rounded-tl-md bg-black/50">
                {showCart && (
                    <div
                        className="flex size-[40px] cursor-pointer select-none items-center justify-center"
                        onClick={onClickCart}
                    >
                        <MaterialSymbols
                            className={`font-medium ${
                                addedToCart
                                    ? "text-orange-600"
                                    : "text-gray-200"
                            }`}
                        >
                            shopping_basket
                        </MaterialSymbols>
                    </div>
                )}
                {showWish && (
                    <div
                        className="flex size-[40px] cursor-pointer select-none items-center justify-center"
                        onClick={onClickWish}
                    >
                        <MaterialSymbols
                            className={`font-medium ${
                                addedToWish
                                    ? "text-orange-600"
                                    : "text-gray-200"
                            }`}
                        >
                            favorite
                        </MaterialSymbols>
                    </div>
                )}
            </div>
        </div>
    );
};
