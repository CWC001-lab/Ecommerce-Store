import React from 'react';
import { FaFacebook, FaWhatsapp, FaTiktok } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="w-full md:w-[70%] mx-auto bg-gray-100 dark:bg-slate-800 rounded-lg shadow-md p-6 mt-8 border dark:border-slate-700">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Join the Fashion by Oreoluwa Community</h2>
      <p className="text-center mb-6 text-gray-700 dark:text-gray-300">Stay connected for the latest in fashion, skincare, and fragrances!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SocialLink 
          icon={<FaWhatsapp size={32} />} 
          color="green" 
          href="wa.me/2349036472236"
          text="Join our WhatsApp group for exclusive deals and beauty tips!"
        />
        <SocialLink 
          icon={<FaTiktok size={32} />} 
          color="red" 
          href="www.tiktok.com/@fbo_scentsation"
          text="Follow our Facebook page for style inspiration and product launches"
        />
        {/* <SocialLink 
          icon={<FaTwitter size={32} />} 
          color="sky" 
          href="https://twitter.com"
          text="Get real-time updates on Twitter about new arrivals and trends"
        />
        <SocialLink 
          icon={<FaInstagram size={32} />} 
          color="pink" 
          href="https://instagram.com"
          text="Explore our Instagram for stunning product showcases and tutorials"
        /> */}
      </div>
      <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">Join us today and elevate your style with Fashion by Oreoluwa!</p>
    </div>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  color: string;
  href: string;
  text: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, color, href, text }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`flex flex-col items-center p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-${color}-600 hover:text-${color}-800 border dark:border-slate-600`}
  >
    {icon}
    <p className="mt-2 text-sm text-center text-gray-700 dark:text-gray-300">{text}</p>
  </a>
);

export default SocialIcons;
