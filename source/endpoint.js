export default {
  title: "Get Random Players",
  latency: "Normal",
  rating: 4,
  description:
    "This endpoint will return a random list of football players in no particular order. To improve performance and scaling, we've added a limit to the number of player documents returned, currently, it is 20, these number might change in the future, but no worries, we'll send mails months before modifying result of API.<br/>A popular use case will be in a situation where by in your app, you want to display a random list of footballers, for users to pick a player who will be added to their team without transfer fee. <br/>If you've not created a developer account, please do to avoid uninterupted usage of our service. API calls without your developer key would return null in the future.<br/>In each objects in the array, you will have access to the reference, name, club, country, dob, rating, value, roles",
  codeSnippet: `const endpoint = "https://www.socceratlas.com/api/v1/getRandomPlayers";

const options = {
  method: "POST",
  headers: new Headers({
    "X-APIKey": "<developer's API key>",
    // ensure to pass Content-Type, else our Server won't parse your request
    "Content-Type": "application/json",
  }),
  body: JSON.stringify({ limit: 3 }), //default limit is 20,
};

fetch(endpoint, options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
};`,
  successResponse: require("./endpoint.json"),
};
