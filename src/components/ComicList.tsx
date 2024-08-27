import Image from "next/image";

export function ComicList({ comics }: { comics: any[] }) {
  return (
    <div className="comics-list">
      {comics.map((comic) => {
        // Extract the on sale date from the dates array with inline typing
        const onSaleDate = comic.dates.find(
          (date: { type: string; date: string }) => date.type === "onsaleDate",
        )?.date;

        return (
          <div key={comic.id} className="comic-item">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              width={150}
              height={150}
            />
            <p>Title: {comic.title}</p>
            {/* Display the on sale date in a human-readable format */}
            {onSaleDate && (
              <p>
                Publication Date: {new Date(onSaleDate).toLocaleDateString()}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
