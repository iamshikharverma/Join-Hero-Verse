/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X } from 'lucide-react';
import { HeroCard } from './components/HeroCard';
import { heroes } from './data';
import { City } from './types';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<City | 'All'>('All');
  const [showVision, setShowVision] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const getFilteredHeroes = (selectedCity: City | 'All') => {
    return selectedCity === 'All' 
      ? heroes 
      : heroes.filter(h => h.city === selectedCity);
  };

  const filteredHeroes = getFilteredHeroes(selectedCity);
  const cities: (City | 'All')[] = ['All', 'Jaipur', 'Delhi', 'Nagpur'];

  return (
    <div className="min-h-screen bg-red-600 p-4 sm:p-8 border-[6px] sm:border-[12px] border-black">
      <header className="mb-12 text-center border-b-8 border-black pb-8">
        <h1 className="text-4xl sm:text-7xl font-black text-yellow-400 uppercase tracking-tighter italic drop-shadow-[4px_4px_0_rgba(0,0,0,1)] sm:drop-shadow-[6px_6px_0_rgba(0,0,0,1)] transform -rotate-2">
          JOIN HERO VERSE
        </h1>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setShowVision(!showVision)}
            className="bg-white text-black border-4 border-black px-6 py-3 sm:px-8 sm:py-4 font-black uppercase text-lg sm:text-xl shadow-[4px_4px_0_rgba(0,0,0,1)] sm:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            {showVision ? 'Close Vision' : 'Our Vision at Hero Verse'}
          </button>
        </div>
      </header>
      
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 sm:px-6 sm:py-3 border-4 border-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform ${
              selectedCity === city ? 'bg-yellow-400 translate-x-[2px] translate-y-[2px] shadow-none' : 'bg-white'
            }`}
          >
            {city === 'All' ? 'All Heroes' : `Heroes of ${city}`}
          </button>
        ))}
      </div>
      
      {showVision && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white border-4 border-black p-4 sm:p-8 shadow-[12px_12px_0_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowVision(false)}
              className="absolute top-4 right-4 p-2 bg-black text-yellow-400 hover:bg-red-600 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl sm:text-4xl font-black uppercase mb-6 italic text-red-600 pr-12">Our Vision at Hero Verse</h2>
            <p className="text-base sm:text-lg font-bold mb-4">
              If you're reading this, there's a good chance you grew up with parents or loved ones who cheered for you, supported your education, helped with your homework, and reminded you that you could become anything and that your dreams were possible.
            </p>
            <p className="text-base sm:text-lg font-bold mb-4">
              Many of the children we work with grow up without even a surname to call their own. So we let them choose one. A hero's name. An identity that says, "This is who I'm becoming." That's how Rohit becomes Rohit Stark, and Kartik becomes Kartik America. We want them to see themselves not through the lens of their circumstances, but through the lens of their potential.
            </p>
            <p className="text-base sm:text-lg font-bold mb-4">
              Through free workshops with NGOs, we introduce children to AI, websites, coding, and game development, helping them understand how the internet works while bridging the digital and technology divide in India.
            </p>
            <p className="text-base sm:text-lg font-bold mb-4">
              But the coding and the websites aren't the point. They're simply the medium.
            </p>
            <p className="text-base sm:text-lg font-bold mb-4">
              The point is making sure every child has someone who looks them in the eye and says, "I believe in you."
            </p>
            <p className="text-base sm:text-lg font-bold">
              Because sometimes, the first step toward changing the world is helping a child believe they can.
            </p>
          </div>
        </div>
      )}

      {showContact && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white border-4 border-black p-4 sm:p-8 shadow-[12px_12px_0_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 p-2 bg-black text-yellow-400 hover:bg-red-600 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl sm:text-4xl font-black uppercase mb-6 italic text-red-600 pr-12">Contact Us</h2>
            <p className="text-base sm:text-lg font-bold mb-4">
              Hello! I'm Shikhar Verma, an amateur technology enthusiast and the founder of Hero Verse. This project is a solo labor of love, built to bridge the digital divide and empower children through tech.
            </p>
            <p className="text-base sm:text-lg font-bold mb-4">
              I believe we all have a part to play in changing the world. Whether you want to collaborate, support the mission, or just say hello, I'd love to hear from you.
            </p>
            <div className="bg-yellow-400 border-4 border-black p-4 font-bold space-y-2">
              <p>Email: <a href="mailto:iamshikharverma@gmail.com" className="underline">iamshikharverma@gmail.com</a></p>
              <p>Support/Collab UPI: 8830117992@ptaxis</p>
            </div>
          </div>
        </div>
      )}
      
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 max-w-7xl mx-auto">
        {filteredHeroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </main>
      <footer className="mt-16 text-center text-white font-black uppercase text-sm border-t-4 border-black pt-8">
        <button 
          onClick={() => setShowContact(!showContact)}
          className="bg-black text-white border-4 border-white px-6 py-3 font-black uppercase text-sm shadow-[4px_4px_0_rgba(255,255,255,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all mb-4"
        >
          {showContact ? 'Close Contact' : 'Contact Us'}
        </button>
        <div className="block">JOIN HERO VERSE</div>
      </footer>
    </div>
  );
}
