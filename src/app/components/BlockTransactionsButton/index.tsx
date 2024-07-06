import { Affix, Button, Group, Modal, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BlockTransactionsButtonProps } from './types';

export const BlockTransactionsButton = ({
  planetName,
  disableActions,
  onBlock,
}: BlockTransactionsButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleOnBlockClick = async () => {
    await onBlock();
    close();
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          if (!disableActions) close();
        }}
        withCloseButton={false}
        centered
        w={400}
      >
        <Title order={3} mb="sm">
          Block all transactions in progress of "{planetName}"?
        </Title>
        <Text color="gray">
          This is irreversible, only use it in case of iminent planet uprisings
          and report to your superior.
        </Text>
        <Group justify="right" mt="xl">
          <Button
            variant="transparent"
            color="text"
            onClick={close}
            disabled={disableActions}
          >
            Nevermind
          </Button>
          <Button
            bg="red"
            onClick={handleOnBlockClick}
            disabled={disableActions}
          >
            Block transactions
          </Button>
        </Group>
      </Modal>
      {!opened && (
        <Affix position={{ bottom: 20, right: 20 }}>
          <Button bg="red" onClick={open}>
            Block transactions of "{planetName}"
          </Button>
        </Affix>
      )}
    </>
  );
};
