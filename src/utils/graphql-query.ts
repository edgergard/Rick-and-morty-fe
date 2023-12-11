import { gql } from '@apollo/client';
import { CharacterFilter } from '../types/Filters';

export const getCharacter = (id: number) => {
  return gql`
  query {
    character(id: ${id}) {
      id
      name
      status
      species
      type
      gender
      episode {
        id
        name
      }
      origin {
        name
        dimension
      }
      location {
        name
        dimension
      }
      image
      created
    }
  }
`;
};

export const getCharacters = (
  page: number,
  characterFilter: CharacterFilter,
) => {
  const charactersString = Object.entries(characterFilter)
    .map(([key, value]) => `${key}: "${value}"`)
    .join(', ');

  return gql`
  {
    characters(page: ${page}, filter: { ${charactersString} }) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species 
        type
        gender
        image
        episode {
          id
          name
        }
        origin {
          name
        }
        location {
          name
          type
          dimension
        }
      }
    }
    locations {
      info {
        count
        pages
      }
      results {
        id
        name
        dimension
      }
    }
    episodes {
      info {
        count
        pages
      }
      results {
        id
        name
        episode
      }
    }
  }
`;
};
