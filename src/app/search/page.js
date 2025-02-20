"use client";
import { Suspense } from "react";
import SearchResultsContent from "./searchResultsContent";

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="post-container">Carregando...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
