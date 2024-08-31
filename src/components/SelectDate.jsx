const SelectDate = ({ dateData }) => {
  const { startDate, setStartDate, endDate, setEndDate } = dateData;
  return (
    <>
      <div className="flex gap-3 mt-4 items-center">
        <div className="mt-2">
          <input
            className="w-140 rounded-md border-0 py-1 pl-2 pr-2 text-left text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="date"
            value={startDate}
            aria-labelledby="期間開始日"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        ＞
        <div className="mt-2">
          <input
            className="w-140 rounded-md border-0 py-1 pl-2 pr-2 text-left text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="date"
            value={endDate}
            aria-labelledby="期間終了日"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default SelectDate;
