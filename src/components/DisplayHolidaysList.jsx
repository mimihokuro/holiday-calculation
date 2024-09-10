import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";

const DisplayHolidaysList = ({ nationalHolidaysList }) => {
  return (
    <Box mt={8}>
      <Text fontWeight="bold">祝日一覧</Text>
      <UnorderedList
        mt={2}
        maxH={320}
        listStylePosition="inside"
        overflowY="scroll"
      >
        {nationalHolidaysList.map((nhl, index) => {
          return <ListItem key={index}>{nhl}</ListItem>;
        })}
      </UnorderedList>
    </Box>
  );
};

export default DisplayHolidaysList;
