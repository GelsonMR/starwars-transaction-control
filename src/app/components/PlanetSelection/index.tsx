import {
  Avatar,
  Flex,
  LoadingOverlay,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import { usePlanets } from '../../hooks/usePlanets';
import { Planet } from '../../types';
import { PlanetCard } from '../PlanetCard';
import { PlanetSelectionProps } from './types';

export const PlanetSelection = ({
  selected,
  onChange,
}: PlanetSelectionProps) => {
  const { data, isFetching, isError } = usePlanets();
  const handlePlanetClick = (planet?: Planet) => {
    onChange?.(planet);
  };
  return (
    <Flex direction="column" py="xl" pos="fixed" inset={0}>
      <Title ml="xl">Planets</Title>
      <LoadingOverlay
        visible={isFetching}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      {data && (
        <ScrollArea>
          <Flex gap="sm" p="xl" py="sm">
            <PlanetCard
              selected={!selected}
              onClick={() => handlePlanetClick()}
            >
              <Flex direction="column" p="xs" h="100%">
                <Text fw={700} mb="auto">
                  All planets
                </Text>
              </Flex>
            </PlanetCard>
            {data?.map((planet) => (
              <PlanetCard
                key={planet.id}
                planet={planet}
                selected={selected === planet.id}
                onClick={() => handlePlanetClick(planet)}
              >
                <Flex direction="column" p="xs" h="100%">
                  <Text fw={700} mb="auto">
                    {planet.name}
                  </Text>
                  <Avatar key={planet.id} name={planet.name} color="initials" />
                </Flex>
              </PlanetCard>
            ))}
          </Flex>
        </ScrollArea>
      )}
      {isError && <h2>Failed to load planets</h2>}
    </Flex>
  );
};
