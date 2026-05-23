import React, { useState } from 'react';

const EVENT_DATA = [
  // Day 1
  {
    id: 1,
    day: 1,
    date: 'Dec 10',
    title: 'Grand Opening Ceremony',
    time: '10:00 AM - 01:00 PM',
    venue: 'Main Stage',
    category: 'performances',
    description: 'Inauguration of the Tarahara Mahautshab with cultural dances, national music acts, and official lamp lighting by honored dignitaries.',
    highlight: 'Chief Guest: Mayor of Itahari',
  },
  {
    id: 2,
    day: 1,
    date: 'Dec 10',
    title: 'Grand Cultural Street Parade',
    time: '02:00 PM - 05:00 PM',
    venue: 'Festival Street Route',
    category: 'performances',
    description: 'A vibrant parade featuring colorful floats, traditional ethnic attire, marching bands, and dancers representing communities from across the region.',
    highlight: 'Featuring: 20+ Ethnic Cultural Groups',
  },
  {
    id: 3,
    day: 1,
    date: 'Dec 10',
    title: 'Folk Fusion Musical Night',
    time: '06:00 PM - 10:00 PM',
    venue: 'Main Stage',
    category: 'performances',
    description: 'An evening of classical and folk music fused with modern beats, featuring prominent national folk-rock bands.',
    highlight: 'Headline Act: Kutumba Band',
  },

  // Day 2
  {
    id: 4,
    day: 2,
    date: 'Dec 11',
    title: 'National Folk Dance Competition',
    time: '11:00 AM - 03:00 PM',
    venue: 'Exhibition Hall Stage',
    category: 'competitions',
    description: 'Talented dance troupes compete showcasing traditional Nepali folk styles like Maruni, Tamang Selo, Sakela, and Kauda.',
    highlight: 'Cash Prize: NPR 1,00,000 for Winners',
  },
  {
    id: 5,
    day: 2,
    date: 'Dec 11',
    title: 'Local Delicacies Food Carnival',
    time: '01:00 PM - 08:00 PM',
    venue: 'Food Court Plaza',
    category: 'food',
    description: 'Taste authentic local cuisines of the eastern region, including traditional indigenous dishes, street foods, and specialized sweets.',
    highlight: 'Speciality: Indigenous Selroti & Sekuwa',
  },
  {
    id: 6,
    day: 2,
    date: 'Dec 11',
    title: 'Traditional Instruments Ensemble',
    time: '05:00 PM - 07:00 PM',
    venue: 'Cultural Arena',
    category: 'art',
    description: 'Listen to the beautiful symphony of traditional instruments including Madal, Sarangi, Bansuri, and Dhime played by veteran players.',
    highlight: 'Interactive Sarangi workshop included',
  },

  // Day 3
  {
    id: 7,
    day: 3,
    date: 'Dec 12',
    title: 'Live Painting & Art Exhibition',
    time: '10:00 AM - 04:00 PM',
    venue: 'Art & Exhibition Center',
    category: 'art',
    description: 'Local and national painters gather for live canvas sessions, presenting themes surrounding eastern culture, nature, and community life.',
    highlight: 'Curated by: Lalit Kala Academy',
  },
  {
    id: 8,
    day: 3,
    date: 'Dec 12',
    title: 'Mithila Art & Craft Workshop',
    time: '01:30 PM - 03:30 PM',
    venue: 'Workshop Pavilion',
    category: 'art',
    description: 'Learn the ancient, beautiful techniques of Mithila painting from traditional master artisans and take home your own custom painting.',
    highlight: 'All materials provided for free',
  },
  {
    id: 9,
    day: 3,
    date: 'Dec 12',
    title: 'Youth Rock & Pop Stage',
    time: '06:00 PM - 10:00 PM',
    venue: 'Main Stage',
    category: 'performances',
    description: 'A loud, energetic night with the most promising upcoming young local rock bands and individual pop stars performing live.',
    highlight: 'Opening Act: The Shadows Nepal',
  },

  // Day 4
  {
    id: 10,
    day: 4,
    date: 'Dec 13',
    title: 'Maha-Utshab Master Chef Contest',
    time: '11:00 AM - 03:00 PM',
    venue: 'Food Court Plaza',
    category: 'competitions',
    description: 'Professional and amateur home cooks compete to create the most innovative dish utilizing purely local Himalayan herbs and ingredients.',
    highlight: 'Guest Judge: Chef Santosh Shah',
  },
  {
    id: 11,
    day: 4,
    date: 'Dec 13',
    title: 'Nepali Traditional Fashion Show',
    time: '05:30 PM - 07:30 PM',
    venue: 'Main Stage Runway',
    category: 'performances',
    description: 'A stellar showcase of beautiful ethnic costumes from Rai, Limbu, Tharu, Newar, Gurung, and Madhesi cultures crafted by modern designers.',
    highlight: 'Featuring: National Top Models',
  },
  {
    id: 12,
    day: 4,
    date: 'Dec 13',
    title: 'Poetry & Ghazal Evening',
    time: '08:00 PM - 10:30 PM',
    venue: 'Literary Hub',
    category: 'art',
    description: 'A soulful gathering of literary figures reciting powerful poems, emotional ghazals, and storytelling sessions under the starry sky.',
    highlight: 'Host: Veteran Local Poets',
  },

  // Day 5
  {
    id: 13,
    day: 5,
    date: 'Dec 14',
    title: 'Kids Talent Competition',
    time: '10:00 AM - 01:00 PM',
    venue: 'Exhibition Hall Stage',
    category: 'competitions',
    description: 'A platform showcasing local children performing folk dances, singing national songs, reciting poems, or executing science models.',
    highlight: 'Prizes & Scholarships for Top 5',
  },
  {
    id: 14,
    day: 5,
    date: 'Dec 14',
    title: 'Handloom & Agricultural Expo',
    time: '09:00 AM - 06:00 PM',
    venue: 'Agricultural Pavilion',
    category: 'art',
    description: 'Promoting local organic farmers, hand-woven Dhaka fabrics, homemade honey, dairy, bamboo crafts, and local agricultural advancements.',
    highlight: 'Direct from farmers - No middleman charges',
  },
  {
    id: 15,
    day: 5,
    date: 'Dec 14',
    title: 'Electro-Folk DJ Dance Night',
    time: '07:00 PM - 10:00 PM',
    venue: 'Main Stage',
    category: 'performances',
    description: 'Let loose at this energetic celebration combining classic folk samples with modern EDM and dance tracks, lighting shows, and laser effects.',
    highlight: 'Feat: DJ Kayo & Visual Light Artists',
  },

  // Day 6
  {
    id: 16,
    day: 6,
    date: 'Dec 15',
    title: 'Closing Ceremony & Awards',
    time: '01:00 PM - 04:30 PM',
    venue: 'Main Stage',
    category: 'performances',
    description: 'A retrospective look at the festival, felicitation of volunteers, partners, and winners of all competitions followed by a closing speech.',
    highlight: 'Awards presented by: Tourism Ministry Board',
  },
  {
    id: 17,
    day: 6,
    date: 'Dec 15',
    title: 'Grand Finale Concert',
    time: '06:00 PM - 10:00 PM',
    venue: 'Main Stage',
    category: 'performances',
    description: 'A historic final night featuring the biggest rock and pop sensations of the country, performing hits that will make the entire crowd roar.',
    highlight: 'Mega Headliner: 1974 AD Band',
  },
];

export default function Events() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reminders, setReminders] = useState({});

  const toggleReminder = (eventId) => {
    setReminders((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const filteredEvents = EVENT_DATA.filter((event) => {
    const dayMatch = event.day === selectedDay;
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    return dayMatch && categoryMatch;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'performances':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'food':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'art':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'competitions':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'performances':
        return '🎶';
      case 'food':
        return '🍔';
      case 'art':
        return '🎨';
      case 'competitions':
        return '🏆';
      default:
        return '✨';
    }
  };

  const days = [
    { num: 1, label: 'Day 1', date: 'Dec 10' },
    { num: 2, label: 'Day 2', date: 'Dec 11' },
    { num: 3, label: 'Day 3', date: 'Dec 12' },
    { num: 4, label: 'Day 4', date: 'Dec 13' },
    { num: 5, label: 'Day 5', date: 'Dec 14' },
    { num: 6, label: 'Day 6', date: 'Dec 15' },
  ];

  const categories = [
    { id: 'all', label: 'All Events', icon: '🌟' },
    { id: 'performances', label: 'Performances', icon: '🎶' },
    { id: 'food', label: 'Food Festivals', icon: '🍔' },
    { id: 'art', label: 'Arts & Culture', icon: '🎨' },
    { id: 'competitions', label: 'Competitions', icon: '🏆' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-orange-600 font-bold uppercase tracking-wider text-sm px-3 py-1 bg-orange-50 rounded-full border border-orange-200">
            Festival Calendar
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4 tracking-tight">
            Schedule of <span className="text-orange-600">Events</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Explore 6 days of music, dance, delicious cuisines, indigenous exhibitions, and exciting competitions. Plan your visit today!
          </p>
        </div>

        {/* Day Selection Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {days.map((day) => (
              <button
                key={day.num}
                onClick={() => setSelectedDay(day.num)}
                className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                  selectedDay === day.num
                    ? 'bg-orange-600 text-white shadow-md transform -translate-y-0.5'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <span className="font-bold text-base md:text-lg">{day.label}</span>
                <span className={`text-xs ${selectedDay === day.num ? 'text-orange-100' : 'text-gray-400'}`}>
                  {day.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredEvents.map((event) => {
              const hasReminder = reminders[event.id];
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group transform hover:-translate-y-1"
                >
                  <div>
                    {/* Badge & Category */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="flex items-center space-x-1.5 text-gray-500 text-sm font-semibold">
                        <span>🗓️</span>
                        <span>{event.date}</span>
                      </span>
                      <span
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${getCategoryColor(
                          event.category
                        )}`}
                      >
                        <span className="text-sm">{getCategoryIcon(event.category)}</span>
                        <span>{event.category}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {event.title}
                    </h3>

                    {/* Details Info */}
                    <div className="space-y-1.5 mb-5 text-sm">
                      <p className="flex items-center text-gray-500">
                        <span className="mr-2 text-gray-400">⏰</span>
                        <span className="font-medium text-gray-700">{event.time}</span>
                      </p>
                      <p className="flex items-center text-gray-500">
                        <span className="mr-2 text-gray-400">📍</span>
                        <span className="font-medium text-gray-700">{event.venue}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                      {event.description}
                    </p>
                  </div>

                  {/* Highlights and Interactive CTA */}
                  <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
                    <div className="bg-orange-50/70 border border-orange-100 px-3 py-2 rounded-xl text-orange-800 text-xs sm:text-sm font-semibold flex items-center">
                      <span className="mr-1.5 text-sm">✨</span>
                      {event.highlight}
                    </div>

                    <button
                      onClick={() => toggleReminder(event.id)}
                      className={`w-full sm:w-auto flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                        hasReminder
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white border border-orange-100'
                      }`}
                    >
                      <span>{hasReminder ? '🔔' : '🔕'}</span>
                      <span>{hasReminder ? 'Reminded' : 'Remind Me'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center bg-white rounded-3xl p-12 shadow-sm border border-gray-100 max-w-md mx-auto">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Events Scheduled</h3>
            <p className="text-gray-500 text-sm">
              We couldn't find any events under the "{categories.find((c) => c.id === selectedCategory)?.label}" category for this day.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
