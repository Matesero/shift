import { Button } from "@/components";

type Props = {
    label: string;
};

export const AuthButton: React.FC<Props> = ({ label }: Props) => {
    return (
        <div>
            <Button type="submit">
                {label}
            </Button>
        </div>
    );
};
