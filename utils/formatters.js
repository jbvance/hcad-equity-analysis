const capitalizeFirstLetter = (sentence) => {
  const words = sentence.split(' ');

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(' ');
};

const formatCurrency = (numToFormat, digits = 0) => {
  let numFloat = parseFloat(numToFormat);
  if (!numFloat || isNaN(numFloat)) {
    numFloat = 0;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: digits,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(numFloat); /* $2,500.00 */
};

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

module.exports = { capitalizeFirstLetter, formatCurrency, numberWithCommas };
