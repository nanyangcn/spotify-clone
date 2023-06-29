import { useState } from 'react';
import uniqid from 'uniqid';
import {
  SubmitHandler, useForm,
} from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  type FieldValues = {
    author: string,
    title: string,
    song: FileList,
    image: FileList,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: undefined,
      image: undefined,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image[0] as File;
      const songFile = values.song[0] as File;

      const uniqueID = uniqid();

      // Upload Song File
      const {
        data: songData,
        error: songError,
      } = await supabaseClient.storage.from('songs')
        .upload(
          `song-${values.title}-${uniqueID}`,
          songFile,
          {
            cacheControl: '3600',
            upsert: false,
          },
        );
      if (songError) {
        setIsLoading(false);
        toast.error('Failed song upload.');
      }

      // Upload image File
      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient.storage.from('images')
        .upload(
          `image-${values.title}-${uniqueID}`,
          imageFile,
          {
            cacheControl: '3600',
            upsert: false,
          },
        );
      if (imageError) {
        setIsLoading(false);
        toast.error('Failed image upload.');
      }

      // Insert songs information
      const {
        error: supabaseError,
      } = await supabaseClient.from('songs')
        .insert({
          user_id: user?.id,
          title: values.title,
          author: values.author,
          image_path: imageData?.path,
          song_path: songData?.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success('Song uploaded!');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Error!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          label="Song Title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Please input the song title..."
          aria-required={!!errors.title}
          error={errors.title}
          errMsg="Song title is required."
        />
        <Input
          id="author"
          label="Song Author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Please input the song author..."
          aria-required={!!errors.author}
          error={errors.author}
          errMsg="Song Author is required."
        />
        <Input
          className="py-2 "
          id="song"
          label="Select a song file"
          type="file"
          disabled={isLoading}
          accept=".mp3"
          {...register('song', { required: true })}
          aria-required={!!errors.song}
          error={errors.song}
          errMsg="Song file is required."
        />
        <Input
          className="py-2"
          id="image"
          label="Select an image file"
          type="file"
          disabled={isLoading}
          accept="image/*"
          {...register('image', { required: true })}
          aria-required={!!errors.image}
          error={errors.image}
          errMsg="Image file is required."
        />
        <Button
          className="mt-2"
          type="submit"
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          Upload
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
