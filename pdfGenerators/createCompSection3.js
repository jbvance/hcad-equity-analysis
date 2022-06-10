const { formatCurrency, numberWithCommas } = require('../utils/formatters');

const createCompSection3 = (comp) => {
  return {
    table: {
      widths: ['20%', '20%', '20%', '20%', '20%'],
      body: [
        [
          { text: '' },
          { text: 'Area', style: 'textBold' },
          {
            text: 'Value',
            style: 'textBold',
          },
          { text: 'Extra Features:', style: 'textBold' },
          {
            text: `${formatCurrency(comp.x_features_val)}`,
            alignment: 'right',
          },
        ],
        [
          { text: 'Land:', style: 'textBold' },
          {
            text: `${numberWithCommas(comp.land_ar)} sq. ft.`,
          },
          {
            text: `${formatCurrency(comp.land_val)}`,
          },
          { text: '' },
          {
            text: '',
          },
        ],
        [
          { text: 'Improvement:', style: 'textBold' },
          {
            text: `${numberWithCommas(comp.bld_ar)} sq. ft.`,
          },
          {
            text: `${formatCurrency(comp.bld_val)}`,
          },
          { text: '' },
          {
            text: '',
          },
        ],
      ],
    },
    layout: 'noBorders',
  };
};
module.exports = createCompSection3;
