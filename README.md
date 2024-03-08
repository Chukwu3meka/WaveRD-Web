# Soccer Atlas

The name Soccer Atlas was derived from MongoDB Atlas (A database that offers all you seek in a true noSQL DB). Many developers have had this idea of creating something for the soccer world, but not having the right data is really a problem, and most API's require exorbitant payment for you to use their services. That's why we came up with Soccer Atlas, aside being free, we'll provide you with all soccer related data you might need.

### Prerequisites

- Basic `Javascript knowledge` is required
- ES6 snytax, arrow functions etc.
- SASS, Material-UI, Redux, NextJs
- basic knowledge of React Hooks

### Installation, Development and Production

1. To get started, clone ViewCrunch Next.js starter template
   `git clone https://github.com/viewcrunch/NextJs-starter-template.git .`
2. Update remote repo by running
   `git remote set-url origin https://github.com/viewcrunch/Soccer-Atlas.git`
3. Push to Remote repo
   `git push -u origin main`
   `git add .`
   `git commit -m "initial commit"`
   `git push`
4. Install required packages
   `npm install`
5. Run development Server
   `npm run dev`
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.<br />
6. View live demo here - [Soccer Atlas](socceratlas.vercel.app)
7. Make sure to exclude/create your .env.local file, this is where we'll store our enviroment variables in development, your hosting environment, will have an option to save env for production. Content of env `MONGODB_URI=mongodb+srv://<usernameForDB>:<passwordForDB>@<clusterID>.mongodb.net/<DBName>?retryWrites=true&w=majority ADMIN_KEY="I used a very long && complicated string, this is not the right way to do this and i strongly discourage it, but i had to for the purpose of learning MongDB, so we can focus on the main aspect. Also concerning brute force attack, I try to update the ADMIN_KEY frquently in my hosting enviroment."`
8. If you're just getting started with MongoDB Atlas Search, you can go through my post ![medium](https://javascript.plainenglish.io/a-practical-example-using-mongodb-atlas-search-144ab2d4ed78)

## Author

- **Chukwuemeka Maduekwe** - _Software Developer_ - [portfolio](https://chukwuemeka.vercel.app)

##

> Change last git commit message: git commit --amend -m "New commit message"

<!--
https://cloud.mongodb.com/v2/622e467afd6edc21998c158d#metrics/replicaSet/622e4720a3058e62a0791830/explorer/SoccerAtlas/endpoints/find

https://www.mongodb.com/docs/manual/tutorial/update-documents/

https://github.com/public-apis/public-apis
 -->
