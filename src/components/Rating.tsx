import { MaterialSymbols } from "@/components/MaterialSymbols";
import { twMerge } from "tailwind-merge";

type RatingType = "stars" | "summary" | "expanded";

interface RatingProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    type?: RatingType;
    rating: number;
    maxRating?: number;
    classNames?: {
        star?: string;
        summary?: string;
    };
}

export const Rating = (props: RatingProps) => {
    const { type = "stars", rating, maxRating = 5, classNames } = props;

    if (type === "stars") {
        return (
            <div className="flex flex-row">
                {Array.from({ length: maxRating }, (_, i) => (
                    <MaterialSymbols
                        className={twMerge("text-orange-400", classNames?.star)}
                        type={i + 1 <= rating ? "filled" : "outlined"}
                        key={`rating-${i + 1}`}
                    >
                        {i + 1 <= rating
                            ? "star"
                            : i + 0.5 <= rating
                            ? "star_half"
                            : "star"}
                    </MaterialSymbols>
                ))}
            </div>
        );
    } else if (type === "summary") {
        return (
            <div className="flex flex-row items-center">
                <MaterialSymbols
                    className={twMerge("text-[#ffa371]", classNames?.star)}
                    type="filled"
                >
                    {rating >= maxRating / 2 ? "star" : "star_half"}
                </MaterialSymbols>
                <div className={twMerge("font-bold", classNames?.summary)}>
                    {rating.toFixed(1)}
                </div>
            </div>
        );
    }
};
