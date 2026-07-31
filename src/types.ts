export type City = 'Jaipur' | 'Delhi' | 'Nagpur';

export interface Hero {
  id: string;
  name: string;
  heroName: string;
  superpowers: string[];
  dreamCareer: string;
  mission: string;
  message: string;
  color: string;
  city: City;
  formImageUrl?: string;
}
