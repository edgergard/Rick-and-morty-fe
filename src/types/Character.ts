export type Character = {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  image: string,
  episode: Episode[],
  origin: { name: string },
  location: { name: string },
};

type Episode = {
  id: number;
  name: string;
};
