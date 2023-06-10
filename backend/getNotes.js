const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

module.exports.getNotes = async (event) => {
  const accountID = event.pathParameters.accountID;
  var params = {
    TableName: tableName,
    KeyConditionExpression: " accountID = :accountID",
    ExpressionAttributeValues: {
      ":accountID": accountID,
    },
  };

  try {
    let results = await dynamoDb.query(params).promise();
    console.log(JSON.stringify(results));
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },

      body: JSON.stringify(results.Items, null, 2),
    };
  } catch (err) {
    console.log("Error was captured");
    console.error(JSON.stringify(err));
    return err;
  }
};
