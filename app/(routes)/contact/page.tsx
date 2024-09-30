import React from 'react';
import ContactForm from './components/ContactForm';
import SocialIcons from './components/SocialIcons';
import Map from './components/Map';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-64 md:h-80 lg:h-96 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="w-full lg:w-1/2">
            <Map />
          </div>
          <div className="w-full lg:w-1/2">
            <ContactForm />
          </div>
        </div>
        <div className="flex justify-center">
          <SocialIcons />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
