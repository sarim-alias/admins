
import Select from 'react-select';

export const CategorySelect = ({ field, form }) => {
  const options = [
    { value: 'Featured', label: 'Featured' },
    { value: 'New', label: 'New' },
    { value: 'Driving', label: 'Driving' },
    { value: 'Casual', label: 'Casual' },
    { value: '2 Player', label: '2 Player' }
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#374151', // bg-gray-700
      borderColor: '#4B5563', // border-gray-600
      color: '#fff',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#374151', // bg-gray-700
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4B5563' : '#374151', // bg-gray-600 : bg-gray-700
      color: '#fff',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#4B5563', // bg-gray-600
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#fff',
      ':hover': {
        backgroundColor: '#6B7280', // bg-gray-500
        color: '#fff',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  };

  const handleChange = (selectedOptions) => {
    // For multi-select, we get an array of options
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    console.log(values,"what is comging")
    form.setFieldValue(field.name, values);
  };

  const getValue = () => {
    // When using multi-select, field.value should be an array
    if (!field.value || field.value.length === 0) {
      return [];
    }

    // Handle both array and string values for backward compatibility
    const values = Array.isArray(field.value) ? field.value : [field.value];
    
    return options.filter(option => values.includes(option.value));
  };

  return (
    <Select
      id="category"
      options={options}
      styles={customStyles}
      value={getValue()}
      onChange={handleChange}
      onBlur={() => form.setFieldTouched(field.name, true)}
      className="w-full"
      placeholder="Select Categories"
      isMulti={true}
      closeMenuOnSelect={false}
    />
  );
};