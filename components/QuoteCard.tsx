
"use client";

import { useEffect, useState } from "react";
import { Quote, RefreshCw } from "lucide-react";

type QuoteData = {
  id: number;
  quote: string;
  author: string;
};

export default function QuoteCard() {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        "https://quoteslate.vercel.app/api/quotes/random?tags=motivation"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch a quote.");
      }

      const data: QuoteData = await response.json();
      setQuote(data);
    } catch {
      setError("Couldn't load a quote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section className="quote-card">
      <div className="quote-header">
        <div className="quote-heading">
          <Quote size={17} />
          <span>A LITTLE INSPIRATION</span>
        </div>

        <button
        type="button"
        className="quote-refresh"
        onClick={fetchQuote}
        disabled={isLoading}
        aria-label="Get another quote"
        title={isLoading ? "Loading quote..." : "Get another quote"}
        >
          <RefreshCw
            size={16}
            className={isLoading ? "spinning" : ""}
          />
        </button>
      </div>

      <div className="quote-content">
        {isLoading ? (
          <p>Finding a little inspiration...</p>
        ) : error ? (
        <div className="quote-error">
            <p>{error}</p>

            <button
            type="button"
            className="quote-retry"
            onClick={fetchQuote}
            >
            Try again
            </button>
        </div>
        ) : quote ? (
          <>
            <blockquote>
              "{quote.quote}"
            </blockquote>

            <span className="quote-author">
              — {quote.author}
            </span>
          </>
        ) : null}
      </div>
    </section>
  );
}
