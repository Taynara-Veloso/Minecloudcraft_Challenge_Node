import AWS from "aws-sdk";
import express from "express";
import serverless from "serverless-http";

const app = express();

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const GAMESESSION_TABLE = process.env.GAMESESSION_TABLE;

app.use(express.json());

app.get("/sessions", async (req, res) => {
  const params = {
    TableName: GAMESESSION_TABLE,
    Key: {
      sessionId: req.params.sessionId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { sessionId, hostname, players, gamemap, gamemode } = Item;
      return res.json({ sessionId, hostname, players, gamemap, gamemode });
    } else {
      return res
        .status(404)
        .json({ error: 'Could not find user with provided "sessionId"' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Could not retreive session" });
  }
});

app.use((res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);

