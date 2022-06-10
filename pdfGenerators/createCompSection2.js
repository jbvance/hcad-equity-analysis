const createCompSection2 = (comp) => {
  return {
    table: {
      widths: ['25%', '45%', '10%', '20%'],
      body: [
        [
          { text: '' },
          { text: '' },
          {
            text: 'HCAD Adj. Factors',
            colSpan: 2,
            alignment: 'center',
            style: 'textBold',
          },
          { text: '' },
        ],
        [
          { text: 'Quality / Grade:', style: 'textBold' },
          {
            text: `${comp.quality_dscr} / ${comp.cdu_grade}`,
            alignment: 'left',
          },
          { text: 'CDU', style: 'textBold' },
          { text: `${comp.cdu}`, alignment: 'right' },
        ],
        [
          { text: 'Neighborhood / Group:', style: 'textBold' },
          {
            text: `${comp.neighborhood_code} / ${comp.neighborhood_grp}`,
            alignment: 'left',
          },
          { text: 'Grade', style: 'textBold' },
          { text: `${comp.grd}`, alignment: 'right' },
        ],
      ],
    },
    layout: 'noBorders',
  };
};

module.exports = createCompSection2;
