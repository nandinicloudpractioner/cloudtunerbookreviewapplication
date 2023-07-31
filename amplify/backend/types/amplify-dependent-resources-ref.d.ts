export type AmplifyDependentResourcesAttributes = {
  "api": {
    "amplifoto": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "amplifotoddd76bd6": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "private2GroupRole": "string",
      "privateGroupRole": "string"
    }
  },
  "predictions": {
    "Photolabel": {
      "region": "string",
      "type": "string"
    }
  },
  "storage": {
    "images": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}