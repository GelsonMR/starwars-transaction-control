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
        {planet?.transactions && (
          <>
            <Text size="xs" c="gray">
              {planet.transactions?.length}{' '}
              {`transaction${planet.transactions?.length !== 1 ? 's' : ''}`}
            </Text>
            <Text size="xs" fw={700}>
              $ {planet.transactions?.sum}
            </Text>
          </>
        )}
      </Flex>
    </CardContainer>
  );
};
