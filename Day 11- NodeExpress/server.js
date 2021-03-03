//importing modules/packages
const http=require("http");

//node creating server
var data={
    "name":"pallavi",
    "age":23
}
//creating server
http.createServer((request,response)=>{

    //creating an api
    if(request.url==="/signup" && request.method==="GET"){
        //converting data into string as only string allowed in response
        data=JSON.stringify(data);

        //setting header of response
        response.writeHead(200,{'content-type':'application/json','Access-Control-Allow-Origin':'*'})

        //sending response
        response.write(data);
        response.end()
    }
}).listen(8081,()=>{
    console.log("server started");
})