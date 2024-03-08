// import { Player } from "@database";
import HomeContainer from "@component/home";
import Head from "next/head";
import Link from "next/link";
// import clientPromise from "../lib/mongodb";
// import { connectToDatabase } from "@utils/mongodb";

const Index = ({ isConnected }) => <HomeContainer />;

// export async function getServerSideProps(context) {
//   try {
//     const { Player } = require("../model");
//     // const { client, db } = await connectToDatabase();

//     // const {} = db;
//     const a = await Player.find({});
//     // const a = "sas";
//     // const a = await db
//     //   .collection("players")
//     //   .find({})
//     //   // .sort({ metacritic: -1 })
//     //   .limit(20)
//     //   .toArray();

//     console.log("ASsadA", { players: a.length });

//     // await Player.create({
//     //   _id: "player0000000000001",
//     //   club: "club0000001",
//     // });

//     // const isConnected = await client.isConnected(); // Returns true or false
//     const isConnected = "client";
//     // console.log({ isConnected }, "isConnected");

//     return {
//       props: { isConnected },
//     };

//     // client.db() will be the default database passed in the MONGODB_URI
//     // You can change the database by calling the client.db() function and specifying a database like:
//     // const db = client.db();
//     // db.
//     // const db = client.db("myDatabase");
//     // Then you can execute queries against your database like so:
//     // db.find({}) or any of the MongoDB Node Driver commands
//     // db.find({}) or any of the MongoDB Node Driver commands

//     // const a = await clientPromise.find({});
//     // console.loig(a);

//     //   return {
//     //     props: { isConnected: true },
//     //   };
//   } catch (e) {
//     console.error({ e });

//     return {
//       props: { isConnected: false },
//     };
//   }
// }

// // );

export default Index;
