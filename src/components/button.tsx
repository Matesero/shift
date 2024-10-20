import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

export const Button = (props: Props) => {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-blue-700 px-5 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    />
  );
};
