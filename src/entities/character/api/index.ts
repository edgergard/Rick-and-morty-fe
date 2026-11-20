import { ClientError, gql } from 'graphql-request';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { gqlClient } from '@/shared/api/client';
import type { Character, CharacterFilters, CharactersPage } from '../model/types';

const CHARACTERS_QUERY = gql`
  query Characters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          name
        }
        location {
          name
        }
        episode {
          id
          name
          episode
        }
      }
    }
  }
`;

const CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      created
      origin {
        id
        name
        type
        dimension
      }
      location {
        id
        name
        type
        dimension
      }
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;

const EMPTY_PAGE: CharactersPage = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

const compact = (filters: Partial<CharacterFilters>) =>
  Object.fromEntries(Object.entries(filters).filter(([, value]) => Boolean(value)));

export async function fetchCharacters(
  page: number,
  filters: Partial<CharacterFilters>,
  signal?: AbortSignal,
) {
  try {
    const data = await gqlClient.request<{ characters: CharactersPage }>({
      document: CHARACTERS_QUERY,
      variables: { page, filter: compact(filters) },
      signal,
    });
    // Empty or out-of-range pages come back with null info fields and no results.
    return data.characters?.results?.length ? data.characters : EMPTY_PAGE;
  } catch (error) {
    // The API answers empty result sets with a GraphQL error "404: There is nothing here".
    if (
      error instanceof ClientError &&
      error.response.errors?.some((e) => e.message.includes('404'))
    ) {
      return EMPTY_PAGE;
    }
    throw error;
  }
}

export async function fetchCharacter(id: string, signal?: AbortSignal) {
  const data = await gqlClient.request<{ character: Character | null }>({
    document: CHARACTER_QUERY,
    variables: { id },
    signal,
  });
  return data.character;
}

export const characterKeys = {
  all: ['characters'] as const,
  list: (page: number, filters: Partial<CharacterFilters>) =>
    [...characterKeys.all, 'list', page, filters] as const,
  detail: (id: string) => [...characterKeys.all, 'detail', id] as const,
};

export function useCharacters(page: number, filters: Partial<CharacterFilters>) {
  return useQuery({
    queryKey: characterKeys.list(page, filters),
    queryFn: ({ signal }) => fetchCharacters(page, filters, signal),
    placeholderData: keepPreviousData,
  });
}

export function useCharacter(id: string) {
  return useQuery({
    queryKey: characterKeys.detail(id),
    queryFn: ({ signal }) => fetchCharacter(id, signal),
    enabled: Boolean(id),
  });
}
