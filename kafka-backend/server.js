var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
var register=require('./services/register');
var addfavproducts=require('./services/addfavproducts');
var deletefavproducts=require('./services/deletefavproducts');
var additemstocart = require('./services/additemstocart');
var deletecartitems= require('./services/deletecartitems');
var getcartitems= require('./services/getcartitems');
var addorders=require('./services/addorders');
var getuserorders = require('./services/getuserorders');
//var createshop = require('./services/createshop');
//var getshopdetails = require('./services/getshopdetails');
//var createproduct =require('./services/createproduct');
//var deleteproduct =require('./services/deleteproduct');
//var updateproduct =require('./services/updateproduct');
//var saveshopimage = require('./services/saveshopimage');
var updateuserprofile = require('./services/updateuserprofile');
var searchproducts = require('./services/searchproducts');
var getproductdetail = require('./services/getproductdetail');
var getfavproducts = require('./services/getfavproducts');
var login = require('./services/login');
var addgiftop =require('./services/addgiftop');
var addgiftdesc =require('./services/addgiftdesc');
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
handleTopicRequest("register",register);
handleTopicRequest("addfavproducts",addfavproducts);
handleTopicRequest("deletefavproducts",deletefavproducts);
handleTopicRequest("additemstocart",additemstocart);
handleTopicRequest("deletecartitems",deletecartitems);
handleTopicRequest("getcartitems",getcartitems);
handleTopicRequest("addorders",addorders);
handleTopicRequest("getuserorders",getuserorders);
//handleTopicRequest("createshop",createshop);
//handleTopicRequest("getshopdetails",getshopdetails);
//handleTopicRequest("createproduct",createproduct);
//handleTopicRequest("deleteproduct",deleteproduct);
//handleTopicRequest("updateproduct",updateproduct);
//handleTopicRequest("saveshopimage",saveshopimage);
handleTopicRequest("updateuserprofile",updateuserprofile);
handleTopicRequest("searchproducts",searchproducts);
handleTopicRequest("getproductdetail",getproductdetail);
handleTopicRequest("getfavproducts",getfavproducts);
handleTopicRequest("login",login);
handleTopicRequest("addgiftop",addgiftop);
handleTopicRequest("addgiftdesc",addgiftdesc);