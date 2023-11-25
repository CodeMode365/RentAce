import axios from "axios";
import toast from "react-hot-toast";

function useMedia() {
  const uploadMedia = async (image: File | null | undefined) => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/media/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Media Uploaded!");
        console.log("Image uploaded:", res.data.data);
      })
      .catch((error) => {
        toast.error("Failed to upload Media!");
        console.error("Error:", error);
      });
  };
  const deleteMedia = async () => {};
  const getAllMedia = async () => {};

  return { uploadMedia, deleteMedia, getAllMedia };
}

export default useMedia;
