import {
  Alert,
  Badge,
  Box,
  Card,
  Divider,
  Flex,
  Loader,
  Select,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useTransactions } from '../../hooks/useTransactions';
import { DateInput, DateValue } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { Currency, TransactionStatus } from '../../types';
import { TransactionsListProps, TransactionStatusDisplay } from './types';
import { toLocaleDate } from '../../utils';
import { BlockTransactionsButton } from '../BlockTransactionsButton';

export const TransactionsList = ({ planet }: TransactionsListProps) => {
  const isDesktop = useMediaQuery(`(min-width: 48em)`);
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<DateValue>(new Date(2024, 0, 1));
  const [status, setStatus] = useState<TransactionStatus>('inProgress');
  const [currency, setCurrency] = useState<Currency>('ICS');
  const { data, isFetching, isError, mutation } = useTransactions({
    planetId: planet?.id,
    currency,
    minDate: date,
    status,
    onMutationSuccess: () => {
      open();
    },
  });

  const handleBlockTransactions = (planetId: string) =>
    mutation.mutate(planetId);

  const statusSelectList = [
    { value: '', label: 'All status' },
    ...Object.keys(TransactionStatusDisplay).map((key) => ({
      value: key,
      label: TransactionStatusDisplay[key as TransactionStatus].label,
    })),
  ];

  const currencyList = [
    { value: '', label: 'All currencies' },
    { value: 'ICS', label: 'ICS' },
    { value: 'GCS', label: 'GCS' },
  ];

  useEffect(() => close(), [close, planet]);

  return (
    <Flex direction="column" px="xl" pb="xl">
      <Flex mb="lg" gap="md" direction={{ base: 'column', sm: 'row' }}>
        <Title order={2} mr="auto">
          Transactions {isFetching && <Loader size="sm" ml="sm" />}
        </Title>
        <Select
          w={{ base: 'auto', sm: 140 }}
          label="Currency"
          value={currency}
          data={currencyList}
          allowDeselect={false}
          onChange={(value) => setCurrency(value as Currency)}
        />
        <Select
          w={{ base: 'auto', sm: 140 }}
          label="Status"
          value={status}
          data={statusSelectList}
          allowDeselect={false}
          onChange={(value) => setStatus(value as TransactionStatus)}
        />
        <DateInput
          w={{ base: 'auto', sm: 160 }}
          label="Only after date"
          value={date}
          onChange={(value: DateValue) => setDate(value)}
        />
      </Flex>
      <Card withBorder p={0}>
        {!isDesktop ? (
          <Box data-testid="transactions-container">
            {data && !data.length && <Text p="sm">No transactions</Text>}
            {data?.map((transaction, index) => (
              <Box key={transaction.id}>
                {!!index && <Divider />}
                <Box pos="relative" p="sm">
                  <Flex>
                    <Text mr="auto">User #{transaction.user}</Text>
                    <Box ta="right">
                      <Text size="xs" color="dark.2">
                        {toLocaleDate(transaction.date)}
                      </Text>
                      {transaction.planet && (
                        <Text size="xs" color="dark.2">
                          at {transaction.planet.name}
                        </Text>
                      )}
                    </Box>
                  </Flex>
                  <Text mt="xs">
                    $ {transaction.amount} {transaction.currency}
                  </Text>
                  <Badge
                    pos="absolute"
                    inset="auto 16px 16px auto"
                    color={TransactionStatusDisplay[transaction.status].color}
                  >
                    {TransactionStatusDisplay[transaction.status].label}
                  </Badge>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Table data-testid="transactions-container">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>Planet</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Currency</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th w={0}>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data && !data.length && (
                <Table.Tr>
                  <Table.Td colSpan={5}>No transactions</Table.Td>
                </Table.Tr>
              )}
              {data?.map((transaction) => (
                <Table.Tr key={transaction.id}>
                  <Table.Td>{transaction.user}</Table.Td>
                  <Table.Td>{transaction.planet?.name}</Table.Td>
                  <Table.Td>{transaction.amount}</Table.Td>
                  <Table.Td>{transaction.currency}</Table.Td>
                  <Table.Td>{toLocaleDate(transaction.date)}</Table.Td>
                  <Table.Td>
                    <Badge
                      color={TransactionStatusDisplay[transaction.status].color}
                    >
                      {TransactionStatusDisplay[transaction.status].label}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>
      {isError && (
        <Title order={3} m="xl">
          Failed to load transactions
        </Title>
      )}
      {!!(planet && status === 'inProgress' && data?.length) && (
        <BlockTransactionsButton
          planetName={planet.name}
          disableActions={mutation.isPending}
          onBlock={async () => await handleBlockTransactions(planet.id)}
        />
      )}
      {opened && (
        <Alert
          variant="filled"
          color="blue"
          title="Thank you for your service!"
          icon="🫡"
          withCloseButton
          pos="fixed"
          inset="20px 20px auto auto"
          w={400}
          onClose={close}
        >
          Your efforts help on bringing peace across the galaxy, may the Force
          be with you!
        </Alert>
      )}
    </Flex>
  );
};
