import { NextRequest, NextResponse } from "next/server";

const middleware = async (req = NextRequest) => {
  // const { pathname } = req.nextUrl;
  // console.log(req.ua.os.name); // return client OS
  // console.log(pathname); //desetination API;

  const res = NextResponse;

  //Read more about Symbols here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
  // Symbol is a built-in object whose constructor returns a symbol primitive — also called a Symbol value or just a Symbol — that's guaranteed to be unique.
  // req.headers are Symbols and not Objects, so to get value, you use the get method
  const apikey = req.headers.get("x-apikey");
  // we can validate our API key here
  if (apikey) {
    // console.log(apikey);
    //   // get API details from database
    //   // Including number of times API has been called
    //   // Subscription class
    //   // console.log("apikey"); // hey null
    // return res.next();
  } else {
    if (process.env.NODE_ENV === "development" || ["socceratlas.com", "www.socceratlas.com"].includes(req.headers.get("host"))) {
      res.next();
    } else {
      throw "Invalid Developer API";
    }
  }
};

export default middleware;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500kb",
      responseLimit: "3mb",
    },
  },
};

// Read more here: https://nextjs.org/docs/api-reference/next/server

// These native Web API objects are extended to give you more control over how you manipulate and configure a response, based on the incoming requests.
// Next.js did a good work, as you will see when you use NextRequest or NextResponse

// In essence, the API Middleware layer plays a similar role as middleware plays in other IT solutions. It sits between the client level and the systems of record, translating the desires of the client into execution within the core systems of record.
