"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type LightboxProps = {
  src: string | null;
  onClose: () => void;
  alt: string;
};

export function Lightbox({ src, onClose, alt }: LightboxProps) {
  return (
    <AnimatePresence>
      {src ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
        >
          <motion.button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full border border-white/30 bg-black/40 p-2 text-white"
          >
            <X size={18} />
          </motion.button>
          <motion.div
            initial={{ scale: 0.92, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0.5 }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[82vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20"
          >
            <Image
              src={src}
              alt={alt}
              width={1500}
              height={900}
              className="h-auto w-full object-contain"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
