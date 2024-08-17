import AWS from "aws-sdk";
import uuid from "uuid";
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

app.post("/sessions", async (req, res) => {
  const sessionId = uuid.v4();
  const { hostname, players, gamemap, gamemode } = req.body;

  const params = {
    TableName: GAMESESSION_TABLE,
    Item: {
      sessionId,
      hostname,
      players,
      gamemap,
      gamemode,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    return res
      .status(404)
      .json({ message: 'Game session created successfully'});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 'Error creating game session', error });
  }
});

app.use((res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
