"use client";

import dynamic from "next/dynamic";

const Museum3D = dynamic(() => import("@/components/Museum3D"), {
  ssr: false,
  loading: () => (
    <main className="loading-page">
      <span className="loading-symbol">✧</span>
      <p>PREPARING WORLCORE MUSEUM...</p>
    </main>
  ),
});

export default function Home() {
  return <Museum3D />;
}
