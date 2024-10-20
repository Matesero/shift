import { useReducer } from "react";
import type { FormEventHandler } from "react";
import type { ZodError } from "zod";
import { reducer } from "./reducer";
import { type Schema, schema } from "./scheme";
import { useTimer } from "@/pages/auth/auth-form/use-timer";
import { createOtp, signin } from "@/lib/api";
import { useAppDispatch as appDispatch } from "@/store/store";

const zod2errors = (zodErrors: ZodError<Schema>): Record<string, string> => {
    const zodErrorsFormats = zodErrors.format();

    const errors: Record<string, string> = {};

    Object.entries(zodErrorsFormats).forEach(([key, value]) => {
        if ("_errors" in value) {
            errors[key] = value._errors.join(", ");
        }
    });

    return errors;
};

export const useForm = () => {
    const [state, dispatch] = useReducer(reducer, { state: "enterNumber" });
    const { timeLeft, startTimer } = useTimer(0);
    const useAppDispatch = appDispatch();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = schema.safeParse(Object.fromEntries(formData));
        if (data.success) {
            const phone = data.data.number;
            const code = data.data.code;
            if (state.state == "enterNumber") {
                await useAppDispatch(createOtp({ phone }))
                dispatch({ type: "continueAuth", payload: phone })
            } else {
                try {
                    if(await useAppDispatch(signin({ phone, code }))) {
                        dispatch({ type: "successAuth" });
                    }
                } catch (e) {
                    dispatch({ type: "errorUpload" });
                }
            }
        } else {
            dispatch({ type: "errorForm", payload: {errors: zod2errors(data.error), phone: state?.phone} });
        }
    };

    const onRequestCode = async () => {
        startTimer(60);
        await useAppDispatch(createOtp({ phone: state.phone }));
        dispatch({ type: "codeRequest", payload: state.phone });
    }

    return [state, onSubmit, onRequestCode, timeLeft] as const;
};
