type FormState = {
    state: "enterNumber" | "enterCode" | "authed";
    phone?: number,
    errors?: { [key: string]: string };
    error?: string;
};

type ReducerAction =
    | { type: "continueAuth"; payload: string }
    | { type: "errorForm"; payload: { [key: string]: string } }
    | { type: "codeRequest"; payload: number }
    | { type: "successAuth" }

export const reducer = (state: FormState, action: ReducerAction): FormState => {
    switch (action.type) {
        case "continueAuth": {
            return { state: "enterCode", phone: action.payload };
        }

        case "errorForm":
            return {
                state: state.state,
                errors: action.payload.errors,
                phone: action.payload?.phone
            };

        case "successAuth": {
            return { state: "authed"};
        }

        case "codeRequest": {
            return { state: "enterCode", phone: action.payload  };
        }
    }

    return state;
};
