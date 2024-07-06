import {
  Affix,
  Button,
  Card,
  Flex,
  Group,
  Loader,
  Modal,
  Select,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useTransactions } from '../../hooks/useTransactions';
import { DateInput, DateValue } from '@mantine/dates';
import { useState } from 'react';
import { Currency, TransactionStatus } from '../../types';
import { TransactionsListProps, TransactionStatusLabel } from './types';
import { toLocaleDate } from '../../utils';
import { useDisclosure } from '@mantine/hooks';

export const TransactionsList = ({ planet }: TransactionsListProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<DateValue>(new Date(2024, 0, 1));
  const [status, setStatus] = useState<TransactionStatus>('inProgress');
  const [currency, setCurrency] = useState<Currency>('ICS');
  const { data, isFetching, isError, mutation, refetch } = useTransactions({
    planetId: planet?.id,
    currency,
    minDate: date,
    status,
    onMutationSuccess: () => {
      refetch();
      close();
    },
  });

  const handleBlockTransactions = (planetId: string) =>
    mutation.mutate(planetId);

  const statusSelectList = [
    { value: '', label: 'All status' },
    ...Object.keys(TransactionStatusLabel).map((key) => ({
      value: key,
      label: TransactionStatusLabel[key as TransactionStatus],
    })),
  ];

  const currencyList = [
    { value: '', label: 'All currencies' },
    { value: 'ICS', label: 'ICS' },
    { value: 'GCS', label: 'GCS' },
  ];

  return (
    <Flex direction="column" px="xl" pb="xl">
      <Flex mb="lg" align="end" gap="md">
        <Title order={2} mr="auto">
          Transactions {isFetching && <Loader size="sm" ml="sm" />}
        </Title>
        <Select
          w={140}
          label="Currency"
          value={currency}
          data={currencyList}
          allowDeselect={false}
          onChange={(value) => setCurrency(value as Currency)}
        />
        <Select
          w={140}
          label="Status"
          value={status}
          data={statusSelectList}
          allowDeselect={false}
          onChange={(value) => setStatus(value as TransactionStatus)}
        />
        <DateInput
          w={160}
          label="Only after date"
          value={date}
          onChange={(value: DateValue) => setDate(value)}
        />
      </Flex>
      <Card withBorder p={0}>
        <Table stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Planet</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Currency</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Status</Table.Th>
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
                  {TransactionStatusLabel[transaction.status]}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
      {isError && (
        <Title order={3} m="xl">
          Failed to load transactions
        </Title>
      )}
      {!!(planet && status === 'inProgress' && data?.length) && (
        <>
          <Modal
            opened={opened}
            onClose={() => {
              if (!mutation.isPending) close();
            }}
            withCloseButton={false}
            centered
            w={400}
          >
            <Title order={3} mb="sm">
              Block all transactions in progress of "{planet.name}"?
            </Title>
            <Text color="gray">
              This is irreversible, only use it in case of iminent planet
              uprisings and report to your superior.
            </Text>
            <Group justify="right" mt="xl">
              <Button
                variant="transparent"
                color="text"
                onClick={close}
                disabled={mutation.isPending}
              >
                Nevermind
              </Button>
              <Button
                bg="red"
                onClick={() => handleBlockTransactions(planet.id)}
                disabled={mutation.isPending}
              >
                Block transactions
              </Button>
            </Group>
          </Modal>
          {!opened && (
            <Affix position={{ bottom: 20, right: 20 }}>
              <Button bg="red" onClick={open}>
                Block transactions of "{planet.name}"
              </Button>
            </Affix>
          )}
        </>
      )}
    </Flex>
  );
};
