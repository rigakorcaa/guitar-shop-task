"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

import en from "@/app/translations/en";
import mk from "@/app/translations/mk";
import sq from "@/app/translations/sq";

const allTranslations = { en, mk, sq };

export default function Footer() {
  const { language, setLanguage } = useLanguage();
  const t = allTranslations[language].footer;

  return (
    <div className="bg-[#f5f5f5] text-[#222] mt-20 pt-12 pb-6">
      <div className="flex justify-between max-w-[1200px] mx-auto items-start">
        {/* Logo and contact */}
        <div>
          <div className="flex items-center">
            <img
              src="/vibestrings-logo.png"
              alt="VibeStrings Logo"
              className="w-[52px] h-[52px] mb-[10px]"
            />
            <span className="font-thin text-[42px] mb-[10px]">
              VibeStrings
            </span>
          </div>
          <div className="text-[#888]">
            <div>
              <span className="mr-2">
                <img
                  src="/footer/mail.svg"
                  alt="Mail"
                  className="w-5 h-5 object-contain inline-block mb-[2px]"
                />
              </span>
              {t.contactEmail}
            </div>
            <div>
              <span className="mr-2">
                <img
                  src="/footer/location.svg"
                  alt="Location"
                  className="w-5 h-5 object-contain inline-block mb-[2px]"
                />
              </span>
              {t.contactLocation}
            </div>
          </div>
        </div>

        {/* Pages */}
        <div>
          <div className="font-semibold mb-2">{t.pagesTitle}</div>
          <div className="text-[#888]">
            <div>{t.store}</div>
            <div>{t.collections}</div>
            <div>{t.support}</div>
          </div>
        </div>

        {/* Product */}
        <div>
          <div className="font-semibold mb-2">{t.productTitle}</div>
          <div className="text-[#888]">
            <div>{t.terms}</div>
            <div>{t.privacyPolicy}</div>
            <div>{t.copyright}</div>
          </div>
        </div>

        {/* Social */}
        <div>
          <div className="font-semibold mb-2">{t.followUs}</div>
          <div className="flex gap-4 text-2xl">
            <span>
              <img
                src="/footer/facebook.svg"
                alt="Facebook"
                className="w-5 h-5 object-contain inline-block mb-[2px]"
              />
            </span>
            <span>
              <img
                src="/footer/twitter.svg"
                alt="Twitter"
                className="w-5 h-5 object-contain inline-block mb-[2px]"
              />
            </span>
            <span>
              <img
                src="/footer/instagram.svg"
                alt="Instagram"
                className="w-5 h-5 object-contain inline-block mb-[2px]"
              />
            </span>
          </div>

 {/* Language Switcher Dropdown */}
          <select
            className="border border-gray-400 rounded mt-4 px-2 py-1 cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select Language"
          >
            <option value="en">English</option>
            <option value="mk">Македонски</option>
            <option value="sq">Shqip</option>
          </select>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-[#888] mt-8 text-sm">
        <span>
          <img
            src="/footer/copyright.svg"
            alt="Copyright"
            className="w-5 h-5 object-contain inline-block mb-[2px]"
          />
        </span>{" "}
        {t.copyrightText}
      </div>
    </div>
  );
}
