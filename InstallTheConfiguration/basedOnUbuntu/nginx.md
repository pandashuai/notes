# Configure nginx.conf 

#Example

```
server{
    listen        Your port;
    server_name   Your server name;
    location / { 
       proxy_pass  http://localserver:port; 
       proxy_http_version 1.1;
       proxy_redirect off; 
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
}

```