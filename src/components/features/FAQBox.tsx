"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FAQ_DATA } from "../../lib/constants";

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQ_DATA)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const panelId = `faq-panel-${faq.id}`;
  const buttonId = `faq-button-${faq.id}`;

  return (
    <div className="overflow-hidden rounded-xl bg-card md:rounded-2xl">
      <h3>
        <button
          id={buttonId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary sm:p-5"
        >
          <span className="pr-4 font-montserrat text-base font-medium text-card-foreground sm:text-lg md:text-xl">
            {faq.question}
          </span>
          <span
            aria-hidden="true"
            className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border text-sm font-bold text-card-foreground transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={{ height: isOpen ? height : 0 }}
        className="overflow-hidden transition-[height] duration-200 ease-out"
      >
        <div ref={contentRef} className="px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6">
          <p className="font-montserrat text-sm leading-relaxed text-text-gray sm:text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

const FAQBox = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="flex flex-col gap-3 md:gap-4" role="list">
      {FAQ_DATA.map((faq) => (
        <div key={faq.id} role="listitem">
          <FAQItem
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => toggleFAQ(faq.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default FAQBox;
