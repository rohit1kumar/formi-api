# API
## Project Structure

    api/
    ├─ controller/
    │  ├─ event.js
    │  ├─ user.js
    ├─ modals/
    │  ├─ event.js
    │  ├─ user.js
    ├─ middleware/
    │  ├─ error-handler.js
    │  ├─ not-found.js
    │  ├─ verify-auth.js
    ├─ routes/
    │  ├─ event.js
    │  ├─ user.js
    ├─ package-lock.json
    ├─ package.json
    ├─ README.md
    ├─ app.js
 

## Getting Stated

### Clone the repository
     git clone https://github.com/rohit1kumar/formi.git
        

### Install dependencies
     cd formi
     npm install

### Add environment variables
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/dbname
    JWT_SECRET=secret

### Build and run the project
     npm start

### Base URL
    https://formi-ticketing.herokuapp.com/api/

## Endpoints
  
|  REQUEST  |  ENDPOINT  |  DESCRIPTION  |
|    ---    |    ---     |     ---       | 
| POST      | /user/login| Login         | 
| POST      | /user/register | Create user with name, email and password  | 
| GET     | /user/logout   |Logout |   
| POST   | /event | Create event with name, desc, date artist, location, type |
| GET   | /event | Find all events if  name, artist, location not passed in qs <br> or find with name, location, artist wise | 
| DELETE | /event | Delete the event by _id | 

 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/20980024-ddace235-591a-481b-a1f9-c67c6dc5c72c?action=collection%2Ffork&collection-url=entityId%3D20980024-ddace235-591a-481b-a1f9-c67c6dc5c72c%26entityType%3Dcollection%26workspaceId%3D1c687d97-092e-4c07-b900-d7384e10b729)