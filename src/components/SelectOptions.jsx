const SelectOptions = ({ optionData }) => {
  const { option, businessHolidays, optionHolidays, handleOptionChange } =
    optionData;

  return (
    <table className="mt-2">
      <tbody>
        <tr>
          <th className="w-32 text-left">集計する休日は</th>
          <td className="flex gap-2 flex-wrap py-1 pl-2 pr-2">
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
  );
};

export default SelectOptions;
