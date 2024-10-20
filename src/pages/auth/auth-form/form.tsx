import {
    AuthButton,
    CodeField,
    NumberField
} from "./components";
import { useForm } from "./use-form";
import { CodeRequestButton } from "@/pages/auth/auth-form/components/code-request-button";

export const Form = () => {
    const [state, onSubmit, onRequestCode, timeLeft] = useForm();
    const isEnterNumber = state.state === "enterNumber";

    const formText = isEnterNumber
        ? "Введите номер телефона для входа в личный кабинет"
        : "Введите проверочный код для входа в личный кабинет";

    const authButtonLabel = isEnterNumber ? "Продолжить" : "Вход";

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-xl text-black font-bold mb-2">Вход</h1>
                <form
                    aria-label="Вход"
                    className="my-1 w-full"
                    onSubmit={onSubmit}
                >
                    <p className="text-xs mb-2 text-black">{formText}</p>
                    <NumberField value={""} error={state.errors?.["number"] ?? ""}/>
                    {!isEnterNumber && <CodeField value={""} error={state.errors?.["code"] ?? ""}/>}
                    {!isEnterNumber && <CodeRequestButton onClick={onRequestCode} timeLeft={timeLeft}/>}
                    <AuthButton label={authButtonLabel}/>
                </form>
            </div>
        </div>
    );
};
