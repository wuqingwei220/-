const proxy=require("http-proxy-middlware")

module.exports=function(app){
    app.use(
        proxy("/api",{
            target:"http://localhost:5000",
            pathWrite:{"/api":"api"},
            changeOrigin:true
        })
    )
}