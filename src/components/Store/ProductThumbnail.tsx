import Image from "next/image";
import { DetailedHTMLProps, MouseEventHandler, PropsWithChildren } from "react";
import { MaterialSymbols } from "../MaterialSymbols";

interface ProductThumbnailProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    image: string;
    alt: string;
    addedToCart?: boolean;
    onClickCart?: MouseEventHandler<HTMLDivElement>;
}

export const ProductThumbnail = (
    props: PropsWithChildren<ProductThumbnailProps>
) => {
    const { image, alt, onClickCart, addedToCart } = props;
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
            <div
                className="absolute bottom-0 right-0 flex size-[40px] cursor-pointer select-none items-center justify-center rounded-tl-md bg-black/50"
                onClick={onClickCart}
            >
                <MaterialSymbols
                    className={`font-medium ${
                        addedToCart ? "text-orange-600" : "text-gray-200"
                    }`}
                >
                    shopping_basket
                </MaterialSymbols>
            </div>
        </div>
    );
};
