import { ArrowRightIcon } from "@chakra-ui/icons";
import { HStack, Input, Text } from "@chakra-ui/react";

const SelectDate = ({ dateData }) => {
  const { startDate, setStartDate, endDate, setEndDate } = dateData;
  return (
    <>
      <HStack
        placeItems="center"
        gap={4}
        direction={{ base: "column", sm: "row" }}
      >
        <Input
          type="date"
          variant="filled"
          size="md"
          focusBorderColor="teal.500"
          value={startDate}
          aria-labelledby="期間開始日"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <ArrowRightIcon
          transform={{ base: "rotate(90deg)", sm: "rotate(0deg)" }}
        />
        <Input
          type="date"
          variant="filled"
          size="md"
          focusBorderColor="teal.500"
          value={endDate}
          aria-labelledby="期間終了日"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </HStack>
      {startDate > endDate ? (
        <Text color="palevioletred" fontWeight="bold" textAlign="center" mt={2}>
          正しい期間を選択してください
        </Text>
      ) : null}
    </>
  );
};

export default SelectDate;
