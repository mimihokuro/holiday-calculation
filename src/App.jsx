import { useState } from "react";

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

  return (
    <div className="bg-white mx-auto max-w-md py-24 sm:px-6 sm:py-32 lg:px-8">
      <h1 className="font-bold text-2xl text-center">休日計算ツール</h1>
      <div className="mt-4">
        <div className="mt-2">
          <label>期間開始日：</label>
          <input
            className="w-140 rounded-md border-0 py-1 pl-2 pr-2 text-left text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>期間終了日：</label>
          <input
            className="w-140 rounded-md border-0 py-1 pl-2 pr-2 text-left text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <table className="mt-2">
        <tbody>
          <tr>
            <th className="w-32 text-left">集計する休日は</th>
            <td className="flex gap-2 flex-wrap  py-1 pl-2 pr-2">
              {optionHolidays.map((oh) => {
                return (
                  <label key={oh.value}>
                    <input
                      type="radio"
                      value={oh.value}
                      checked={option === oh.value}
                      onChange={handleOptionChange}
                    />
                    {oh.title}
                  </label>
                );
              })}
            </td>
          </tr>
          {businessHolidays.map((bh) => {
            return (
              <tr key={bh.title}>
                <th className="w-32 text-left">{bh.title}</th>
                <td className="py-1">
                  <input
                    className="w-14 rounded-md border-0 py-1 pl-2 pr-2 text-center text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="number"
                    value={bh.value}
                    onChange={bh.doing}
                  />
                  日
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-4 justify-center mt-4">
        <button
          className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-200 bg-green-600 shadow-sm hover:bg-green-500 active:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={calculateDays}
        >
          計算する
        </button>
        <button
          className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 bg-gray-200 shadow-sm hover:bg-gray-100 active:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={resetCalculateDays}
        >
          リセット
        </button>
      </div>
      <div className="font-bold text-2xl mt-4 text-center">
        {startDate <= endDate ? `${days} 日` : "正しい期間を選択してください"}
      </div>
    </div>
  );
};

export default DateCalculator;
