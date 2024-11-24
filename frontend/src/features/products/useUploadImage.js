import { useMutation } from "@tanstack/react-query";
import { uploadImageApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

export default function useUploadImage() {
  const {mutate: uploadImage, isPending} = useMutation({
    mutationFn: (data) => uploadImageApi(data),
    onSuccess: () => {
      toast.success('Image uploaded successfully');
    },
    onError: (error) => {
      toast.error('Failed to upload image' + error);
    },
  })

  return {uploadImage, isPending}
}