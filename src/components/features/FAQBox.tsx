"use client";

import { useState } from "react";
import { FAQ_DATA } from "../../lib/constants";

const FAQBox = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {FAQ_DATA.map((faq) => (
        <div
          key={faq.id}
          className="bg-white rounded-xl md:rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full flex items-center justify-between p-3 sm:p-4 text-left transition-colors"
          >
            <h3 className="text-[#21272A] font-montserrat text-base sm:text-lg md:text-xl font-medium pr-2">
              {faq.question}
            </h3>
            <div className="text-[#21272A] text-xl sm:text-2xl font-bold flex-shrink-0">
              {openId === faq.id ? "−" : "+"}
            </div>
          </button>
          
          {openId === faq.id && (
            <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
              <p className="text-[#21272A] font-montserrat text-sm sm:text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQBox