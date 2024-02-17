//moduels http ,url,fs
const http=require("http");
const url=require("url");
const fs=require("fs");
const data=fs.readFileSync('./data.json','utf-8');
const objData=JSON.parse(data);
const Server=http.createServer((req,res)=>{
    const pathName=req.url;
    if(pathName==='/'||pathName==='overview'){
        res.end(fs.readFileSync("hello.txt","utf-8"));
    }
    else if(pathName==='/api'){
       res.writeHead(200,{'Content-type' : 'application/json'});
        res.end(data);
    }
    else{
        
        res.writeHead(404,{
            'content-type':'text/html',
            'my-own-header':'hello-world'
        });
        res.end('<h1>Page not found! </h1>');
    }

})
Server.listen(3000,()=>{
    console.log('listing to port 3000');
});
