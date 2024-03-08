import { NextRequest, NextResponse } from "next/server";

const middleware = async (req = NextRequest) => {
  const res = NextResponse;

  // prevent third party from accessing our client API route
  if (process.env.NODE_ENV === "development" || ["socceratlas.com", "www.socceratlas.com"].includes(req.headers.get("host"))) {
    res.next();
  } else {
    throw "Request blocked";
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
