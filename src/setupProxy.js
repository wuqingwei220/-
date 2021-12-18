const proxy=require("http-proxy-middleware")

module.exports=function(app){
    app.use(
        proxy("/api",{
            target:"http://localhost:5000",
            // target:"http://192.168.1.23:5000",
            changeOrigin:true,
            pathRewrite:{"^/api":""}
        }),
        proxy("/getWeather",{
            target:"https://api.map.baidu.com",
            changeOrigin:true,
            pathRewrite:{"^/getWeather":""}
        })
    )
}