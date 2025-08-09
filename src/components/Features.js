"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

import en from "@/app/translations/en";
import mk from "@/app/translations/mk";
import sq from "@/app/translations/sq";

const allTranslations = { en, mk, sq };

export default function Features() {
  const { language } = useLanguage();
  const t = allTranslations[language].features;

  return (
    <div className="bg-[#181818] text-white mt-20 py-14 text-center">
      <div className="text-[28px] font-semibold mb-8">
        {t.title} <span className="text-[#ff5c1a]">{t.highlight}</span>
      </div>

      <div className="flex justify-center gap-20">
        {t.items.map(({ icon, alt, title, description }, i) => (
          <FeatureItem
            key={i}
            icon={icon || getIconByIndex(i)}
            alt={alt}
            title={title}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureItem({ icon, alt, title, description }) {
  return (
    <div>
      <div className="text-[32px] mb-2">
        <div className="bg-[#444444] rounded-[16px] w-16 h-16 flex items-center justify-center mx-auto">
          <img
            src={icon}
            alt={alt}
            className="w-12 h-12 object-contain inline-block"
          />
        </div>
      </div>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-[#bdbdbd] text-sm">{description}</div>
    </div>
  );
}

function getIconByIndex(i) {
  switch (i) {
    case 0:
      return "/smooth-browsing.svg";
    case 1:
      return "/easy-delivery.svg";
    case 2:
      return "/swift-payment.svg";
    default:
      return "";
  }
}
