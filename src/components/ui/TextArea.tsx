import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function TextArea({
    className = "",
    ...props
}: TextAreaProps) {
    return (
        <textarea
            className={`
                w-full
                rounded-xl
                border
                border-gray-300
                p-4
                resize-none
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

export default TextArea;