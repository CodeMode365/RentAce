import axios from "axios";
import toast from "react-hot-toast";
import useAuthKey from "./useAuthKey";

function useMedia() {
  const uploadMedia = async (image: File | null | undefined) => {
    const formData = new FormData();
    const token = useAuthKey();

    if (image) {
      formData.append("image", image);

      return await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/media/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Media Uploaded!");
          return res;
        })
        .catch((error) => {
          toast.error("Failed to upload Media!");
          return;
        });
      console.log("Ok");
    } else {
      toast.error("No Profile Image Provided");
      return;
    }
  };
  const deleteMedia = async () => {};
  const getAllMedia = async () => {};

  return { uploadMedia, deleteMedia, getAllMedia };
}

export default useMedia;
