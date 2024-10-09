import React from 'react';

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <div className="flex p-4">
        <div className="bg-orange rounded-full h-9 w-9 m-1"></div>
        <div className="bg-orange-400 rounded-full h-9 w-9 m-1"></div>
        <div className="bg-orange-light rounded-full h-9 w-9 m-1"></div>
      </div>
      <h1 className="text-black text-3xl text-center" style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 'bold' }}>Loading, please wait...</h1>
    </div>
  )
}

export default LoadingComponent;