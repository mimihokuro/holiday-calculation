const SelectOptions = ({ options, handleOption }) => {
  return (
    <div>
      {options.map((option) => {
        return (
          <label key={option.id}>
            <input
              type="radio"
              name="holidayOptions"
              onClick={() => handleOption(option.id)}
            />
            {option.content}
          </label>
        );
      })}
    </div>
  );
};

export default SelectOptions;
