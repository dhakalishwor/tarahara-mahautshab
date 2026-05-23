import React, { useState, useEffect } from 'react';

const GALLERY_IMAGES = [
  // Performances
  {
    id: 1,
    category: 'performances',
    title: 'Kutumba Live Concert',
    description: 'Headline fusion folk performance drawing thousands of spectators on the opening night.',
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    location: 'Main Concert Stage',
    photographer: 'Sagar Thapa',
  },
  {
    id: 2,
    category: 'performances',
    title: 'Ethnic Dance Parade',
    description: 'Traditional Maruni performers during the grand cultural road parade.',
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    location: 'Mahautshab Street',
    photographer: 'Amina Rai',
  },
  {
    id: 3,
    category: 'performances',
    title: 'Laser DJ Night',
    description: 'Stunning electronic folk dance party under high-impact lasers and sound system.',
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800',
    location: 'Main Arena',
    photographer: 'Rohan Shrestha',
  },

  // Food
  {
    id: 4,
    category: 'food',
    title: 'Nepalese Dumpling Stalls',
    description: 'Freshly steamed local buff, chicken, and paneer momos served with spicy sesame chutney.',
    src: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    location: 'Food Court A',
    photographer: 'Pooja Giri',
  },
  {
    id: 5,
    category: 'food',
    title: 'Sizzling Local Sekuwa',
    description: 'Traditional wood-fired coal grilled barbecued meat cooked with local spices and herbs.',
    src: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800',
    location: 'Eastern Grill Corner',
    photographer: 'Dipesh Sen',
  },
  {
    id: 6,
    category: 'food',
    title: 'Traditional Selroti Showcase',
    description: 'Ring-shaped sweet fried rice bread freshly prepared by indigenous culinary experts.',
    src: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    location: 'Indigenous Food Zone',
    photographer: 'Dhiraj Limbu',
  },

  // Art
  {
    id: 7,
    category: 'art',
    title: 'Live Painting Canvas',
    description: 'Local canvas painter executing a magnificent painting about the local flora and culture.',
    src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    location: 'Exhibition Hall B',
    photographer: 'Sweta Chaudhary',
  },
  {
    id: 8,
    category: 'art',
    title: 'Mithila Fabric Showcase',
    description: 'Handcrafted textiles, Dhaka shawls, and paintings on display for national buyers.',
    src: 'https://images.unsplash.com/photo-1592997572594-34be01bc36c7?auto=format&fit=crop&q=80&w=800',
    location: 'Crafts & Handloom Pavilion',
    photographer: 'Kabir Lal',
  },
  {
    id: 9,
    category: 'art',
    title: 'Traditional Clay Pottery Workshop',
    description: 'Children and adults experiencing hand-spun earthen pottery workshops under master potter guidance.',
    src: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
    location: 'Children Activity Arena',
    photographer: 'Nisha Pathak',
  },

  // Carnival
  {
    id: 10,
    category: 'carnival',
    title: 'Mahautshab Ferris Wheel',
    description: 'A spectacular giant ferris wheel lighting up the evening sky of Tarahara Central Park.',
    src: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=800',
    location: 'Fun Park Zone',
    photographer: 'Bishal Gurung',
  },
  {
    id: 11,
    category: 'carnival',
    title: 'Vibrant Celebration Sparklers',
    description: 'Festival crowd lighting up organic sparkle sticks during the musical finale concerts.',
    src: 'https://images.unsplash.com/photo-1472653423608-ee24d31d2797?auto=format&fit=crop&q=80&w=800',
    location: 'Main Stage Ground',
    photographer: 'Preeti Acharya',
  },
  {
    id: 12,
    category: 'carnival',
    title: 'Interactive Crowd Wave',
    description: 'Over 20,000 visitors cheering and waving during the legendary closing concert acts.',
    src: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
    location: 'Festival Main Grounds',
    photographer: 'Sagar Thapa',
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    return activeFilter === 'all' || img.category === activeFilter;
  });

  const openLightbox = (index) => {
    // Find absolute index inside filtered images
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction) => {
    if (lightboxIndex === null) return;
    let nextIndex = lightboxIndex + direction;
    if (nextIndex < 0) {
      nextIndex = filteredImages.length - 1;
    } else if (nextIndex >= filteredImages.length) {
      nextIndex = 0;
    }
    setLightboxIndex(nextIndex);
  };

  // Keyboard navigation for Lightbox (Esc, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const categories = [
    { id: 'all', label: 'All Media', icon: '🖼️' },
    { id: 'performances', label: 'Performances', icon: '🎸' },
    { id: 'food', label: 'Food Court', icon: '🍢' },
    { id: 'art', label: 'Arts & Crafts', icon: '🎨' },
    { id: 'carnival', label: 'Carnival Fun', icon: '🎡' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-orange-600 font-bold uppercase tracking-wider text-sm px-3 py-1 bg-orange-50 rounded-full border border-orange-200">
            Media Highlights
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4 tracking-tight">
            Festival <span className="text-orange-600">Gallery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Immerse yourself in the spectacular visuals, colors, sounds, and flavors captured during the Tarahara Mahautshab celebrations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFilter(cat.id);
                closeLightbox(); // Close if open to prevent index mismatches
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border text-sm font-bold transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col transform hover:-translate-y-1"
            >
              {/* Image Box */}
              <div className="relative overflow-hidden aspect-video sm:aspect-square bg-gray-100">
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Overlay details shown on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-bold tracking-wider text-orange-400 uppercase mb-1">
                    {img.category}
                  </span>
                  <h3 className="text-white text-lg font-black">{img.title}</h3>
                  <p className="text-gray-200 text-xs mt-1 flex items-center">
                    <span className="mr-1">📍</span> {img.location}
                  </p>
                </div>
              </div>

              {/* Static Card Text (for premium readability) */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">
                      {img.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center">
                      <span className="mr-1">📸</span> {img.photographer}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {img.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-50 flex items-center text-xs text-gray-400 font-semibold">
                  <span className="mr-1.5">📍</span> {img.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex flex-col justify-center bg-gray-950/95 backdrop-blur-md p-4 sm:p-8 animate-fade-in">
            {/* Top Bar inside modal */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
              <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur px-4 py-2 rounded-2xl border border-gray-800">
                <span className="text-orange-400 font-black text-sm">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">
                  {filteredImages[lightboxIndex].category}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900/50 hover:bg-orange-600 text-white font-bold transition-all duration-300 border border-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Main Stage Image & Navigation Buttons */}
            <div className="relative flex items-center justify-center max-w-5xl mx-auto w-full h-[50vh] sm:h-[65vh] my-auto">
              
              {/* Left Arrow */}
              <button
                onClick={() => navigateLightbox(-1)}
                className="absolute left-0 sm:-left-16 w-12 h-12 rounded-full bg-gray-900/50 hover:bg-orange-600 text-white font-bold text-xl flex items-center justify-center z-10 transition-all duration-300 border border-gray-800"
              >
                ‹
              </button>

              {/* The Actual Display Image */}
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-gray-800"
              />

              {/* Right Arrow */}
              <button
                onClick={() => navigateLightbox(1)}
                className="absolute right-0 sm:-right-16 w-12 h-12 rounded-full bg-gray-900/50 hover:bg-orange-600 text-white font-bold text-xl flex items-center justify-center z-10 transition-all duration-300 border border-gray-800"
              >
                ›
              </button>
            </div>

            {/* Bottom Meta Info inside modal */}
            <div className="bg-gray-900/50 border border-gray-800/80 backdrop-blur rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto w-full text-white text-center sm:text-left mt-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {filteredImages[lightboxIndex].title}
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed">
                    {filteredImages[lightboxIndex].description}
                  </p>
                </div>
                <div className="bg-gray-950 border border-gray-800 p-4 rounded-2xl flex flex-col justify-center items-center text-xs space-y-1 w-full sm:w-48 text-center shrink-0">
                  <p className="text-gray-400">📍 Venue: <span className="text-white font-bold">{filteredImages[lightboxIndex].location}</span></p>
                  <p className="text-gray-400">📸 Camera: <span className="text-orange-400 font-bold">{filteredImages[lightboxIndex].photographer}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
