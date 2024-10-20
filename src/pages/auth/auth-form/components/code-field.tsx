type Props = {
    error: string;
    value: string;
};

export const CodeField: React.FC<Props> = ({ value, error }) => {
    return (
        <div>
            <input
                type="number"
                id="code"
                name="code"
                className="block w-full rounded-s-sm rounded-e-sm border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500"
                placeholder="Проверочный код"
                defaultValue={value}
                style={{
                    WebkitAppearance: "none",
                }}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600" data-testid="error">
                    {error}
                </p>
            )}
        </div>
    );
};
