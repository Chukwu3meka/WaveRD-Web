import EndpointsContainer from "@component/endpoints";
import { fetcher } from "@utils/clientFuncs";

const EndpointsPage = ({ initialEndpoints }) => {
  return <EndpointsContainer initialEndpoints={initialEndpoints} />;
};

export default EndpointsPage;

export async function getServerSideProps() {
  try {
    // const initialEndpoints = await fetcher(`${process.env.HOST}/api/client/getEndpoints`);
    const initialEndpoints = [
      {
        _id: { $oid: "648a2e775d4ea9dfdda283e1" },
        title: "Get Random Players",
        latency: "Normal",
        rating: { $numberInt: "4" },
        description:
          "This endpoint will return a random list of football players in no particular order. To improve performance and scaling, we've added a limit to the number of player documents returned, currently, it is 20, these number might change in the future, but no worries, we'll send mails months before modifying result of API.<br/>A popular use case will be in a situation where by in your app, you want to display a random list of footballers, for users to pick a player who will be added to their team without transfer fee. <br/>If you've not created a developer account, please do to avoid uninterupted usage of our service. API calls without your developer key would return null in the future.<br/>In each objects in the array, you will have access to the reference, name, club, country, dob, rating, value, roles",
        codeSnippet:
          'const endpoint = "https://www.socceratlas.com/api/v1/getRandomPlayers";\n\nconst options = {\n  method: "POST",\n  headers: new Headers({\n    "X-APIKey": "<developer\'s API key>",\n    // ensure to pass Content-Type, else our Server won\'t parse your request\n    "Content-Type": "application/json",\n  }),\n  body: JSON.stringify({ limit: 3 }), //default limit is 20,\n};\n\nfetch(endpoint, options)\n  .then((response) => response.json())\n  .then((response) => console.log(response))\n  .catch((err) => console.error(err));\n};',
        successResponse: [
          {
            ref: "player67",
            name: "Jan Oblak",
            club: "club3",
            country: "Slovenia",
            dob: "1993-05-12T23:00:00.000Z",
            rating: { $numberInt: "91" },
            value: { $numberInt: "130" },
            roles: ["GK"],
          },
          {
            ref: "player165",
            name: "David Silva",
            club: "club6",
            country: "Spain",
            dob: "1986-05-12T23:00:00.000Z",
            rating: { $numberInt: "86" },
            value: { $numberDouble: "61.43" },
            roles: ["AM", "CM"],
          },
          {
            ref: "player1142",
            name: "Dalbert",
            club: "club37",
            country: "Brazil",
            dob: "1994-05-12T23:00:00.000Z",
            rating: { $numberInt: "71" },
            value: { $numberDouble: "26.3" },
            roles: ["LM", "LB"],
          },
        ],
      },

      {
        _id: { $oid: "6240870dc540da47dd9346f7" },
        title: "Get Random Clubs",
        latency: "Normal",
        rating: { $numberInt: "4" },
        description:
          "This endpoint will return a random list of football clubs in no particular order. To improve performance and scaling, we've added a limit to the number of player documents returned, currently, it is 20, these number might change in the future, but no worries, we'll send mails months before modifying result of API.<br/>A popular use case will be in a situation where by in your app, you want to display a random list of footballers, for users to pick a player who will be added to their team without transfer fee. <br/>If you've not created a developer account, please do to avoid uninterupted usage of our service. API calls without your developer key would return null in the future.<br/>In each objects in the array, you will have access to the reference, title, nickname, founded, stadium, capacity, location,manager",
        codeSnippet:
          'const endpoint = "https://www.socceratlas.com/api/v1/getRandomClubs";\n\nconst options = {\n  method: "POST",\n  headers: new Headers({\n    "X-APIKey": "<developer\'s API key>",\n    // ensure to pass Content-Type, else our Server won\'t parse your request\n    "Content-Type": "application/json",\n  }),\n  body: JSON.stringify({ limit: 3 }), //default limit is 20,\n};\n\nfetch(endpoint, options)\n  .then((response) => response.json())\n  .then((response) => console.log(response))\n  .catch((err) => console.error(err));\n};',
        successResponse: [
          {
            ref: "club47",
            title: "Roma",
            nickname: "Giallorossi",
            founded: { $numberInt: "1927" },
            stadium: "Stadio Olimpico",
            capacity: { $numberInt: "73261" },
            location: "Rome, Italy",
            manager: "José Mourinho",
          },
          {
            ref: "club3",
            title: "Atlético de Madrid",
            nickname: "Los Rojiblancos",
            founded: { $numberInt: "1903" },
            stadium: "Wanda Metropolitano",
            capacity: { $numberInt: "68000" },
            location: "Madrid, Spain",
            manager: "Diego Simeone",
          },
          {
            ref: "club54",
            title: "AZ",
            nickname: "Alkmaar",
            founded: { $numberInt: "1967" },
            stadium: "AFAS Stadion",
            capacity: { $numberInt: "17023" },
            location: "Alkmaar, Netherlands",
            manager: "Unknown",
          },
        ],
      },
    ];

    return { props: { initialEndpoints } };
  } catch (e) {
    return { props: { initialEndpoints } };
  }
}
