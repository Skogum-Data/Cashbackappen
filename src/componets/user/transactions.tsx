"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

// Define a type for your transaction
type Transaction = {
  id: string;
  created_at: string;
  shop_id: string;
  description?: string;
  amount: number;
  cashback_amount?: number;
  status?: string;
  shop?: {
    shop_name?: string;
  };
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be signed in to view transactions.");
        setLoading(false);
        return;
      }
      // Fetch transactions and join shop table to get shop name
      const { data, error } = await supabase
        .from("transaction")
        .select(`
          *,
          shop:shop_id (
            shop_name
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setTransactions(data as Transaction[] || []);
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  if (loading) return <div className="text-white text-center mt-8">Laster transaksjoner</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!transactions.length) return <div className="text-white text-center mt-8">Ingen transaksjoner funnet!</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 max-w-2xl mx-auto overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-black">Dine transaksjoner</h2>
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Dato</th>
            <th className="py-2 px-4 text-left">Butikk</th>
            <th className="py-2 px-4 text-left">Beskrivelse</th>
            <th className="py-2 px-4 text-right">Sum</th>
            <th className="py-2 px-4 text-right">Penger tilbake</th>
            <th className="py-2 px-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b last:border-none">
              <td className="py-2 px-4">{new Date(tx.created_at).toLocaleDateString()}</td>
              <td className="py-2 px-4">{tx.shop?.shop_name || "-"}</td>
              <td className="py-2 px-4">{tx.description || "Transaction"}</td>
              <td className={`py-2 px-4 text-right font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                {tx.amount} kr
              </td>
              <td className="py-2 px-4 text-right">{tx.cashback_amount ?? "-"}</td>
              <td className="py-2 px-4 text-center">
                <span className={
                  tx.status === "completed"
                    ? "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                    : tx.status === "pending"
                    ? "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs"
                    : "bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                }>
                  {tx.status ? tx.status.charAt(0).toUpperCase() + tx.status.slice(1) : "Unknown"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}