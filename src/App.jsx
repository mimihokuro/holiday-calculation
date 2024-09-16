import { useEffect, useState } from "react";
import SelectDate from "./components/SelectDate";
import SelectOptions from "./components/SelectOptions";
import ExecuteButton from "./components/ExecuteButton";
import DisplayResult from "./components/DisplayResult";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import DisplayHolidaysList from "./components/DisplayHolidaysList";

const DateCalculator = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(`${today.getFullYear()}-01-01`);
  const [endDate, setEndDate] = useState(`${today.getFullYear()}-12-31`);
  const [option, setOption] = useState("sundays");
  const [nationalHolidaysList, setNationalHolidaysList] = useState(null);
  const [nationalHolidaysInPeriodList, setNationalHolidaysInPeriodList] =
    useState([]);
  const [daysInPeriod, setDaysInPeriod] = useState(0);
  const [numberOfHolidays, setNumberOfHolidays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const BUSINESS_HOLIDAYS = [
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

  const OPTION_HOLIDAYS = [
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

  // マウント時に祝日一覧を取得
  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const response = await fetch(
          "https://holidays-jp.github.io/api/v1/date.json"
        );
        if (!response.ok) {
          throw new Error("Error");
        }
        const json = await response.json();
        setNationalHolidaysList(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHolidayData();
  });

  // 指定の日付が祝日かどうか判定
  const isHoliday = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const holidayName = nationalHolidaysList[dateString];

    if (holidayName !== undefined) {
      setNationalHolidaysInPeriodList((list) => [
        ...list,
        { date: dateString, value: holidayName },
      ]);
    }
    return Object.keys(nationalHolidaysList).includes(dateString);
  };

  // オプションの切り替え
  const handleOptionChange = (value) => {
    setOption(value);
  };

  // 計算実行
  const calculateDays = () => {
    setIsLoading(true);
    let start = new Date(startDate);
    let end = new Date(endDate);
    setDaysInPeriod((end - start) / (24 * 60 * 60 * 1000) + 1);
    setNationalHolidaysInPeriodList([]);

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
        (isHoliday(start) || dayOfWeek === 0)
      ) {
        count++;
      } else if (
        option === "weekends_holidays" &&
        (isHoliday(start) || dayOfWeek === 0 || dayOfWeek === 6)
      ) {
        count++;
      } else if (option === "holidays_only" && isHoliday(start)) {
        count++;
      }

      start.setDate(start.getDate() + 1);
    }

    count +=
      Number(newYearHolidays) +
      Number(GWHolidays) +
      Number(summerHolidays) +
      Number(otherHolidays);

    setNumberOfHolidays(count);
    setIsLoading(false);
  };

  // 検索条件をリセット
  const resetCalculateDays = () => {
    setStartDate(`${today.getFullYear()}-01-01`);
    setEndDate(`${today.getFullYear()}-12-31`);
    setOption("sundays");
    setNewYearHolidays(0);
    setGWHolidays(0);
    setSummerHolidays(0);
    setOtherHolidays(0);
    setDaysInPeriod(0);
    setNumberOfHolidays(0);
    setNationalHolidaysInPeriodList([]);
  };

  const dateData = { startDate, setStartDate, endDate, setEndDate };
  const optionData = {
    option,
    BUSINESS_HOLIDAYS,
    OPTION_HOLIDAYS,
    handleOptionChange,
  };
  const buttonFunc = { calculateDays, resetCalculateDays };
  const result = { daysInPeriod, numberOfHolidays };

  return (
    <Stack maxW={800} mx="auto" p={4}>
      <Heading
        as="h1"
        size="xl"
        fontWeight="normal"
        noOfLines={1}
        borderBottom="1px"
        py={2}
        borderBottomColor="#dddddd"
      >
        🗓️休日計算ツール
      </Heading>
      <Text mt={2}>指定の期間内の休日数を計算するツールです。</Text>
      <Text mt={2}>※祝日は昨年、今年、来年のみ取得できます。</Text>
      <Flex
        display="flex"
        bg="white"
        justifyContent="center"
        gap={4}
        px={{ base: 0, md: 0 }}
        py={{ base: 4, md: 6 }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Stack
          border="1px"
          borderColor="#dddddd"
          flexShrink="1"
          px={4}
          py={8}
          borderRadius={8}
        >
          <SelectDate dateData={dateData} />
          <SelectOptions optionData={optionData} />
          <ExecuteButton buttonFunc={buttonFunc} />
        </Stack>
        <Stack
          border="1px"
          borderColor="#dddddd"
          px={4}
          py={8}
          borderRadius={8}
          minW={{ base: "initial", md: 360 }}
        >
          {isLoading ? (
            <Flex placeContent="center" placeItems="center" gap={2} h="100%">
              <WarningIcon />
              <Text>計算中...</Text>
            </Flex>
          ) : (
            <>
              <DisplayResult result={result} />
              <DisplayHolidaysList
                nationalHolidaysInPeriodList={nationalHolidaysInPeriodList}
              />
            </>
          )}
        </Stack>
      </Flex>
    </Stack>
  );
};

export default DateCalculator;
