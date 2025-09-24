import React from 'react';

const ContactForm = () => {
  return (
    <form className="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 border dark:border-slate-700">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input className="shadow appearance-none border dark:border-slate-600 rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-slate-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input className="shadow appearance-none border dark:border-slate-600 rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-slate-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your Email" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea className="shadow appearance-none border dark:border-slate-600 rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-slate-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your Message" rows={4}></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
