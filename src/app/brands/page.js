"use client";
import React from "react";
import Footer from "@/app/components/Footer";
import BrandsGrid from "@/app/components/BrandsGrid";
import Features from "@/app/components/Features";

import en from "@/app/translations/en";
import mk from "@/app/translations/mk";
import sq from "@/app/translations/sq";


import { useLanguage } from "@/context/LanguageContext";

const allTranslations = { en, mk, sq };

export default function BrandsPage() {
  const { language } = useLanguage();
  const t = allTranslations[language].brandsPage;

  return (
    <div className="bg-white min-h-screen">
      {/* Header with logo */}
      <div className="flex items-center justify-start pt-8 max-w-[1200px] mx-auto relative min-h-[48px]">
        <img
          src="/vibestrings-logo.png"
          alt="VibeStrings Logo"
          className="w-10 h-10 mr-4"
        />
        <span className="font-thin text-[28px] tracking-[0.5px]">
          VibeStrings
        </span>
      </div>

      {/* Hero Section */}
      <div className="flex items-start justify-between pt-12 max-w-[1200px] mx-auto relative">
        <div className="w-[60%] flex flex-col items-start justify-between px-12 mt-6">
          <div className="text-[60px] font-semibold text-[#222] mb-2 mt-2 text-center">
            {t.heroTitle.split(t.heroTitleHighlight)[0]}
            <span className="text-[#ff5c1a]">{t.heroTitleHighlight}</span>
            {t.heroTitle.split(t.heroTitleHighlight)[1]}
          </div>
          <div className="text-[#888] text-lg mb-0 text-center">
            {t.heroSubtitle}
          </div>
        </div>
      </div>

      {/* Hero Image with logo cutout */}
      <div className="absolute top-0 right-0 flex flex-1 justify-end items-start w-[650px] h-[550px]">
        <img
          src="/hero-guitar.jpg"
          alt={t.heroImageAlt || "Guitar and amp by the sea"}
          className="w-full h-full object-cover rounded-bl-[350px] rounded-br-[150px] shadow-[0_8px_32px_rgba(0,0,0,0.10)] bg-[#eee] block"
          loading="eager"
        />
        <img
          src="/vibestrings-logo.png"
          alt={t.logoCutoutAlt || "VibeStrings Logo Cutout"}
          className="absolute left-1/2 bottom-[-28px] w-[60px] h-[60px] bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border-4 border-white -translate-x-1/2 z-20"
        />
      </div>

      {/* Brands Section */}
      <div className="mt-[220px] text-center">
        <div className="text-[42px] font-bold text-[#222]">
          {t.featuredTitle.split(t.featuredHighlight)[0]}
          <span className="text-[#ff5c1a]">{t.featuredHighlight}</span>
          {t.featuredTitle.split(t.featuredHighlight)[1]}
        </div>
        <div className="text-[#888] text-[16px] mt-2">{t.featuredSubtitle}</div>
        <BrandsGrid />
      </div>

      <Features />

      <div className="flex items-center justify-center mt-20 w-full min-h-[500px] gap-0 relative max-w-[1200px] mx-auto px-4">
        <div className="flex-1 text-center pr-8 z-20">
          <div className="text-[48px] font-normal text-[#222] mb-8 leading-[1.5] font-inherit">
            {t.browseText1}
            <span className="text-[#ff5c1a]">{t.browseText2}</span><br />
            {t.browseText3}
          </div>
          <div className="mt-8 flex justify-center gap-6">
            <img
              src="/googleplay-badge.png"
              alt="Google Play"
              className="h-[55px] cursor-pointer"
            />
            <img
              src="/appstore-badge.png"
              alt="App Store"
              className="h-[55px] cursor-pointer"
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-start min-h-[500px]">
          <img
            src="/app-preview.png"
            alt={t.appPreviewAlt || "App preview"}
            className="w-[650px] h-[520px] object-contain max-w-full max-h-full block"
            loading="lazy"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
