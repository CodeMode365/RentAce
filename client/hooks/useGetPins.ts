import axios from "axios";
import toast from "react-hot-toast";

export const useGetPins = async () => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/pin`
        );
        toast.success("Pins fetched!");
        return res.data
    } catch (error) {
        console.error(error);
        toast.error("Error fetching the Pins!");
        return []
    }
}