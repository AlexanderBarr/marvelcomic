import { Modal } from "./modal";
import { FullPageCharacterDetails } from "~/common/full-page-character-details";

export default async function CharacterDetailModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPageCharacterDetails photoId={photoId} />
    </Modal>
  );
}
