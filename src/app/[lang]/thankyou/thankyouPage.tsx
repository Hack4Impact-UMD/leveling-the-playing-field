// app/thankyou/thankyoupage.tsx
import React from 'react';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <img src="" alt="ICONfor LTP" class="h-5 w-5 mr-2" />
      <h1 className="text-6xl font-bold text-black mb-4">Thank you!</h1>
      <p className="text-xl text-teal-800 mb-6">Your order was completed successfully!</p>
      <a href="/receipt">
        <button 
          class="bg-teal-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200">
          View Receipt
        </button>
      </a>
      </div>
  );
}
