import { useState } from 'react';
import { PlanetSelection } from '../PlanetSelection';
import { TransactionsList } from '../TransactionsList';
import { Title } from '@mantine/core';

export const DashboardPage = () => {
  const [planetId, setPlanetId] = useState<string>();
  return (
    <>
      <Title mt="xl" mx="xl">
        Coruscan's bank transaction control
      </Title>
      <PlanetSelection
        selected={planetId}
        onChange={(planet) => {
          setPlanetId(planet?.id);
        }}
      />
      <TransactionsList planetId={planetId} />
    </>
  );
};
