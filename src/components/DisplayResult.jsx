import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  Text,
} from "@chakra-ui/react";

const THs = ["期間日数", "休日数", "期間日数 - 休日数"];

const DisplayResult = ({ result }) => {
  const { between, days, startDate, endDate } = result;
  return (
    <>
      {startDate <= endDate ? (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                {THs.map((data, index) => {
                  return (
                    <Th
                      key={index}
                      textAlign="center"
                      border="1px"
                      borderColor="#dddddd"
                      fontWeight="bold"
                      fontSize={16}
                      w="md"
                    >
                      {data}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                {[
                  { label: between },
                  { label: days },
                  { label: between - days },
                ].map((data, index) => {
                  return (
                    <Td
                      key={index}
                      textAlign="center"
                      border="1px"
                      borderColor="#dddddd"
                      fontWeight="bold"
                      w="md"
                    >
                      {data.label} 日
                    </Td>
                  );
                })}
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text color="palevioletred" mt="8" fontWeight="bold">
          正しい期間を選択してください
        </Text>
      )}
    </>
  );
};

export default DisplayResult;
