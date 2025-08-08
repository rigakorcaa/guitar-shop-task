"use client";

import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams, useRouter } from "next/navigation";
import FilterDropdown from "@/app/components/FilterDropdown";
import SearchInput from "@/app/components/SearchInput";
import Footer from "@/app/components/Footer";

import { useLanguage } from "@/context/LanguageContext";
import en from "@/app/translations/en";
import mk from "@/app/translations/mk";
import sq from "@/app/translations/sq";

const allTranslations = { en, mk, sq };

const GET_MODELS = gql`
  query Models($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      price
      image
    }
  }
`;

const BRANDS_STATIC = [
  { id: "1", displayName: "Fender", logo: "fender.png" },
  { id: "2", displayName: "Ibanez", logo: "ibanez.png" },
  { id: "3", displayName: "Gibson", logo: "gibson.png" },
  { id: "5", displayName: "Martin & Co.", logo: "martin.png" },
  { id: "6", displayName: "Taylor", logo: "taylor.png" },
  { id: "7", displayName: "Gretsch", logo: "gretsch.png" },
  { id: "8", displayName: "Takamine", logo: "takamine.png" },
  { id: "9", displayName: "Seagull", logo: "seagull.png" },
];

export default function ModelsPage() {
  const { language } = useLanguage();
  const t = allTranslations[language].modelsPage;

  const searchParams = useSearchParams();
  const router = useRouter();
  const brandId = searchParams.get("brand");

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_MODELS, {
    variables: {
      id: brandId,
      sortBy: { field: "name", order: "ASC" },
    },
    skip: !brandId,
  });

  if (!brandId) return <p>{t.noBrandSelected}</p>;
  if (loading) return <div className="text-center m-12">{t.loadingModels}</div>;
  if (error) {
    console.error("Apollo error object:", error);
    return (
      <div className="text-red-600 text-center m-12">
        {t.errorLoadingModels}
        <br />
        {error.message}
      </div>
    );
  }

  const models = data?.findBrandModels || [];

  const typeOptions =
    Array.from(new Set(models.map((m) => m.type))).filter(Boolean).length > 0
      ? Array.from(new Set(models.map((m) => m.type)))
      : [t.defaultTypeOptions.bass, t.defaultTypeOptions.acoustic, t.defaultTypeOptions.electric];

  let filteredModels = type ? models.filter((m) => m.type === type) : models;
  if (search.trim()) {
    filteredModels = filteredModels.filter((m) =>
      m.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }

  // Pagination
  const MODELS_PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(filteredModels.length / MODELS_PER_PAGE));
  const pagedModels = filteredModels.slice((page - 1) * MODELS_PER_PAGE, page * MODELS_PER_PAGE);

  // Clamp page if needed
  if (page > totalPages && totalPages > 0) setPage(totalPages);

  const brand = BRANDS_STATIC.find((b) => b.id === brandId) || BRANDS_STATIC[0];
  const brandName = brand.displayName;
  const brandLogo = `/brands/${brand.logo}`;
  const brandDesc = t.brandDesc.replace("{brandName}", brandName);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center pt-8 px-12">
        <a href="/brands" className="text-[#222] no-underline text-[14px] font-medium mr-6">
          <img
            src="/left-arrow.svg"
            alt={t.backArrowAlt}
            className="w-[12px] h-[12px] object-contain inline-block mr-1 mb-[2px]"
          />
          {t.backToHome}
        </a>
      </header>

      <div className="flex items-center ml-[120px] mt-[6px]">
        <img src="/vibestrings-logo.png" alt={t.vibeStringsLogoAlt} className="w-10 h-10 mr-3" />
        <span className="text-[28px] tracking-[-0.02em]">VibeStrings</span>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center w-full">
        <section className="w-full flex items-start justify-between px-12 mt-6">
          <div className="max-w-[540px] mt-8 text-center ml-25">
            <h1 className="text-[48px] font-bold leading-[1.1] mb-4">
              {t.heroTitlePrefix} <span className="text-[#ff5c1a]">{t.heroTitleHighlight}</span>
            </h1>
            <p className="text-[16px] text-[#666] leading-[1.6]">{brandDesc}</p>
          </div>

          <div className="flex-1 flex justify-end items-start">
            <div
              className="absolute top-0 right-0 w-[600px] h-[350px] rounded-bl-[300px] rounded-br-[150px] bg-gradient-to-b from-[#ff9f66] to-[#ff5c1a] flex items-center justify-center overflow-visible pb-6 box-border"
            >
              <img
                src={brandLogo}
                alt={`${brandName} logo`}
                className="w-[220px] object-contain mb-0 mt-[40px]"
              />
              <div className="absolute left-1/2 bottom-[-40px] transform -translate-x-1/2 w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.1)] z-10">
                <img src="/vibestrings-logo.png" alt="Vibe Strings" className="w-[45px] h-[45px]" />
              </div>
            </div>
          </div>
        </section>

        {/* Selection Heading */}
        <h2 className="text-[32px] font-semibold mt-[220px] mb-6 text-center">
          {t.selectionTitlePrefix} <span className="text-[#FF7A1A]">{t.selectionTitleHighlight}</span>
        </h2>

        <div className="flex gap-4 justify-center mb-10">
          <FilterDropdown
            type={type}
            setType={setType}
            typeOptions={typeOptions}
            showTypeDropdown={showTypeDropdown}
            setShowTypeDropdown={setShowTypeDropdown}
          />
          <SearchInput search={search} setSearch={setSearch} />
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-3 gap-12 w-full max-w-[1200px] mx-auto mb-8">
          {pagedModels.map((model) => (
            <div
              key={model.id}
              className="text-left cursor-pointer"
              onClick={() => router.push(`/details?brand=${brandId}&model=${model.id}`)}
            >
              {model.image && (
                <img src={model.image} alt={model.name} className="w-[320px] h-[220px] object-contain mb-4" />
              )}
              <div className="font-medium text-[18px] mb-1">{model.name}</div>
              <div className="text-[#888] font-thin text-[12px]">${model.price}</div>
            </div>
          ))}
        </div>

        {/* Results count and pagination */}
        <div className="flex justify-between items-center w-full px-[100px]">
          <div className="text-[#888] text-[15px] text-left">
            {t.showingResults}
            {" "}
            <span className="text-black font-medium">{pagedModels.length}</span>{" "}
            {t.resultsFrom}{" "}
            <span className="text-black font-medium">{filteredModels.length}</span>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            <button
              className="border-none bg-[#fafafa] text-[#888] text-[12px] px-4 py-2 rounded-[6px] cursor-pointer"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <img
                src="/left-arrow.svg"
                alt={t.previous}
                className={`w-[10px] h-[10px] ${page === 1 ? "opacity-40" : "opacity-100"}`}
              />
            </button>

            {(() => {
              const btns = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; ++i) {
                  btns.push(i);
                }
              } else {
                btns.push(1);
                if (page > 3) btns.push("left-ellipsis");
                for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); ++i) {
                  btns.push(i);
                }
                if (page < totalPages - 2) btns.push("right-ellipsis");
                btns.push(totalPages);
              }
              return btns.map((p, idx) => {
                if (p === "left-ellipsis" || p === "right-ellipsis") {
                  return (
                    <span key={p + idx} className="text-[#888] text-[8px] px-2 select-none">
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={p}
                    style={{ outline: p === page ? "2px solid #FF7A1A" : "none" }}
                    className={`px-4 py-2 rounded-[6px] text-[12px] ${
                      p === page
                        ? "border-2 border-[#FF7A1A] bg-white text-[#FF7A1A] font-semibold cursor-default"
                        : "bg-[#fafafa] text-[#888] font-medium cursor-pointer"
                    }`}
                    disabled={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                );
              });
            })()}

            <button
              className="border-none bg-[#fafafa] text-[#888] text-[12px] px-4 py-2 rounded-[6px] cursor-pointer"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <img
                src="/right-arrow.svg"
                alt={t.forward}
                className={`w-[10px] h-[10px] ${page === totalPages ? "opacity-40" : "opacity-100"}`}
              />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
