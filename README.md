"# MAEN project " 



client 
Angular(JS) 
-- presentation/UI
-- Single-Page Application
This single page application can be rendered by our Node Backend.
So we could have one route, which essentially returns this single HTML page,
but it can also be totally decoupled from that and be served from a totally different host,
some static hosst like AWS S3, for example.



server 
Node 
Express
MongoDB -- persistent data storage
-- business logic especially the logic that should not be exposed to the client due to security reasons
-- authentication logic
