# Configure nginx.conf 

## Example

```
server{
    listen        Your port;
    server_name   Your server name;
    location / { 
       proxy_pass  http://localserver:port; 
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header X-Real-IP $remote_addr;  
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }
}

```
