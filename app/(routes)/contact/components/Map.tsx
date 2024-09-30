import React from 'react';

const Map = () => {
  return (
    <div className="h-64 md:h-80 lg:h-96">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412634965843!2d-73.98784368459377!3d40.74844797932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1621436761410!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{border:0}}
        allowFullScreen={true}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
