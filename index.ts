process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv/config')
var config = require('./config/config');
var express = require('./config/express');
var colors = require('colors');
var Table = require('cli-table3');

console.log('\nAPI for ' + "quadx");
console.log('********************************************');
const listEndpoints = require('express-list-endpoints')
// Create server
var app = express();


// Start listening
app.listen(config.PORT, function() {
    if(process.env.NODE_ENV != "proudction") {
        var table = new Table({ head: [ "", "APi", "Method"] });
        var routeList = listEndpoints(app);
        routeList.forEach((link :any,index: any) => {
            let method_message  = "" ;
            for (let i=0; i < link.methods.length; i++ ){
                method_message += link.methods[i];
                if((link.methods.length > 1) && (i < (link.methods.length - 1))){
                    method_message += ", ";
                }
            }
            table.push([index,link.path, colors.red(method_message)]);
        })
        console.log(table.toString());
        console.log('********************************************\n');
    }
    console.log(colors.green('Listening with ' + process.env.NODE_ENV + ' config on port ' + config.PORT));
});