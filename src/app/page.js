"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/brands");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <img
            src="/vibestrings-logo.png"
            alt="VibeStrings Logo"
            className="w-16 h-16 mr-4"
          />
          <span className="font-thin text-[36px] tracking-[0.5px]">
            VibeStrings
          </span>
        </div>
        <h1 className="text-4xl font-semibold text-[#222] mb-4">
          Welcome to VibeStrings
        </h1>
        <p className="text-[#888] text-lg mb-8">
          Your ultimate destination for guitar brands and models
        </p>
        <button
          onClick={handleClick}
          className="bg-[#ff5c1a] text-white px-8 py-3 rounded-full font-medium hover:bg-[#e54d16] transition-colors duration-200 cursor-pointer"
        >
          Click for more
        </button>
      </div>
    </div>
  );
}
