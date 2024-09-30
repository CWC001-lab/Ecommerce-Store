import React from 'react';
import Image from 'next/image';

const brands = [
  // Fashion Brands
  { name: 'Gucci', logo: 'https://www.gucci.com/images/logo.svg' },
  { name: 'Louis Vuitton', logo: 'https://us.louisvuitton.com/static_lvfront/favicon.ico' },
  { name: 'Chanel', logo: 'https://www.chanel.com/us/img/prd/favicon.ico' },
  { name: 'Prada', logo: 'https://www.prada.com/content/dam/pradanux/favicon/favicon.ico' },
  { name: 'Hermès', logo: 'https://www.hermes.com/sites/all/themes/custom/hermes/favicon.ico' },

  // Skincare Brands
  { name: 'Estée Lauder', logo: 'https://www.esteelauder.com/media/export/cms/icons/favicon.ico' },
  { name: 'Clinique', logo: 'https://www.clinique.com/media/export/cms/icons/favicon.ico' },
  { name: 'La Mer', logo: 'https://www.cremedelamer.com/media/export/cms/icons/favicon.ico' },
  { name: 'SK-II', logo: 'https://www.sk-ii.com/favicon.ico' },
  { name: 'Kiehl\'s', logo: 'https://www.kiehls.com/on/demandware.static/Sites-kiehls-us-Site/-/default/dw4dd3c8b7/images/favicon.ico' },

  // Perfume Brands
  { name: 'Dior', logo: 'https://www.dior.com/favicon.ico' },
  { name: 'Tom Ford', logo: 'https://www.tomford.com/on/demandware.static/Sites-tomford-us-Site/-/default/dw9f4d4a8e/images/favicon.ico' },
  { name: 'Jo Malone', logo: 'https://www.jomalone.com/media/export/cms/icons/favicon.ico' },
  { name: 'Creed', logo: 'https://www.creedboutique.com/on/demandware.static/Sites-creed-us-Site/-/default/dw76f8b9c1/images/favicon.ico' },
  { name: 'Byredo', logo: 'https://www.byredo.com/favicon.ico' },

  // Shoe Brands
  { name: 'Nike', logo: 'https://www.nike.com/favicon.ico' },
  { name: 'Adidas', logo: 'https://www.adidas.com/static/on/demandware.static/-/Sites-adidas-US-Library/default/dw7f34a5c4/favicon.ico' },
  { name: 'Christian Louboutin', logo: 'https://us.christianlouboutin.com/favicon.ico' },
  { name: 'Jimmy Choo', logo: 'https://row.jimmychoo.com/on/demandware.static/-/Sites-jch-master-catalog/default/dw9f4d4a8e/images/favicon.ico' },
  { name: 'Manolo Blahnik', logo: 'https://www.manoloblahnik.com/favicon.ico' },

  // Clothes Brands
  { name: 'Zara', logo: 'https://static.zara.net/stdstatic/4.13.0/images/favicon-32x32.png' },
  { name: 'H&M', logo: 'https://www2.hm.com/favicon.ico' },
  { name: 'Uniqlo', logo: 'https://www.uniqlo.com/favicon.ico' },
  { name: 'COS', logo: 'https://www.cosstores.com/favicon.ico' },
  { name: 'Mango', logo: 'https://st.mngbcn.com/images/headerFooter/favicon/favicon.ico' },
];

const FeaturedBrands = () => {
  return (
    <div className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Featured Brands</h2>
      <div className="overflow-hidden">
        <div className="flex animate-slide-left">
          {brands.concat(brands).map((brand, index) => (
            <div key={index} className="w-40 h-40 mx-4 flex-shrink-0">
              <div className="relative w-full h-full group">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  layout="fill"
                  objectFit="contain"
                  className="transition-opacity duration-300 group-hover:opacity-100 opacity-50"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex animate-slide-right mt-8">
          {brands.concat(brands).reverse().map((brand, index) => (
            <div key={index} className="w-40 h-40 mx-4 flex-shrink-0">
              <div className="relative w-full h-full group">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  layout="fill"
                  objectFit="contain"
                  className="transition-opacity duration-300 group-hover:opacity-100 opacity-50"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBrands;
