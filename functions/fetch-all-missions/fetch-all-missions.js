var Airtable = require("airtable");
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

exports.handler = async (event, context) => {
  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_API_URL } = process.env;

  const base = new Airtable({
    endpointUrl: AIRTABLE_API_URL,
    apiKey: AIRTABLE_API_KEY,
  }).base(AIRTABLE_BASE_ID);

  let data = [];
  await base("Mission")
    .select({
      maxRecords: 100,
      view: "Grid view",
    })
    .firstPage()
    .then((records) => {
      records.forEach((record) => {
        data.push(record.fields);
      });
    })
    .catch((err) => {
      console.log(err.status); // only visible in netlify functions log when running in prod
    });

  try {
    let icons = {};
    data.map((mission, i) => (icons[i] = mission["Superpower Icon"]));
    return {
      statusCode: 200,
      body: JSON.stringify(icons),
      headers: {
        "content-type": "application/json",
      },
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
