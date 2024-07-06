import { Card, Flex, LoadingOverlay, Table, Title } from '@mantine/core';
import { useTransactions } from '../../hooks/useTransactions';
import { DateInput, DateValue } from '@mantine/dates';
import { useState } from 'react';

export const TransactionsList = () => {
  const [date, setDate] = useState<DateValue>(new Date(2024, 0, 31));
  const { data, isFetching, isError } = useTransactions({
    minDate: date,
    status: 'inProgress',
  });

  const handleDateChange = (value: DateValue) => {
    setDate(value);
  };

  return (
    <Flex direction="column" px="xl" pb="xl">
      <Flex mb="lg" align="end" gap="md">
        <Title mr="auto">Transactions</Title>
        <DateInput
          label="Only after date"
          value={date}
          onChange={handleDateChange}
        />
      </Flex>
      <LoadingOverlay
        visible={isFetching}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Card withBorder p={0}>
        <Table stickyHeader>
          <Table.Thead>
            <Table.Th>User</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Currency</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Status</Table.Th>
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
                <Table.Td>{transaction.amount}</Table.Td>
                <Table.Td>{transaction.currency}</Table.Td>
                <Table.Td>{transaction.date}</Table.Td>
                <Table.Td>{transaction.status}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
      {isError && <h2>Failed to load transactions</h2>}
    </Flex>
  );
};
