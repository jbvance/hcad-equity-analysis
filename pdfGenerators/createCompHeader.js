const { capitalizeFirstLetter } = require('../utils/formatters');

const createCompHeader = (comp, index) => {
  const fullAddress = `${comp.site_addr_1} ${comp.site_addr_2} ${comp.site_addr_3}`;
  return {
    style: 'pageHeaderComp',
    pageBreak: 'before',
    table: {
      widths: ['30%', '70%'],
      body: [
        [
          {
            text: `Equity Comp #${parseInt(index) + 1}`,
            rowspan: 2,
            style: 'compTableHeader',
            border: [false, false, false, false],
          },
          {
            text: `Account number: ${comp.acct}`,
            style: 'compTableHeaderText',
            alignment: 'right',
            border: [false, false, false, false],
          },
        ],
        [
          {
            text: '',
            style: 'compTableHeaderText',
            border: [false, false, false, false],
          },
          {
            text: `${capitalizeFirstLetter(fullAddress)}`,
            style: 'compTableHeaderAddress',
            alignment: 'right',
            border: [false, false, false, false],
          },
        ],
      ],
    },
  };
};

module.exports = createCompHeader;
