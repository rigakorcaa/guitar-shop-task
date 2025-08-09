"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import en from "@/app/translations/en";
import mk from "@/app/translations/mk";
import sq from "@/app/translations/sq";
const allTranslations = { en, mk, sq };

export default function ModelTabs({ model = {}, initialTab = "specs", musiciansPerPage = 3 }) {
  const [tab, setTab] = useState(initialTab);
  const [musicianPage, setMusicianPage] = useState(1);

  const { language } = useLanguage();
  const t = allTranslations[language].modelsPage;

  const musicians = Array.isArray(model.musicians) ? model.musicians : [];

  const totalMusicianPages = Math.ceil(musicians.length / musiciansPerPage);

  useEffect(() => {
    if (totalMusicianPages === 0) {
      if (musicianPage !== 1) setMusicianPage(1);
    } else if (musicianPage > totalMusicianPages) {
      setMusicianPage(totalMusicianPages);
    } else if (musicianPage < 1) {
      setMusicianPage(1);
    }
  }, [totalMusicianPages]);

  const visibleMusicians = useMemo(() => {
    const start = (musicianPage - 1) * musiciansPerPage;
    return musicians.slice(start, start + musiciansPerPage);
  }, [musicians, musicianPage, musiciansPerPage]);

  return (
    <>
      {/* Tabs */}
      <div
        className="flex justify-around items-center w-full border-b-[1.5px] border-[#eee] mt-[220px]"
      >
        <button
          onClick={() => setTab("specs")}
          className={`bg-white outline-none transition duration-200 text-[20px] font-semibold py-4 px-8 mr-6
            ${tab === "specs" ? "text-[#FF7A1A] border-b-[3px] border-[#FF7A1A] cursor-default" : "text-[#888] cursor-pointer"}`}
          disabled={tab === "specs"}
          aria-pressed={tab === "specs"}
        >
          {t.specification}
        </button>

        <button
          onClick={() => setTab("musicians")}
          className={`bg-white outline-none transition duration-200 text-[20px] font-semibold py-4 px-8
            ${tab === "musicians" ? "text-[#FF7A1A] border-b-[3px] border-[#FF7A1A] cursor-default" : "text-[#888] cursor-pointer"}`}
          disabled={tab === "musicians"}
          aria-pressed={tab === "musicians"}
        >
          {t.whoPlaysIt}
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full mx-auto p-[120px]">
        {tab === "specs" ? (
          <div>
            {/* Description */}
            <div className="text-[22px] mb-8 leading-[1.6]">
              {model.description || t.noDescription}
            </div>

            {/* Specs list */}
            {model.specs && (
              <ul className="text-[20px] ml-6 mb-0 list-disc pl-[40px] leading-[1.5]">
                <li>{t.bodyWood}: "{model.specs.bodyWood || "N/A"}"</li>
                <li>{t.neckWood}: "{model.specs.neckWood || "N/A"}"</li>
                <li>{t.fingerboard}: "{model.specs.fingerboardWood || "N/A"}"</li>
                <li>{t.pickups}: "{model.specs.pickups || "N/A"}"</li>
                <li>{t.tuners}: "{model.specs.tuners || "N/A"}"</li>
                <li>{t.scaleLength}: "{model.specs.scaleLength || "N/A"}"</li>
                <li>{t.bridge}: "{model.specs.bridge || "N/A"}"</li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex gap-[48px] justify-center mb-8">
              {visibleMusicians.map((musician, idx) => (
                <div
                  key={(musician.name || "musician") + idx}
                  className="bg-[#fff3e6] rounded-[6px] shadow-[0_2px_16px_#ff7a1a11] p-6 w-[500px] h-[500px] flex flex-col items-center"
                >
                  {/* Musician image */}
                  <div
                    className="w-[460px] h-[460px] bg-[#222] rounded-[5px] mb-[18px] overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={musician.musicianImage}
                      alt={musician.name}
                      className="w-full h-full object-cover rounded-[5px]"
                    />
                  </div>

                  <div className="font-medium text-[20px] text-[#737373] mt-0">
                    {musician.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex gap-2 justify-center mt-2">
              {Array.from({ length: totalMusicianPages }).map((_, i) => (
                <span
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => setMusicianPage(i + 1)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setMusicianPage(i + 1);
                      e.preventDefault();
                    }
                  }}
                  className={`w-[12px] h-[12px] rounded-[6px] inline-block transition-colors duration-200 cursor-pointer ${musicianPage === i + 1 ? 'bg-[#FF7A1A]' : 'bg-[#eee]'}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
