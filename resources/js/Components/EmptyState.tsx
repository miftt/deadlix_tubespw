interface Props {
    title: string;
    description: string;
}

export default function EmptyState({ title, description }: Props) {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 mb-4">
                <svg
                    className="w-full h-full text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4v16M17 4v16M3 8h18M3 16h18"
                    />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-center max-w-sm">{description}</p>
        </div>
    );
} 