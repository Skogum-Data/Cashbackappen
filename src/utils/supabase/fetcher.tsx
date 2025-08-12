import { supabase} from "./client";

export const fetchShops = async () => {
  const { data, error } = await supabase.from("shop").select("*");
  if (error) throw error;
  return data;
}

export const fetchUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("You must be signed in to view your profile.");
  const { data, error } = await supabase
    .from("userprofile")
    .select("*")
    .eq("user_id", user.id)
    .single();
  if (error) throw error;
  return data;
};

