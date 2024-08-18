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
  const [option, setOption] = useState("all");
  const [days, setDays] = useState(0);

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
      } else if (option === "holidays" && (await isHoliday(start))) {
        count++;
      } else if (
        option === "weekends_holidays" &&
        (dayOfWeek === 0 || dayOfWeek === 6 || (await isHoliday(start)))
      ) {
        count++;
      } else if (option === "holidays_only" && (await isHoliday(start))) {
        count++;
      } else if (option === "all") {
        count++;
      }

      start.setDate(start.getDate() + 1);
    }

    setDays(count);
  };

  return (
    <div>
      <div>
        <label>期間開始日：</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>期間終了日：</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label>オプション：</label>
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="sundays">日曜のみ</option>
          <option value="weekends">土日</option>
          <option value="holidays">日曜祝日</option>
          <option value="weekends_holidays">土日祝日</option>
          <option value="holidays_only">祝日のみ</option>
          <option value="all">全ての日</option>
        </select>
      </div>
      <button onClick={calculateDays}>計算する</button>
      <div>
        {startDate <= endDate ? `${days} 日` : "正しい期間を選択してください"}
      </div>
    </div>
  );
};

export default DateCalculator;
