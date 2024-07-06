import { useState } from 'react';
import { PlanetSelection } from '../PlanetSelection';
import { TransactionsList } from '../TransactionsList';
import { Title } from '@mantine/core';
import { Planet } from '../../types';

export const DashboardPage = () => {
  const [planet, setPlanet] = useState<Planet>();
  return (
    <>
      <Title mt="xl" mx="xl">
        Coruscant's bank transaction control
      </Title>
      <PlanetSelection
        selected={planet?.id}
        onChange={(planet) => {
          setPlanet(planet);
        }}
      />
      <TransactionsList planet={planet} />
    </>
  );
};
