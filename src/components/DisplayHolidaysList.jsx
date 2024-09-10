import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";

const DisplayHolidaysList = ({ nationalHolidaysList }) => {
  return (
    <Box mt={8} border="1px" borderColor="#dddddd" p={4} borderRadius={8}>
      <Text fontWeight="bold">
        祝日一覧（計{nationalHolidaysList.length}日）
      </Text>
      <UnorderedList
        mt={2}
        maxH={240}
        listStylePosition="inside"
        overflowY="scroll"
      >
        {nationalHolidaysList.map((nhl, index) => {
          const outputDate = new Date(nhl.date);
          return (
            <ListItem key={index} fontSize={14}>
              {outputDate.getMonth() + 1}月{outputDate.getDate()}日：
              {nhl.value}
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

export default DisplayHolidaysList;
