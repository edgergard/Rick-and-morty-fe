import { Character } from '../../types/Character';
import { useAppSelector } from '../../utils/hooks';
import { CharacterCard } from '../CharacterCard/CharacterCard';

export const CardList: React.FC = () => {
  const { characters } = useAppSelector(state => state.characters);

  return (
    <>
    {characters.map((character: Character) => (
      <CharacterCard character={character} key={character.id} />
    ))}
    </>
  )
}