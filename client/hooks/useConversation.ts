import axios from "axios";
import useAuthKey from "./useAuthKey"

export default function useConversation() {

    const token = useAuthKey()
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/conversation`;

    const createConversation = async (receiverId: string) => {
        const response = await axios.post(
            url,
            { receiverId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status != 200) {
            const error = JSON.parse(await response.data.message());
            throw new Error(error.message);
        }

        return response
    }

    const deleteConversation = async (conversationId: string) => {
        const response = await axios.delete(
            `${url}/${conversationId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status != 200) {
            const error = JSON.parse(await response.data.message());
            throw new Error(error.message);
        }

        return response
    }

    return { createConversation, deleteConversation }
}
