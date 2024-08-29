"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="absolute h-screen w-screen bg-black/80"
      onClose={onDismiss}
    >
      <div>
        <button
          onClick={onDismiss}
          className={`absolute right-4 top-4 flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-800`}
        >
          <span className="sr-only">Close</span>X
        </button>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
