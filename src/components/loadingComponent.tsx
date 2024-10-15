import React from 'react';

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <div className="flex p-4">
        <div className="animate-[pulse_1.1s_ease-in-out_infinite] bg-orange rounded-full h-9 w-9 m-1"></div>
        <div className="animate-[pulse_1.5s_ease-in-out_infinite] bg-orange-400 rounded-full h-9 w-9 m-1"></div>
        <div className="animate-[pulse_1.9s_ease-in-out_infinite] bg-orange-light rounded-full h-9 w-9 m-1"></div>
      </div>
      <div className="text-black text-2xl text-center">
        <h1 className="text-black text-2xl text-center" style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 'bold' }}>Loading</h1>
        <h1 className="text-black text-2xl text-center" style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 'bold' }}>Please wait...</h1>
      </div>
    </div>
  )
}

export default LoadingComponent;