import { iSpaceData } from "@/types/space";
import axios from "axios";
import useAuthKey from "./useAuthKey";
import toast from "react-hot-toast";
import { iAcutalImages } from "@/components/Modal/AddSpaceModal/Steps/Step2";

export default function useSpace() {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/space`;
    const token = useAuthKey()

    const addSpace = async (data: iSpaceData, actualImages: iAcutalImages[], pos: { lng: number, lat: number }) => {
        const { owner: ownerName, amount, description: desc, images, payType, spaceType, title } = data
        return await axios
            .post(`${url}/add`,
                {
                    lng: pos.lng, lat: pos.lat, ownerName, amount, desc,
                    spaceType: spaceType.toUpperCase(),
                    payType: payType.toUpperCase(), title,
                    images: actualImages
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
                throw new Error(error.message);
            });
    }

    return { addSpace }
}
