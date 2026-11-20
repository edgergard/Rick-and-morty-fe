export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export const STATUSES: CharacterStatus[] = ['Alive', 'Dead', 'unknown'];
export const GENDERS: CharacterGender[] = ['Female', 'Male', 'Genderless', 'unknown'];

export interface Episode {
  id: string;
  name: string;
  episode: string;
  air_date: string;
}

export interface Place {
  id: string | null;
  name: string;
  type?: string | null;
  dimension?: string | null;
}

export interface CharacterPreview {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  image: string;
  origin: Pick<Place, 'name'>;
  location: Pick<Place, 'name'>;
  episode: Pick<Episode, 'id' | 'name' | 'episode'>[];
}

export interface Character extends Omit<CharacterPreview, 'origin' | 'location' | 'episode'> {
  created: string;
  origin: Place;
  location: Place;
  episode: Episode[];
}

export interface CharacterFilters {
  name: string;
  status: CharacterStatus | '';
  species: string;
  type: string;
  gender: CharacterGender | '';
}

export interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharactersPage {
  info: PageInfo;
  results: CharacterPreview[];
}
