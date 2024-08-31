import { useState } from "react";
import SelectDate from "./components/SelectDate";
import SelectOptions from "./components/SelectOptions";
import ExecuteButton from "./components/ExecuteButton";

const DateCalculator = () => {
  const isHoliday = async (date) => {
    try {
      const response = await fetch(
        "https://holidays-jp.github.io/api/v1/date.json"
      );
      if (!response.ok) {
        throw new Error("Error");
      }
      const nationalHolidays = await response.json();
      return Object.keys(nationalHolidays).includes(
        date.toISOString().split("T")[0]
      );
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
  const countNewYearHolidays = (e) => {
    if (e.target.value >= 0) {
      setNewYearHolidays(e.target.value);
    }
  };

  const [GWHolidays, setGWHolidays] = useState(0);
  const countGWHolidays = (e) => {
    if (e.target.value >= 0) {
      setGWHolidays(e.target.value);
    }
  };

  const [summerHolidays, setSummerHolidays] = useState(0);
  const countSummerHolidays = (e) => {
    if (e.target.value >= 0) {
      setSummerHolidays(e.target.value);
    }
  };

  const [otherHolidays, setOtherHolidays] = useState(0);
  const countOtherHolidays = (e) => {
    if (e.target.value >= 0) {
      setOtherHolidays(e.target.value);
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

  const handleOptionChange = (e) => {
    setOption(e.target.value);
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

  return (
    <div className="bg-white mx-auto max-w-md py-24 sm:px-6 sm:py-32 lg:px-8">
      <h1 className="font-bold text-2xl text-center">休日計算ツール</h1>
      <SelectDate dateData={dateData} />
      <SelectOptions optionData={optionData} />
      <ExecuteButton buttonFunc={buttonFunc} />
      <table className="font-bold mt-4 mx-auto text-center">
        <thead>
          <tr>
            <th className="px-2 border-black border">期間日数</th>
            <th className="px-2 border-black border">休日数</th>
            <th className="px-2 border-black border">期間日数 - 休日数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border-black border">{between}日</td>
            <td className="p-2 border-black border">
              {startDate <= endDate
                ? `${days} 日`
                : "正しい期間を選択してください"}
            </td>
            <td className="p-2 border-black border">{between - days} 日</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DateCalculator;
