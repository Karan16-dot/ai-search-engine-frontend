import type { HTMLAttributes } from "react";

interface CardProps
    extends HTMLAttributes<HTMLDivElement> {}

function Card({
    className = "",
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={`
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                p-6
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
}

export default Card;