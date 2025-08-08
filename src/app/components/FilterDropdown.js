"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

import en from "@/app/translations/en";
import mk from "@/app/translations/mk";
import sq from "@/app/translations/sq";

const allTranslations = { en, mk, sq };

export default function FilterDropdown({
  type,
  setType,
  typeOptions,
  showTypeDropdown,
  setShowTypeDropdown
}) {
  const { language } = useLanguage();
  const t = allTranslations[language].filterDropdown;

  return (
    <div
      className={`rounded-lg px-6 py-3 text-lg min-w-[220px] flex items-center cursor-pointer relative transition-all duration-200 
        ${showTypeDropdown ? 'bg-white border-2 border-[#FF7A1A] shadow-[0_4px_24px_#ff7a1a22]' : 'bg-[#fafafa] border border-[#eee] shadow-none'} 
        ${type ? 'text-[#FF7A1A]' : 'text-[#888]'}`}
      onClick={() => setShowTypeDropdown(v => !v)}
      tabIndex={0}
      onBlur={() => setTimeout(() => setShowTypeDropdown(false), 150)}
    >
      <span className="text-[#FF7A1A] mr-[10px]">
        <img src="/filter.svg" alt={t.filterIconAlt} className="w-[18px] h-[18px]" />
      </span>
      <span className="flex-1">
        {type || t.placeholder}
      </span>
      <span
        className={`ml-[10px] transition-transform duration-200 ${showTypeDropdown ? 'rotate-180' : ''}`}
      >
        <img src="/down-arrow.svg" alt={t.downArrowAlt} className="w-8 h-8" />
      </span>

      {showTypeDropdown && (
        <div
          className="absolute top-full left-0 w-full bg-white border-2 border-[#FF7A1A] border-t-0 rounded-b-lg shadow-[0_8px_32px_#ff7a1a22] z-[100]"
        >
          {typeOptions.map(option => (
            <div
              key={option}
              onClick={() => { setType(option); setShowTypeDropdown(false); }}
              className={`px-6 py-[14px] cursor-pointer border-b border-[#f5e6d6] 
                ${option === type
                  ? 'text-[#FF7A1A] bg-[#fff3e6] font-semibold'
                  : 'text-[#555] bg-white font-normal'
                }`}
              onMouseDown={e => e.preventDefault()}
            >
              {option}
            </div>
          ))}
          <div
            onClick={() => { setType(''); setShowTypeDropdown(false); }}
            className="px-6 py-[14px] cursor-pointer text-[#888]"
            onMouseDown={e => e.preventDefault()}
          >
            {t.clearFilter}
          </div>
        </div>
      )}
    </div>
  );
}
