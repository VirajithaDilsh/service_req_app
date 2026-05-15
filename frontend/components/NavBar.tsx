"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hammer, PlusCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-blue-600">
          <Hammer className="w-6 h-6" />
          <span className="font-bold text-xl text-slate-900">GlobalTNA</span>
        </Link>

        {pathname !== "/jobs/new" && (
          <Link
            href="/jobs/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            <PlusCircle className="w-4 h-4" />
            Post a Job
          </Link>
        )}
      </div>
    </header>
  );
}
