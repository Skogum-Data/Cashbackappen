import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center bg-black">
      {/* Banner image stretching across the screen */}
       <div className="relative w-screen max-w-none -mx-4 sm:-mx-8 md:-mx-20 h-56 md:h-72 mb-[-4rem]">
      

        {/* Card on top of the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 max-w-lg w-full mx-4">
            <h1 className="text-3xl font-bold mb-2 text-black text-center">Velkommen til CashbackApp</h1>
            <p className="text-lg text-gray-700 text-center">
              Din plattform for å få igjen litt av de pengene du bruker!
            </p>
          </div>
        </div>
      </div>

            <div className="max-w-4xl w-full mt-20">
              <h1 className="text-3xl font-bold mb-8 text-white text-center">Hvordan fungerer det?</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link
                    href="/signup"
                    className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 mx-4 flex flex-col items-center transition hover:bg-indigo-100 hover:shadow-xl"
                    style={{ textDecoration: "none" }}
        >
                <span className="text-4xl mb-4">1️⃣</span>
                <p className="text-black text-center font-semibold mb-2">Registrer konto...</p>
                <p className="text-black text-center"> ... og legg til bankkontonummeret ditt.</p>
                </Link>
                <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 mx-4 flex flex-col items-center">
                  <span className="text-4xl mb-4">2️⃣</span>
                  <p className="text-black text-center font-semibold mb-2">Besøk butikker</p>
                  <p className="text-black text-center">... ved å bruke lenkene på vår side til samarbeidende butikker.</p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 mx-4 flex flex-col items-center">
                  <span className="text-4xl mb-4">3️⃣</span>
                  <p className="text-black text-center font-semibold mb-2">Handle ...</p>
                  <p className="text-black text-center">... og vi sporer kjøpet ditt og du får cashback når kjøpet er bekreftet.</p>
                </div>
              </div>
            </div>
      </div>
      
    
  );
}