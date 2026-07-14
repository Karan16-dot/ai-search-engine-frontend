import type { InputHTMLAttributes } from "react";

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {}

function Input({
    className = "",
    ...props
}: InputProps) {
    return (
        <input
            className={`
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
                ${className}
            `}
            {...props}
        />
    );
}

export default Input;