import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";


// You can put this in a types file or at the top of both files
export type UserProfile = {
  user_id: string;
  email: string;
  bank_account_number?: string;
  account_balance?: number;
  // Add other fields as needed
};

export type EditProfileModalProps = {
  profile: UserProfile | null;
  open: boolean;
  onClose: () => void;
  onSave: (updated: UserProfile) => void;
};

export function EditProfileModal({ profile, open, onClose, onSave }: EditProfileModalProps) {
  const [email, setEmail] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmail(profile?.email || "");
    setBankAccount(profile?.bank_account_number || "");
    setError(null);
  }, [profile, open]);

    const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase
      .from("userprofile")
      .update({ email, bank_account_number: bankAccount })
      .eq("user_id", profile.user_id);
    setSaving(false);
    if (error) setError(error.message);
    else {
      onSave({ ...profile, email, bank_account_number: bankAccount });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Edit Profile</h2>
        <label className="block mb-2 text-sm font-medium text-black">Email</label>
        <input
          className="w-full mb-4 p-2 border rounded text-black"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
        <label className="block mb-2 text-sm font-mediumtext-black text-black">Bank account number</label>
        <input
          className="w-full mb-4 p-2 border rounded text-black"
          value={bankAccount}
          onChange={e => setBankAccount(e.target.value)}
          type="text"
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
            onClick={onClose}
            disabled={saving}
            type="button"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            onClick={handleSave}
            disabled={saving}
            type="button"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}