/**
 * Created by liujinhe on 17/2/22.
 */


var express=require('express');
var http=require('http');
var path=require('path');

var app=new express();

var server=http.Server(app);

app.set('views', path.resolve(__dirname,'..','web/views'));

app.use(express.static(__dirname+'/public')) ;

console.log('views: '+path.resolve(__dirname,'..','/web/views'))

app.use(function (req, res) {

    res.render('index.ejs')

})


server.listen(3000, function (err) {
    if(err){
        console.error('page server get error!')
    }else{
        console.info('page server run on port 3000!')
    }


})


