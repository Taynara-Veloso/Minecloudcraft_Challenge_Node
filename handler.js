import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import serverless from "serverless-http";

const app = express();

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const GAMESESSION_TABLE = process.env.GAMESESSION_TABLE;

app.use(express.json());

app.get("/sessions", async (request, response) => {
  const params = {
    TableName: GAMESESSION_TABLE
  };

  try {
    const result = await dynamoDbClient.scan(params).promise();
    const Item = result.Items;

    if (Item.length > 0) {
      return response.json(Item)
    } else {
      response.status(404).json({ error: 'No sessions found' });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Could not retrieve session" });
  }
});

app.post("/sessions", async (request, response) => {
  const sessionId = uuidv4();
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
    response.status(201).json({ message: 'Game session created successfully'});
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Error creating game session', error });
  }
});

app.use((request, response) => {
  return response.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
