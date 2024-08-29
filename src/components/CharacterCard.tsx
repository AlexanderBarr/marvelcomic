// CharacterCard.tsx
"use client";
import Link from "next/link";
import Image from "next/image";

interface CharacterCardProps {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export function CharacterCard({ id, name, thumbnail }: CharacterCardProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Link
        href={`/character/${id}`}
        className="relative overflow-hidden rounded"
      >
        <Image
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={name}
          className="object-cover"
          width={200}
          height={200}
        />
      </Link>
      <span className="text-center text-lg font-semibold text-white">
        {name}
      </span>
    </div>
  );
}
