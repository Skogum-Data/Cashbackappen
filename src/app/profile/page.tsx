"use client";
import useSWR from "swr";
import { fetchUserProfile } from "@/utils/supabase/fetcher";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Transactions from "@/componets/user/transactions";
import { EditProfileModal, UserProfile } from "@/componets/user/editProfileModal";
import ContentCard from "@/componets/cards/content_card";



export default function ProfilePage() {
  const router = useRouter();
  const { data: profile, error, isLoading, mutate } = useSWR("userprofile", fetchUserProfile, {
    refreshInterval: 60000, // 60 seconds
    revalidateOnFocus: false,
  });
  const [editOpen, setEditOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/signup");
  };

  if (isLoading) return <div className="text-white text-center mt-12">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-12">{error.message || error.toString()}</div>;
  if (!profile) return <div className="text-white text-center mt-12">No profile found.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-16">
      <EditProfileModal
        profile={profile}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={(updated: UserProfile) => {
          mutate(updated, false); // update cache immediately
          setEditOpen(false);
        }}
      />
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <div className="bg-indigo-400 rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
          <span className="text-3xl font-bold">{profile.email?.charAt(0)?.toUpperCase() || "U"}</span>
        </div>
        <h1 className="text-3xl text-black font-extrabold mb-1">Profil</h1>
        <p className="text-indigo-700 mb-4">{profile.email}</p>
        <div className="bg-white rounded-xl shadow p-4 w-full mb-4">
          <span className="font-semibold text-black">Kontonummer:</span>
          <div className="text-lg text-black">
            {profile.bank_account_number || <span className="italic text-gray-400">Not set</span>}
          </div>
          <span className="text-gray-500 text-sm">Ved uttak, sendes pengene til dette kontonummeret</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 w-full mb-4">
          <span className="font-semibold text-black">Penger spart:</span>
          <div className="text-lg text-black">
            {profile.account_balance || <span className="italic text-gray-400">0</span>} kr
          </div>
          <span className="text-gray-500 text-sm">Sum som er klart til uttak</span>
        </div>
        <button
          className="w-full mt-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow text-white"
          onClick={() => setEditOpen(true)}
        >
          Uttak
        </button>
         <button
          className="w-full mt-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow text-white"
          onClick={() => setEditOpen(true)}
        >
          Rediger profil
        </button>
        <button
          onClick={handleSignOut}
          className="w-full mt-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold shadow text-white"
        >
          Logg ut
        </button>
      </div>
      <div className="mt-12">
        <Transactions />
      </div>
      <ContentCard
        title="Ser du ikke de nylige transaksjonene dine?"
        text=" Det kan ta tid før transaksjonene dine vises her. Dette fordi kjøpene behandles av hver enkelt butikk med varierende tidsaspekt. "
      />
    </div>
  );
}