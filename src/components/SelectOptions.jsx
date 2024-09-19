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
  CheckboxGroup,
  Checkbox,
  Box,
} from "@chakra-ui/react";

const SelectOptions = ({ optionData }) => {
  const {
    option,
    selectedDays,
    BUSINESS_HOLIDAYS,
    OPTION_HOLIDAYS,
    OPTION_WEEKDAYS,
    handleOptionChange,
    handleDaySelection,
  } = optionData;

  return (
    <TableContainer>
      <Table variant="simple" mt={4}>
        <Tbody>
          <Tr>
            <Th textAlign="left">集計する日は</Th>
            <Td display="flex" gap={2} flexWrap="wrap" py={3} px={2}>
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
              {option === "weekday_designation" && (
                <Box
                  p={2}
                  border="1px"
                  borderColor="#e0e0e0"
                  borderRadius={8}
                  mt={2}
                >
                  <CheckboxGroup
                    value={selectedDays}
                    onChange={handleDaySelection}
                  >
                    <HStack flexWrap="wrap" gap={4}>
                      {OPTION_WEEKDAYS.map((day) => {
                        return (
                          <Checkbox
                            key={day.value}
                            colorScheme="teal"
                            value={day.value}
                          >
                            {day.title}
                          </Checkbox>
                        );
                      })}
                    </HStack>
                  </CheckboxGroup>
                </Box>
              )}
            </Td>
          </Tr>
          {BUSINESS_HOLIDAYS.map((bh) => {
            return (
              <Tr key={bh.title}>
                <Th textAlign="left">{bh.title}</Th>
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
