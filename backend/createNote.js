const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

module.exports.createNote = async (event) => {
  console.log(event);
  const accountID = event.pathParameters.accountID;
  event = JSON.parse(event.body);

  const noteID = AWS.util.uuid.v4();
  const noteTitle = event.noteTitle;
  const tags = event.tags;
  const noteContent = event.noteContent;

  let timeCreated = Date.now();

  var params = {
    TableName: tableName,
    Item: {
      accountID: accountID,
      noteID: noteID,
      noteTitle: noteTitle,
      tags: tags,
      noteContent: noteContent,
      timeCreated: timeCreated,
    },
  };
  const result = await dynamoDb.put(params).promise();
  event.accountID = accountID;
  event.noteID = noteID;
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Succesfully Created Note",
        input: event,
        result: result,
        params: params,
      },
      null,
      2
    ),
  };
};
