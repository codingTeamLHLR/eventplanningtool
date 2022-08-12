const SortByDate = (array) => {
  const arrayCopy = [...array];

  arrayCopy.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return arrayCopy;
};

export default SortByDate;
