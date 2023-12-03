import { iSpaceData } from "@/types/space";
import axios from "axios";
import useAuthKey from "./useAuthKey";
import toast from "react-hot-toast";

export default function useSpace() {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/space`;
    const token = useAuthKey()

    const addSpace = async (data: iSpaceData) => {
        const { owner: ownerName, amount, description: desc, images, payType, spaceType, title } = data
        return await axios
            .post(`${url}/add`,
                {
                    lng: 23, lat: 140, ownerName, amount, desc,
                    spaceType: spaceType.toUpperCase(),
                    payType: payType.toUpperCase(), title
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((res) => {
                toast.success("Space Registered!");
                return res;
            })
            .catch((error) => {
                toast.error("Failed to Register Space!");
                return;
            });
    }

    return { addSpace }
}
