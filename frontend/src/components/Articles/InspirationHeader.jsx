import React from 'react';

const InspirationHeader = () => {
  return (
    <header 
      className="relative h-80 bg-cover bg-center text-white" 
      // Replace with your actual image path
      style={{ backgroundImage: "url('/img/articles/findyour.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-5xl font-bold mb-4">Find Your Inspiration</h1>
        <p className="text-lg max-w-2xl">Explore hands-on classes, articles on creativity, and more from our community of creators.</p>
      </div>
    </header>
  );
};
export default InspirationHeader;
