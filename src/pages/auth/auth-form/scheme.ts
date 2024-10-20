import zod from "zod";

export const schema = zod.object({
    number: zod.string()
        .min(1, "Поле является обязательным")
        .refine((value) => /^[1-9]\d{10}$/.test(value),{
            message: "Некорректно набран номер",
        })
        .transform((value) => Number(value))
        .pipe(
            zod
                .number({ invalid_type_error: "Номер должен быть числом" })
        ),

    code: zod
        .string()
        .optional()
        .refine((value) => value === undefined || (value.length === 6), {
            message: "Код должен содержать 6 цифр",
        })
        .transform((value) => Number(value))
});

export type Schema = zod.infer<typeof schema>;
