//import express from 'express';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import fs from 'fs';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  //set the directory where temporary files are stored
  const folder_to_clean = __dirname + '/util/tmp/'
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get( "/filteredimage/", async ( req: Request, res: Response ) => {
    let { image_url } = req.query;

    //    1. validate the image_url query
    if ( !image_url ) {
      return res.status(400)
                .send(`url is required`);
    }
    
    //    2. call filterImageFromURL(image_url) to filter the image
    const filteredpath = await filterImageFromURL(image_url);
    
    //    3. send the resulting file in the response
    res.status(200).sendFile(filteredpath);
    
    //    4. deletes any files on the server on finish of the response
    return res.on('finish', function() {
      let delete_array : string[] = [];
      fs.readdirSync(folder_to_clean).forEach(file => {
          delete_array.push(folder_to_clean + file);
      });
      deleteLocalFiles(delete_array);
    });
    
  } );
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();