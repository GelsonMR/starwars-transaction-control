import { ChangeEvent, useState } from 'react';
import {
  Flex,
  TextInput,
  LoadingOverlay,
  ScrollArea,
  Title,
} from '@mantine/core';
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
    <Flex direction="column" py="xl">
      <Flex mx="xl">
        <Title mr="auto">Planets</Title>
        <TextInput
          value={query}
          placeholder="Search planet"
          onChange={handleSearchChange}
        />
      </Flex>
      <LoadingOverlay
        visible={isFetching}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
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
      {isError && <h2>Failed to load planets</h2>}
    </Flex>
  );
};
