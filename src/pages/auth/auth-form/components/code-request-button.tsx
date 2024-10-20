import React from 'react';

type Props = {
    onClick: () => void;
    timeLeft: number;
};

export const CodeRequestButton: React.FC<Props> = ({ onClick, timeLeft }) => {
    const isDisabled = timeLeft > 0;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`bg-transparent ${isDisabled ? 'text-gray-400 text-xs' : 'text-black text-sm'}`}
        >
            {isDisabled ? `Запросить код можно будет через ${timeLeft} секунд.` : 'Запросить код еще раз'}
        </button>
    );
};