import React from 'react';
import Image from 'next/image';

const brands = [
  // Fashion Brands
  { name: 'Gucci', logo: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=200&h=200&fit=crop&crop=center' },
  { name: 'Louis Vuitton', logo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&h=200&fit=crop&crop=center' },
  { name: 'Chanel', logo: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=200&h=200&fit=crop&crop=center' },
  { name: 'Prada', logo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&h=200&fit=crop&crop=center' },
  { name: 'Hermès', logo: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=200&h=200&fit=crop&crop=center' },

  // Skincare Brands
  { name: 'Estée Lauder', logo: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop&crop=center' },
  { name: 'Clinique', logo: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop&crop=center' },
  { name: 'La Mer', logo: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop&crop=center' },
  { name: 'SK-II', logo: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop&crop=center' },
  { name: 'Kiehl\'s', logo: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop&crop=center' },

  // Perfume Brands
  { name: 'Dior', logo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop&crop=center' },
  { name: 'Tom Ford', logo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop&crop=center' },
  { name: 'Jo Malone', logo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop&crop=center' },
  { name: 'Creed', logo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop&crop=center' },
  { name: 'Byredo', logo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop&crop=center' },

  // Shoe Brands
  { name: 'Nike', logo: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&crop=center' },
  { name: 'Adidas', logo: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&crop=center' },
  { name: 'Christian Louboutin', logo: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&crop=center' },
  { name: 'Jimmy Choo', logo: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&crop=center' },
  { name: 'Manolo Blahnik', logo: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&crop=center' },

  // Clothes Brands
  { name: 'Zara', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center' },
  { name: 'H&M', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center' },
  { name: 'Uniqlo', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center' },
  { name: 'COS', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center' },
  { name: 'Mango', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center' },
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
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-opacity duration-300 group-hover:opacity-100 opacity-50"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJyYW5kPC90ZXh0Pjwvc3ZnPg==';
                  }}
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
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-opacity duration-300 group-hover:opacity-100 opacity-50"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJyYW5kPC90ZXh0Pjwvc3ZnPg==';
                  }}
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
