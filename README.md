### Reset stuff

`rm -rf db/*.db && cds deploy --with-mocks && cds watch`

### GET all

`curl -X GET "http://localhost:4004/odata/v4/galactic/Spacefarers" -H "Accept: application/json"`

### GET by Id

`curl -X GET "http://localhost:4004/odata/v4/galactic/Spacefarers(1)" -H "Accept: application/json"`

### CREATE

`curl -X POST "http://localhost:4004/odata/v4/galactic/Spacefarers"      -H "Content-Type: application/json"      -d '{"name": "Bosdsadba Nebula", "originPlanet": "Kamino", "stardustCollection": 350, "wormholeNavigation": 80, "spacesuitColor": "Silver"}'`

### UPDATE

`curl -X PUT "http://localhost:4004/odata/v4/galactic/Spacefarers(6)" -H "Content-Type: application/json" \-d '{"spacesuitColor": "Platinum"}'`

### DELETE

`curl -X DELETE "http://localhost:4004/odata/v4/galactic/Spacefarers(6)"`

# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

 File or Folder | Purpose                              
----------------|--------------------------------------
 `app/`         | content for UI frontends goes here   
 `db/`          | your domain models and data go here  
 `srv/`         | your service models and code go here 
 `package.json` | project metadata and configuration   
 `readme.md`    | this getting started guide           

## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).

## Learn More

Learn more athttps://cap.cloud.sap/docs/get-started/.
