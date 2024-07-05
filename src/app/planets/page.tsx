import {
  Avatar,
  Card,
  Flex,
  LoadingOverlay,
  ScrollArea,
  Table,
} from '@mantine/core';
import { usePlanets } from './hooks/usePlanets';
import { Planet } from './types';

export const PlanetsPage = () => {
  const { data, isFetching, isError } = usePlanets();
  const handlePlanetClick = (planet: Planet) => {
    console.log(planet);
  };
  return (
    <Flex direction="column" p="xl" pos="fixed" inset={0}>
      <h1>Planets</h1>
      <LoadingOverlay
        visible={isFetching}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      {data && (
        <Card shadow="sm" padding={0} radius="md" withBorder flex={1}>
          <ScrollArea>
            <Table stickyHeader highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w={50}></Table.Th>
                  <Table.Th>Name</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data?.map((planet) => (
                  <Table.Tr
                    key={planet.id}
                    onClick={() => handlePlanetClick(planet)}
                  >
                    <Table.Td>
                      <Avatar
                        key={planet.id}
                        name={planet.name}
                        color="initials"
                      />
                    </Table.Td>
                    <Table.Td>{planet.name}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>
      )}
      {isError && <h2>Failed to load planets</h2>}
    </Flex>
  );
};
