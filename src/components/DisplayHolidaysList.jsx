import { ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";

const DisplayHolidaysList = ({ nationalHolidaysList }) => {
  const dayText = { weekday: "short" };
  return (
    <Stack mt={8} backgroundColor="#f4f4f4" p={4} borderRadius={8}>
      <Text fontWeight="bold">
        祝日一覧（計{nationalHolidaysList.length}日）
      </Text>
      <UnorderedList maxH={240} listStylePosition="inside" overflowY="scroll">
        {nationalHolidaysList.map((nhl, index) => {
          const outputDate = new Date(nhl.date);
          return (
            <ListItem key={index} fontSize={14}>
              {outputDate.getMonth() + 1}月{outputDate.getDate()}日&#40;
              {outputDate.toLocaleDateString("ja-JP", dayText)}&#41;：
              {nhl.value}
            </ListItem>
          );
        })}
      </UnorderedList>
    </Stack>
  );
};

export default DisplayHolidaysList;
