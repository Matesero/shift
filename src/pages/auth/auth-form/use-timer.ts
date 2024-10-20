import { useEffect, useState } from 'react';

export const useTimer = (initialTime: number) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

        } else if (timeLeft === 0) {
            setIsActive(false);
        }

        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    const startTimer = (number: number) => {
        setIsActive(true);
        setTimeLeft(number);
    };

    return { timeLeft, isActive, startTimer };
};