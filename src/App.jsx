import { useState } from "react";
import SelectDate from "./components/SelectDate";
import SelectOptions from "./components/SelectOptions";
import ExecuteButton from "./components/ExecuteButton";
import DisplayResult from "./components/DisplayResult";
import { Box, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";

const DateCalculator = () => {
  const [nationalHolidaysList, setNationalHolidaysList] = useState([]);

  const isHoliday = async (date) => {
    try {
      const response = await fetch(
        "https://holidays-jp.github.io/api/v1/date.json"
      );
      if (!response.ok) {
        throw new Error("Error");
      }
      const nationalHolidays = await response.json();
      const dateString = date.toISOString().split("T")[0];
      const isNH = nationalHolidays[dateString];

      if (isNH !== undefined) {
        setNationalHolidaysList((list) => [...list, isNH]);
      }
      return Object.keys(nationalHolidays).includes(dateString);
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();

  const [startDate, setStartDate] = useState(`${today.getFullYear()}-01-01`);
  const [endDate, setEndDate] = useState(`${today.getFullYear()}-12-31`);
  const [option, setOption] = useState("sundays");
  const [between, setBetween] = useState(0);
  const [days, setDays] = useState(0);

  const [newYearHolidays, setNewYearHolidays] = useState(0);
  const countNewYearHolidays = (valueAsString, valueAsNumber) => {
    if (valueAsNumber >= 0) {
      setNewYearHolidays(valueAsNumber);
    }
  };

  const [GWHolidays, setGWHolidays] = useState(0);
  const countGWHolidays = (valueAsString, valueAsNumber) => {
    if (valueAsNumber >= 0) {
      setGWHolidays(valueAsNumber);
    }
  };

  const [summerHolidays, setSummerHolidays] = useState(0);
  const countSummerHolidays = (valueAsString, valueAsNumber) => {
    if (valueAsNumber >= 0) {
      setSummerHolidays(valueAsNumber);
    }
  };

  const [otherHolidays, setOtherHolidays] = useState(0);
  const countOtherHolidays = (valueAsString, valueAsNumber) => {
    if (valueAsNumber >= 0) {
      setOtherHolidays(valueAsNumber);
    }
  };

  const resetCalculateDays = () => {
    setStartDate(`${today.getFullYear()}-01-01`);
    setEndDate(`${today.getFullYear()}-12-31`);
    setOption("sundays");
    setNewYearHolidays(0);
    setGWHolidays(0);
    setSummerHolidays(0);
    setOtherHolidays(0);
    setBetween(0);
    setDays(0);
  };

  const handleOptionChange = (value) => {
    setOption(value);
  };

  const businessHolidays = [
    {
      title: "年末年始休暇",
      value: newYearHolidays,
      doing: countNewYearHolidays,
    },
    {
      title: "GW休暇",
      value: GWHolidays,
      doing: countGWHolidays,
    },
    {
      title: "夏季休暇",
      value: summerHolidays,
      doing: countSummerHolidays,
    },
    {
      title: "その他休日",
      value: otherHolidays,
      doing: countOtherHolidays,
    },
  ];

  const optionHolidays = [
    {
      title: "日曜のみ",
      value: "sundays",
    },
    {
      title: "土日",
      value: "weekends",
    },
    {
      title: "日曜祝日",
      value: "holidays",
    },
    {
      title: "土日祝日",
      value: "weekends_holidays",
    },
    {
      title: "祝日のみ",
      value: "holidays_only",
    },
  ];

  const calculateDays = async () => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    setBetween((end - start) / (24 * 60 * 60 * 1000) + 1);
    setNationalHolidaysList([]);

    let count = 0;

    while (start <= end) {
      const dayOfWeek = start.getDay();

      if (option === "sundays" && dayOfWeek === 0) {
        count++;
      } else if (
        option === "weekends" &&
        (dayOfWeek === 0 || dayOfWeek === 6)
      ) {
        count++;
      } else if (
        option === "holidays" &&
        (dayOfWeek === 0 || (await isHoliday(start)))
      ) {
        count++;
      } else if (
        option === "weekends_holidays" &&
        (dayOfWeek === 0 || dayOfWeek === 6 || (await isHoliday(start)))
      ) {
        count++;
      } else if (option === "holidays_only" && (await isHoliday(start))) {
        count++;
      }

      start.setDate(start.getDate() + 1);
    }

    count +=
      Number(newYearHolidays) +
      Number(GWHolidays) +
      Number(summerHolidays) +
      Number(otherHolidays);

    setDays(count);
  };

  const dateData = { startDate, setStartDate, endDate, setEndDate };
  const optionData = {
    option,
    businessHolidays,
    optionHolidays,
    handleOptionChange,
  };
  const buttonFunc = { calculateDays, resetCalculateDays };
  const result = { between, days, startDate, endDate };

  return (
    <>
      <Heading
        as="h1"
        size="xl"
        noOfLines={1}
        bg="teal"
        color="white"
        p={2}
        textAlign="center"
      >
        休日計算ツール
      </Heading>
      <Flex
        display="flex"
        bg="white"
        justifyContent="center"
        maxW="lg"
        gap={8}
        mx="auto"
        p={8}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box>
          <SelectDate dateData={dateData} />
          <SelectOptions optionData={optionData} />
          <ExecuteButton buttonFunc={buttonFunc} />
        </Box>
        <Box>
          <DisplayResult result={result} />
          <Box mt={8}>
            <UnorderedList>
              {nationalHolidaysList.map((nhl, index) => {
                return <ListItem key={index}>{nhl}</ListItem>;
              })}
            </UnorderedList>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default DateCalculator;
