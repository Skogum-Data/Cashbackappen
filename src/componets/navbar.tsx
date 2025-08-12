"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

// Remove or update NavbarProps if not used elsewhere
// export type NavbarProps = { user?: any; };

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow px-8 py-2 flex items-center justify-between">
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        CashbackApp
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="text-gray-700 dark:text-gray-200 hover:underline">
            Hjem
          </Link>
        </li>
        <li>
          <Link href="/offers" className="text-gray-700 dark:text-gray-200 hover:underline">
            Butikker
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-gray-700 dark:text-gray-200 hover:underline">
            Contact
          </Link>
        </li>
        <li>
          {/* Always render a Link so server and client markup match */}
          {!mounted ? (
            <Link
              href="/signup"
              className="text-gray-700 dark:text-gray-200 hover:underline opacity-0 select-none pointer-events-none"
              aria-hidden="true"
              tabIndex={-1}
            >
              Sign In
            </Link>
          ) : user ? (
            <Link href="/profile" className="text-gray-700 dark:text-gray-200 hover:underline">
              Profile
            </Link>
          ) : (
            <Link href="/signup" className="text-gray-700 dark:text-gray-200 hover:underline">
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}