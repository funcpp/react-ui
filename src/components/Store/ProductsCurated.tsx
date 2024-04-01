import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
import { Icon } from "../Icon";

interface ProductsCuratedProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
    direction?: "vertical" | "horizontal";
    loadPerPage?: number;
}

export const ProductsCurated = ({
    title,
    direction = "horizontal",
    loadPerPage = 4,
    children,
    ...rest
}: PropsWithChildren<ProductsCuratedProps>) => {
    return (
        <div className="flex flex-col gap-1 p-3">
            <div className="mb-0.5 flex flex-row justify-between">
                <div className="text-lg font-semibold">{title}</div>
                <div className="flex cursor-pointer select-none items-center justify-center text-base text-gray-800">
                    <div className="mr-1">전체 보기</div>
                    <Icon type="material outlined" name="chevron_right" />
                </div>
            </div>
            <div className="flex touch-pan-x snap-x flex-row gap-3 overflow-auto">
                {children}
            </div>
        </div>
    );
};
