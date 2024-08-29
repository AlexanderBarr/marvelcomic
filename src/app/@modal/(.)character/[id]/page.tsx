import { Modal } from "./modal";
import { FullPageImageView } from "~/common/full-page-character-details";

export default async function CharacterDetailModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPageImageView photoId={photoId} />
    </Modal>
  );
}
