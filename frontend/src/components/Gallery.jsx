import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/translations";
import { galleryImages } from "@/lib/images";
import { GalleryLightbox } from "@/components/GalleryLightbox";

export const Gallery = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + galleryImages.length) % galleryImages.length), []);
  const next = useCallback(() => setActive((i) => (i + 1) % galleryImages.length), []);

  return (
    <section id="gallery" className="relative py-28 md:py-40" style={{ background: "var(--charcoal)" }} data-testid="gallery-section">
      <div className="container-lux">
        <div className="mb-16 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">{t.gallery.label}</span>
            <h2 className="mt-5 font-serif text-5xl text-[color:var(--ivory)] md:text-7xl">{t.gallery.title}</h2>
          </div>
          <p className="max-w-xs text-sm text-[color:var(--taupe)]">{t.gallery.subtitle}</p>
        </div>

        {/* Editorial masonry via CSS columns */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.id}
              onClick={() => setActive(i)}
              data-testid={`gallery-item-${i}`}
              aria-label={t.a11y.openGalleryImage}
              className="group relative block w-full overflow-hidden"
              style={{ border: "1px solid var(--brown)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={img.src}
                alt={t.gallery.alt[img.altKey]}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{
                  aspectRatio: img.span === "tall" ? "3 / 4.4" : "3 / 3.6",
                  objectPosition: img.objectPosition,
                }}
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "rgba(11,10,9,0.22)" }} />
            </motion.button>
          ))}
        </div>
      </div>

      <GalleryLightbox index={active} onClose={close} onPrev={prev} onNext={next} />
    </section>
  );
};
