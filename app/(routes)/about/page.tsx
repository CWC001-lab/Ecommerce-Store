/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">About Fashion by Oreoluwa</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Fashion by Oreoluwa was born out of a passion for helping people look and feel their best. Founded in 2020, we've quickly become a go-to destination for fashion enthusiasts, skincare aficionados, and fragrance lovers alike.
            </p>
            <p className="mb-4">
              Our curated collection brings together the best in clothing, skincare, perfumes, and accessories, all carefully selected to help you express your unique style and enhance your natural beauty.
            </p>
          </div>
          <div className="relative h-64 md:h-96">
            <Image 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Fashion by Oreoluwa Collection" 
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="my-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="max-w-2xl mx-auto">
            At Fashion by Oreoluwa, we're committed to empowering individuals to embrace their unique beauty and style. We believe that everyone deserves access to high-quality fashion, skincare, and fragrances that make them feel confident and beautiful.
          </p>
        </div>

        {/* Product Categories */}
        <div className="my-12">
          <h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <CategoryCard 
              title="Fashion" 
              description="Discover our curated selection of fashion products, designed to enhance your personal style and boost your confidence."
              imageUrl="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            />
            <CategoryCard 
              title="Skincare" 
              description="Explore our range of skincare products, carefully selected to nourish and revitalize your skin."
              imageUrl="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            />
            <CategoryCard 
              title="Fragrances" 
              description="Indulge in our collection of exquisite fragrances, each designed to complement your unique personality."
              imageUrl="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            />
          </div>
        </div>

        {/* Values */}
        <div className="my-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Quality', description: 'We source only the finest products to ensure your satisfaction.', imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
              { title: 'Sustainability', description: 'We\'re committed to reducing our environmental impact through eco-friendly practices.', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
              { title: 'Inclusivity', description: 'Our products cater to diverse skin types, tones, and personal styles.', imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
              { title: 'Customer Care', description: 'Your satisfaction is our top priority, and we\'re always here to help.', imageUrl: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image 
                    src={value.imageUrl} 
                    alt={value.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6">Experience the best in fashion, skincare, and fragrances with Fashion by Oreoluwa.</p>
          <a href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-48">
      <Image 
        src={imageUrl} 
        alt={title} 
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default AboutPage;