"use client";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
    }
  }
`;

const BRANDS_STATIC = [
  { id: "2", displayName: "Ibanez", apiName: "Ibanez", logo: "ibanez.png" },
  { id: "5", displayName: "Martin & Co.", apiName: "Martin", logo: "martin.png" },
  { id: "1", displayName: "Fender", apiName: "Fender", logo: "fender.png" },
  { id: "3", displayName: "Gibson", apiName: "Gibson", logo: "gibson.png" },
  { id: "6", displayName: "Taylor", apiName: "Taylor", logo: "taylor.png" },
  { id: "7", displayName: "Gretsch", apiName: "Gretsch", logo: "gretsch.png" },
  { id: "8", displayName: "Takamine", apiName: "Takamine", logo: "takamine.png" },
  { id: "9", displayName: "Seagull", apiName: "Seagull", logo: "seagull.png" },
];

function BrandsGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-4 gap-10 justify-center items-center mx-auto max-w-[1400px] mt-[72px] mb-[72px]">
      {BRANDS_STATIC.map((brand) => (
        <div
          key={brand.id}
          onClick={() => router.push(`/models?brand=${encodeURIComponent(brand.id)}`)}
          className="cursor-pointer flex items-center justify-center p-3"
        >
          <img
            src={`/brands/${brand.logo}`}
            alt={`${brand.displayName} logo`}
            className="max-w-[220px] max-h-[120px] w-full h-auto filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-200"
          />
        </div>
      ))}
    </div>
  );
}

export default BrandsGrid;
