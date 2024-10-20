type Props = {
    error: string;
    value: string;
};

export const NumberField: React.FC<Props> = ({ value, error }) => {
    return (
        <div className="mb-1">
            <input
                type="number"
                id="number"
                name="number"
                className="block w-full rounded-s-sm rounded-e-sm border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500"
                placeholder="Телефон"
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
