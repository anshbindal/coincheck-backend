const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  console.log("Get data");
  try {
    response = await axios.get(
      `${process.env.BASE_URL}/v1/cryptocurrency/listings/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY,
        },
      }
    );
  } catch (ex) {
    response = null;
    // error
    console.log(ex);
    res.status(404).send({
      message: "Error Occured",
    });
  }
  if (response) {
    // success
    const json = response.data;

    const data = json.data;

    const transformedData = data.map((val) => {
      return {
        id: val.id,
        name: val.name,
        symbol: val.symbol,
        price: val.quote.USD.price,
        change: val.quote.USD.percent_change_24h,
      };
    });

    console.log("transformedData", transformedData);
    res.status(200).send(transformedData);
  }
});

app.listen(5001, () => {
  console.log("Server up on port 5001");
});
