import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
import express from "express";
import serverless from "serverless-http";

const app = express();

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const GAMESESSION_TABLE = process.env.GAMESESSION_TABLE;

app.use(express.json());

app.get("/sessions/:sessionId", async (request, response) => {
  const params = {
    TableName: GAMESESSION_TABLE,
    Key: {
      sessionId: request.params.sessionId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { sessionId, hostname, players, gamemap, gamemode } = Item;
      return response.json({ sessionId, hostname, players, gamemap, gamemode });
    } else {
      return response
        .status(404)
        .json({ error: 'Could not find user with provided "sessionId"' });
    }
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ error: "Could not retrieve session" });
  }
});

app.post("/sessions", async (request, response) => {
  const sessionId = uuid.v4();
  const { hostname, players, gamemap, gamemode } = request.body;

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
    return response
      .status(201)
      .json({ message: 'Game session created successfully'});
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ error: 'Error creating game session', error });
  }
});

app.use((request, response) => {
  return response.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
