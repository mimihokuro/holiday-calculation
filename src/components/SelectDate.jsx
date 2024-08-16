const SelectDate = ({ dateData, setDateData }) => {
  const handleYearChange = (e) => {
    setDateData((prev) => ({ ...prev, year: Number(e.target.value) }));
  };

  const handleMonthChange = (e) => {
    setDateData((prev) => ({ ...prev, month: Number(e.target.value) }));
  };

  const handleDayChange = (e) => {
    setDateData((prev) => ({ ...prev, date: Number(e.target.value) }));
  };

  return (
    <>
      <input type="number" value={dateData.year} onChange={handleYearChange} />
      <span>年</span>
      <select value={dateData.month} onChange={handleMonthChange}>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <span>月</span>
      <select value={dateData.date} onChange={handleDayChange}>
        {[...Array(31)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <span>日</span>
    </>
  );
};

export default SelectDate;
