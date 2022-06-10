const { formatCurrency } = require('../utils/formatters');
const createCompSection1 = (comp) => {
  return {
    table: {
      widths: ['*', '*', '*'],
      body: [
        [
          {
            text: `Market Value (per HCAD):`,
          },
          {
            text: `${formatCurrency(comp.tot_mkt_val)}`,
          },
          { text: `${comp.compAge} years old`, alignment: 'right' },
        ],
        [
          {
            style: 'adjustedSubjectValue',
            text: `Adjusted to Subject: `,
          },
          {
            style: 'adjustedSubjectValue',
            text: `${formatCurrency(comp.compTotAdjValue)}`,
          },
          {
            text: `Bedrooms: ${comp.rmb}    Bathrooms: ${comp.rmf}`,
            alignment: 'right',
          },
        ],
      ],
    },
    layout: 'noBorders',
  };
};

module.exports = createCompSection1;
