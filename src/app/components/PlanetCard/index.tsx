import { Flex, Text } from '@mantine/core';
import { CardContainer } from './styles';
import { PlanetCardProps } from './types';

export const PlanetCard = ({
  planet,
  selected = false,
  ...props
}: PlanetCardProps) => {
  return (
    <CardContainer $selected={selected} {...props}>
      <Flex direction="column" p="xs" h="100%">
        <Text fw={700} mb="auto">
          {planet?.name || 'All planets'}
        </Text>
      </Flex>
    </CardContainer>
  );
};
