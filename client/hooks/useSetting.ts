import axios from "axios";
import toast from "react-hot-toast";
import useAuthKey from "./useAuthKey";

function useSettings() {
    const token = useAuthKey();
    const updatePassword = async (oldPassword: string, newPassword: string) => {
        return await axios
            .patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/settings/password`, {
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                toast.success(res.data.message);
                return res;
            })
            .catch((error) => {
                throw new Error(error.message)
            });

    };

    return { updatePassword };
}

export default useSettings;
