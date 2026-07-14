import type { HTMLAttributes } from "react";

interface ContainerProps
    extends HTMLAttributes<HTMLDivElement> {}

function Container({
    className = "",
    children,
    ...props
}: ContainerProps) {
    return (
        <div
            className={`
                max-w-7xl
                mx-auto
                px-6
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
}

export default Container;