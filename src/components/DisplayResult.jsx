import {
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  Text,
} from "@chakra-ui/react";

const DisplayResult = ({ result }) => {
  const { between, days, startDate, endDate } = result;

  const TABLE_CONTENTS = [
    { label: "期間日数", value: between },
    { label: "休日数", value: days },
    { label: "期間日数 - 休日数", value: between - days },
  ];

  return (
    <>
      {startDate <= endDate ? (
        <TableContainer>
          <Table>
            <Tbody>
              {TABLE_CONTENTS.map((data, index) => {
                return (
                  <Tr key={index}>
                    <Th
                      border="1px"
                      borderColor="#dddddd"
                      fontWeight="bold"
                      fontSize={14}
                      backgroundColor="#f0f0f0"
                      py={4}
                    >
                      {data.label}
                    </Th>
                    <Td
                      textAlign="center"
                      border="1px"
                      borderColor="#dddddd"
                      fontWeight="bold"
                      py={4}
                    >
                      {data.value} 日
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text color="palevioletred" fontWeight="bold">
          正しい期間を選択してください
        </Text>
      )}
    </>
  );
};

export default DisplayResult;
