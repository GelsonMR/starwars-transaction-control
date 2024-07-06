import { ChangeEvent, useState } from 'react';
import { Flex, TextInput, ScrollArea, Title, Loader } from '@mantine/core';
import { Planet } from '../../types';
import { PlanetCard } from '../PlanetCard';
import { PlanetSelectionProps } from './types';
import { usePlanets } from '../../hooks/usePlanets';

export const PlanetSelection = ({
  selected,
  onChange,
}: PlanetSelectionProps) => {
  const [query, setQuery] = useState('');
  const { data, isFetching, isError } = usePlanets({ searchQuery: query });

  const handlePlanetClick = (planet?: Planet) => {
    onChange?.(planet);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <Flex direction="column" py="sm">
      <Flex mx="xl">
        <Title order={2} mr="auto">
          Planets {isFetching && <Loader size="sm" ml="sm" />}
        </Title>
        <TextInput
          value={query}
          placeholder="Search planet"
          onChange={handleSearchChange}
        />
      </Flex>
      {data && !data.length && (
        <Title order={3} m="xl">
          No planets found
        </Title>
      )}
      {data && (
        <ScrollArea>
          <Flex gap="sm" p="xl" py="sm">
            {!query && (
              <PlanetCard
                selected={!selected}
                onClick={() => handlePlanetClick()}
              />
            )}
            {data?.map((planet) => (
              <PlanetCard
                key={planet.id}
                planet={planet}
                selected={selected === planet.id}
                onClick={() => handlePlanetClick(planet)}
              />
            ))}
          </Flex>
        </ScrollArea>
      )}
      {isError && (
        <Title order={3} m="xl">
          Failed to load planets
        </Title>
      )}
    </Flex>
  );
};
