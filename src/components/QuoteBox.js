import React from 'react';
import quotes from '../data/quotes';

export default function QuoteBox() {
  const quoteNum = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteNum];

  return (
    <div className="quote-box">
      <h3>{quote}</h3>
    </div>
  );
}
