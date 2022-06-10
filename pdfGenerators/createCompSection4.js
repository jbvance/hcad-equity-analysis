const { formatCurrency, numberWithCommas } = require('../utils/formatters');

const createCompSection4 = (comp) => {
  return {
    table: {
      widths: ['35%', '15%', '50%'],
      body: [
        [
          { text: 'Adjustments:', style: 'adjustmentsHeader' },
          { text: '' },
          { text: '' },
        ],
        [
          { text: 'CDU Adjustment Per Sqft', style: 'textBold' },
          { text: `${formatCurrency(comp.cduAdjPerSqFt, 2)}` },
          { text: '' },
        ],
        [
          { text: 'Grade Adjustment Per Sqft', style: 'textBold' },
          { text: `${formatCurrency(comp.grdAdjPerSqFt, 2)}` },
          { text: '' },
        ],
        [
          { text: 'Size Adjustment Per Sqft', style: 'textBold' },
          { text: `${formatCurrency(comp.sizeAdjPerSqFt, 2)}` },
          { text: '' },
        ],
        [
          { text: 'Net Adjusted Value per Sqft', style: 'textBold' },
          { text: `${formatCurrency(comp.compNetAdjImprValPerSqFt, 2)}` },
          { text: '' },
        ],
        [
          { text: 'Total Value Adjusted to Subject', style: 'textBold' },
          { text: `${formatCurrency(comp.compTotAdjValue, 0)}` },
          {
            alignment: 'left',
            text: `${formatCurrency(
              comp.compNetAdjImprValPerSqFt,
              2
            )} * ${numberWithCommas(comp.bld_ar)} + ${formatCurrency(
              comp.land_val
            )} + ${formatCurrency(comp.x_features_val)}`,
          },
        ],
      ],
    },
    layout: 'noBorders',
  };
};

module.exports = createCompSection4;
