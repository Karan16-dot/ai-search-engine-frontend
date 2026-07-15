interface SpinnerProps {
    className?: string;
}

function Spinner({ className = "" }: SpinnerProps) {
    return (
        <div
            className={`
                h-6
                w-6
                animate-spin
                rounded-full
                border-4
                border-blue-600
                border-t-transparent
                ${className}
            `}
        />
    );
}

export default Spinner;