const sql = require('mssql');
const config = require('./dbconfig');

async function getData(subj_cdu, subj_grd, subj_size_index) {
  const subjCdu = parseFloat(subj_cdu);
  const subjGrd = parseFloat(subj_grd);
  const subjSizeIndex = parseFloat(subj_size_index);
  let retrievedRecords = null;
  try {
    let pool = await sql.connect(config);
    //let data = await pool.request().query('SELECT TOP 10 * FROM real_acct');
    const NeighborhoodCode = '2908.00';
    const NeighborhoodGroup = '19006';
    const KeyMap = '486F';
    const MapFacet = '4557C';
    let data = await pool
      .request()
      .input('NeighborhoodCode', sql.VarChar(12), NeighborhoodCode)
      .input('NeighborhoodGroup', sql.VarChar(8), NeighborhoodGroup)
      .input('KeyMap', sql.VarChar(6), KeyMap)
      .input('MapFacet', sql.VarChar(6), MapFacet)
      .query(
        `SELECT * FROM ComparePropertyData(@NeighborhoodCode, @NeighborhoodGroup, @KeyMap, @MapFacet)
        WHERE CAST(yr_remodel AS int) > 2010 AND CAST(bld_ar AS INT) > 3000`
      );
    if (data.recordsets && data.recordsets[0]) {
      retrievedRecords = data.recordsets[0];
      //Loop through the records and update with adjustments
      for (let i = 0; i < retrievedRecords.length; i++) {
        const record = retrievedRecords[i];

        // Get comp's impr value per foot
        const compImprValPerFoot = parseFloat(
          parseInt(record.bld_val) / parseInt(record.bld_ar)
        );
        record.impr_val_per_ft = compImprValPerFoot;

        // Adjust for CDU
        const cduAdjPerSqFt = parseFloat(
          ((subjCdu - parseFloat(record.cdu)) / parseFloat(record.cdu)) *
            compImprValPerFoot
        );
        retrievedRecords[i].cduAdjPerSqFt = cduAdjPerSqFt;

        // Adjust for GRD
        const grdAdjPerSqFt = parseFloat(
          ((subjGrd - parseFloat(record.grd)) / parseFloat(record.grd)) *
            compImprValPerFoot
        );
        retrievedRecords[i].grdAdjPerSqFt = grdAdjPerSqFt;

        // Adjust for size
        const sizeAdjPerSqFt =
          -1 *
          parseFloat(
            ((subjSizeIndex - parseFloat(record.size_index)) /
              parseFloat(record.size_index)) *
              compImprValPerFoot
          );
        retrievedRecords[i].sizeAdjPerSqFt = sizeAdjPerSqFt;

        // Compute Comp's net Adjusted improvement value per square foot

        const compNetAdjImprValPerSqFt =
          compImprValPerFoot + cduAdjPerSqFt + grdAdjPerSqFt + sizeAdjPerSqFt;
        record.compNetAdjImprValPerSqFt = compNetAdjImprValPerSqFt;

        // Compute comp's land value per sq ft
        record.compLandValPerSqFt =
          parseFloat(record.land_val) / parseFloat(record.land_ar);

        //Compute comp's total adjusted value
        record.compTotAdjValue =
          compNetAdjImprValPerSqFt * parseFloat(record.bld_ar) +
          parseFloat(record.land_val) +
          parseFloat(record.x_features_val);

        // compute the age of the improvements
        const compAge = new Date().getFullYear() - parseInt(record.yr_impr);
        record.compAge = compAge;
      }

      return retrievedRecords;
    } else {
      throw new error({ message: 'Unable to retrieve records' });
    }
    //return data.recordsets[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getData };
