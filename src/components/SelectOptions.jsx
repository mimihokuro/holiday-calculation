import {
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  Radio,
  RadioGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from "@chakra-ui/react";

const SelectOptions = ({ optionData }) => {
  const { option, BUSINESS_HOLIDAYS, OPTION_HOLIDAYS, handleOptionChange } =
    optionData;

  return (
    <TableContainer>
      <Table variant="simple" mt={8}>
        <Tbody>
          <Tr>
            <Th w={32} textAlign="left">
              集計する休日は
            </Th>
            <Td display="flex" gap={2} flexWrap="wrap" py={1} px={2}>
              <RadioGroup value={option} onChange={handleOptionChange}>
                <HStack flexWrap="wrap">
                  {OPTION_HOLIDAYS.map((oh) => {
                    return (
                      <Radio key={oh.value} colorScheme="teal" value={oh.value}>
                        {oh.title}
                      </Radio>
                    );
                  })}
                </HStack>
              </RadioGroup>
            </Td>
          </Tr>
          {BUSINESS_HOLIDAYS.map((bh) => {
            return (
              <Tr key={bh.title}>
                <Th w={32} textAlign="left">
                  {bh.title}
                </Th>
                <Td display="flex" placeItems="center" gap={2}>
                  <NumberInput
                    maxW={16}
                    min={0}
                    value={bh.value}
                    onChange={bh.doing}
                    focusBorderColor="teal.500"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  日
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SelectOptions;
