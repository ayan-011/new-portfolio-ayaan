"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen loader that stays visible until every <img> on the page
 * has finished loading (or failed), then fades out.
 *
 * Usage (app/layout.tsx):
 *   <body>
 *     <PageLoader />
 *     {children}
 *   </body>
 */
export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const images = Array.from(document.images);

    const pending = images.filter((img) => !img.complete);

    // Nothing left to wait for
    if (pending.length === 0) {
      setLoading(false);
      return;
    }

    let remaining = pending.length;

    const done = () => {
      remaining -= 1;
      if (remaining <= 0) setLoading(false);
    };

    pending.forEach((img) => {
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true }); // don't hang on broken images
    });

    // Safety net: never block the page for more than 8 seconds
    const timeout = setTimeout(() => setLoading(false), 8000);

    return () => {
      clearTimeout(timeout);
      pending.forEach((img) => {
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
      });
    };
  }, []);

  // Remove from the DOM after the fade-out finishes
  if (hidden) return null;

  return (
    <div
      onTransitionEnd={() => !loading && setHidden(true)}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        loading ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-[#0F6292]" />
    </div>
  );
}