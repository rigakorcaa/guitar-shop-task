'use client';

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import ModelTabs from "@/components/ModelTabs";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

import en from "@/app/translations/en";
import mk from "@/app/translations/mk";
import sq from "@/app/translations/sq";

const allTranslations = { en, mk, sq };

const GET_MODEL_DETAILS = gql`
  query Model($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      name
      type
      image
      description
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export default function DetailsPage() {
  const searchParams = useSearchParams();
  const modelId = searchParams.get('model');
  const brandId = searchParams.get('brand');

  const { language } = useLanguage();
  const t = allTranslations[language].detailsPage;


  const [tab, setTab] = useState('specs');
  const [musicianPage, setMusicianPage] = useState(1);
  const MUSICIANS_PER_PAGE = 2;

  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
    skip: !brandId || !modelId,
  });

  if (!modelId) return <p>No model selected.</p>;
  if (loading) return <div className="text-center m-12">Loading details...</div>;
  if (error) {
    console.error('Apollo error object:', error);
    return (
      <div className="text-red-600 text-center m-12">
        Error loading details.<br />
        {error.message}
      </div>
    );
  }

  const model = data?.findUniqueModel;
  if (!model) return <p>Model not found.</p>;

  const musicians = model.musicians || [];
  const totalMusicianPages = Math.max(1, Math.ceil(musicians.length / MUSICIANS_PER_PAGE));
  const visibleMusicians = musicians.slice((musicianPage - 1) * MUSICIANS_PER_PAGE, musicianPage * MUSICIANS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-700">
      {/* Header */}
      <header className="flex items-center pt-8 px-12">
        <a
          href={brandId ? `/models?brand=${brandId}` : '/models'}
          className="text-[#222] no-underline text-[14px] font-medium mr-6"
        >
          <img
            src="/left-arrow.svg"
            alt={t.leftArrowAlt}
            className="w-[12px] h-[12px] object-contain inline-block mr-1 mb-[2px]"
          />
          {t.backToList}
        </a>
      </header>

      <div className="flex items-center ml-[120px] mt-[6px]">
        <img
          src="/vibestrings-logo.png"
          alt="Vibe Strings Logo"
          className="w-10 h-10 mr-3"
        />
        <span className="text-[28px] tracking-[-0.02em]">VibeStrings</span>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center w-full">
        <section className="w-full flex items-start justify-between px-12 mt-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-[48px] font-bold leading-[1.1] mb-0 mt-12 text-center">
              {model.name}
            </h1>
          </div>

          <div className="flex-1 flex justify-end items-start">
            <div
              className="absolute top-0 right-0 w-[600px] h-[350px] rounded-bl-[300px] rounded-br-[150px] bg-gradient-to-b from-[#ff9f66] to-[#ff5c1a] flex items-center justify-center overflow-visible pb-6 box-border"
            >
              {model.image && (
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-[260px] object-contain mb-0 mt-[40px] -rotate-45"
                />
              )}

              <div className="absolute left-1/2 bottom-[-40px] transform -translate-x-1/2 w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.1)] z-10">
                <img src="/vibestrings-logo.png" alt="Vibe Strings" className="w-[45px] h-[45px]" />
              </div>
            </div>
          </div>
        </section>

        <ModelTabs model={model} initialTab="specs" musiciansPerPage={2} />
      </main>

      <Footer />
    </div>
  );
}
