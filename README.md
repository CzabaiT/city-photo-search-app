# city-photo-search-app

> Triggers a Google image search based on a selected city of the world from a typehead

## Dev run
|           | Angular          | Node              |
| --------- |:---------------- |:----------------- |
| Script    | npm run localAng | npm run localNode |
| Def ports | 4200             | 8080              |

## Prod run
|           | Angular   | Node      |
| --------- |:--------- |:--------- |
| Script    | npm start | npm start |
| Def ports | 3000      | 3000      |

## Config
| Angular (environment.ts) | Def. value |
|:------------------------ |:---------- | 
| minimumSearchTermLength  | 2          | 

| Node (.env)          | Def. value |
|:-------------------- |:---------- | 
| SEARCH_RESULT_LIMIT  | 10         |

## API
 **URL:** host/citysearch?searchTerm=xyz /GET
 
| case               | statusCode | response                                                          |
|:-------------------|:---------- |:----------------------------------------------------------------. | 
| result found       | 200        | list of City object                                               |
| not found          | 200        | empty list                                                        |
| missing searchTerm | 400        | {"statusCode":400,"message":"Provide searchTerm in query string"} |
| other endpoint     | 501        | {"statusCode":501,"message":"Not implemented endpoint"}           |
