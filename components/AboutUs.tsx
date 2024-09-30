import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Fashion by Oreoluwa Collection"
              width={500}
              height={500}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-4">About Fashion by Oreoluwa</h2>
            <p className="text-gray-700 mb-6">
              Fashion by Oreoluwa is your one-stop destination for all things fashion, skincare, and fragrances. We curate the finest products to help you express your unique style and enhance your natural beauty.
            </p>
            <a href="/about" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
