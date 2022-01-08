import axios from "axios";

export default async function handler(req, res) {
  const { collName } = req.query;

  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST || "0.0.0.0";
  const URL = process.env.NODE_ENV == true ? HOST : HOST + ":" + PORT;
  const http = process.env.NODE_ENV == true ? 'https' : 'http';

  const data = await axios.get(`${http}://${URL}/api/v1/${collName}`);
  console.log(data.data);
  res.status(200).send(data.data);
}
