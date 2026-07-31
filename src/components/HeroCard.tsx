import { FC } from 'react';
import { motion } from 'motion/react';
import { Hero } from '../types';

interface HeroCardProps {
  hero: Hero;
}

export const HeroCard: FC<HeroCardProps> = ({ hero }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-6 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] ${hero.color} text-white`}
    >
      <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter italic drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">{hero.name}</h2>
      
      <div className="space-y-2 mb-4">
        <h3 className="font-black uppercase text-xs tracking-widest border-b-2 border-white/30 pb-1">Superpowers:</h3>
        <ul className="flex flex-wrap gap-2">
          {hero.superpowers.map((power) => (
            <li key={power} className="bg-white/30 border-2 border-black px-2 py-1 font-bold text-xs uppercase shadow-[2px_2px_0_rgba(0,0,0,1)]">{power}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-black uppercase text-xs tracking-widest border-b-2 border-white/30 pb-1">Dream Career:</h3>
        <p className="text-sm font-bold uppercase">{hero.dreamCareer}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-black uppercase text-xs tracking-widest border-b-2 border-white/30 pb-1">Mission:</h3>
        <p className="text-sm italic font-medium leading-tight">"{hero.mission}"</p>
      </div>

      <div className="border-t-2 border-white/30 pt-4 mt-auto">
        <p className="text-xs font-bold uppercase italic">" {hero.message} "</p>
      </div>
    </motion.div>
  );
};
