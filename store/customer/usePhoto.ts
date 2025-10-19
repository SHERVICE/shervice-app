import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

export interface UploadFile {
  uri: string;
  name: string;
  type: string;
}

interface UploadPhotoResponse {
  photo: string;
}

export function usePhotoEdit() {
  const mutationFn = async (file: UploadFile) => {
    const formData = new FormData();
    formData.append('photo', file as any);

    const response = await api.post<UploadPhotoResponse>(
      'client/profile/photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response;
  };

  return useMutation({
    mutationFn,
  });
}
