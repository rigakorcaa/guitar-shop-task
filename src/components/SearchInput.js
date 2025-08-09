"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

import en from "@/app/translations/en";
import mk from "@/app/translations/mk";
import sq from "@/app/translations/sq";

const allTranslations = { en, mk, sq };

export default function SearchInput({ search, setSearch }) {
  const { language } = useLanguage();
  const t = allTranslations[language].searchInput;

  return (
    <div className="relative inline-block">
      <img
        src="/search.svg"
        alt="search"
        className="w-5 h-5 absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none"
      />
      <input
        type="text"
        placeholder={t.placeholder}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="bg-[#fafafa] border border-[#eee] rounded-md px-6 py-[18px] pl-[44px] text-lg min-w-[220px]"
      />
    </div>
  );
}
