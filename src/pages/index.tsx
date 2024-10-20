import { AuthForm } from "./auth/auth-form";
import { logout, requestSession } from "@/lib/api";
import { Button } from "@/components";
import { wrapper } from "@/store/store";
import { GetServerSideProps } from "next";
import { selectUser } from "@/store/auth/auth-slice";
import { useSelector } from "react-redux";

const HomePage = ({ authUser }) => {
    const user = useSelector(selectUser);

    if (user || authUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-xl text-black font-bold mb-2">Успешный вход!</h1>
                <Button onClick={logout}>{"Выйти из аккаунта"}</Button>
            </div>
        )
    }

    return (
        <div>
            <AuthForm />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ req }) => {
        try {
            if (req.headers.cookie != null) {
                const cookies = req.headers.cookie
                    .split("; ")
                    .reduce((acc, currentCookie) => {
                        const [name, value] = currentCookie.split("=");
                        acc[name] = value;
                        return acc;
                    }, {} as Record<string, string>);

                const token = cookies.jwt || null;

                if (token) {
                    const result = await store.dispatch(requestSession({ token }));

                    if (result) {
                        const authUser = result.payload.user;

                        return { props: { authUser: authUser } };
                    }
                }
                return { props: { authUser: null } };
            }
        } catch (err) {
            return { props: { authUser: null } };
        }
    }
);

export default HomePage;
