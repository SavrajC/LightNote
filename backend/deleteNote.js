const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

module.exports.deleteNote = async (event) => {
  console.log(event);
  const accountID = event.pathParameters.accountID;
  const noteID = event.pathParameters.noteID;

  var params = {
    TableName: tableName,
    Key: {
      accountID: accountID,
      noteID: noteID,
    },
  };

  const result = await dynamoDb.delete(params).promise();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(
      {
        message: "Successfully deleted note",
        result: result,
      },
      null,
      2
    ),
  };
};
