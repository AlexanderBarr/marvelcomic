"use client";
import Image from "next/image";
import { ComicList } from "~/components/ComicList";
import { useCharacterData } from "~/app/hooks/useCharacterData";
import { LoadingScreen } from "~/components/LoadingScreen";

export function FullPageImageView({ photoId }: { photoId: string }) {
  const { isBusy, image, comics } = useCharacterData(photoId);

  if (isBusy) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
      <div className="flex-shrink flex-grow">
        {image && (
          <Image
            src={`${image.thumbnail.path}.${image.thumbnail.extension}`}
            alt={image.name}
            className="object-contain"
            width={600} // Adjust as needed
            height={600} // Adjust as needed
          />
        )}
      </div>
      <div className="w-500 flex h-full flex-shrink-0 flex-col overflow-hidden border-l">
        <div className="border-b p-2 text-center text-xl">{image?.name}</div>
        <div>Description:</div>
        <div>{image?.description}</div>
        <div className="flex overflow-y-scroll p-2">
          <ComicList comics={comics} />
        </div>
      </div>
    </div>
  );
}
