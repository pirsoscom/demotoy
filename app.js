const express = require('express');
const bodyParser = require('body-parser');
const validFilename = require('valid-filename');
const fs = require('fs');
const { exec } = require('child_process');
const { uname } = require('node-uname');
const requests = require('requests');
const validUrl = require('valid-url');
const https = require('follow-redirects').https; 
const http = require('follow-redirects').http; 

const sysInfo = uname();
const sysInfoStr = `Arch: ${sysInfo.machine}, Release: ${sysInfo.release}`
const appVersion = "1.0.0";

const configFile = "/var/config/config.json";
const secretFile = "/var/secret/toy-secret.txt";

const execSync = require('child_process').execSync;

var stress_cpu_hogs = 2;
var stress_io_hogs = 2;
var stress_vm_hogs = 2;
var stress_vm_bytes = "1G";
var stress_timeout = "15s";
var stateBook="OK"
var stateBookColor="green"
var loggedIn="ERROR"

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var backgroundImage = "";

var pod = "xxxxx";
if( process.env.HOSTNAME ) {
	var hostname = process.env.HOSTNAME;
	index = hostname.lastIndexOf('-');
	pod = hostname.substring(index+1);
} 

var healthy = true;
var aiopsImage = "logo.png";

var token=process.env.TOKEN;
var ocp_url=process.env.OCP_URL;

function healthStatus(){
	if( healthy ) {
		return "I'm feeling OK.";
	} else {
		return "I'm not feeling all that well.";
	}
}


app.set('port', process.env.PORT || 3000);


function ocLogin(){
	console.log("OCP Login");
	console.log("Token    : *******");	
	console.log("OCP URL  : " + ocp_url);
	//console.log('oc login --token=' + token +' --server=' + ocp_url);
	execSync('ls ./scripts/bookinfo/ > lock.txt');
	loggedIn=execSync('oc login --token=' + token +' --server=' + ocp_url);
	execSync('oc get nodes > nodes.txt');
	execSync('mv lock.txt ok.txt');
	console.log("Login  : " + loggedIn);
}


// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------
// Simulations 
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

app.get('/simBookinfo', function(req,res){
	console.log("simBookinfo - Start");
	stateBook="Starting Simulation - LoggingIn"
	ocLogin()
	stateBook="Simulating Incident"
	result=execSync('./scripts/bookinfo/incident-simulate.sh');

	stateBook="❌ Incident"
	stateBookColor="red"

	console.log("simBookinfo - Done: " + result);
	res.redirect('home');
});


app.get('/mitigateBookinfo', function(req,res){
	console.log("mitigateBookinfo - Start");

	//ocLogin()
	result=execSync('./scripts/bookinfo/incident-remove.sh');

	stateBook="OK"
	stateBookColor="green"

	console.log("mitigateBookinfo - Done: " + result);
	res.redirect('home');
});





app.get('/logit', function(req,res){
	var msg = req.query.msg;
	console.log(msg);
	res.redirect('home');
});

app.get('/errit', function(req,res){
	var msg = req.query.msg;
	console.error(msg);
	res.redirect('home');
});



app.get('/health', function(req,res){
	if( healthy ) {
		res.status(200);
	} else {
		res.status(500);
	}
	var status = healthStatus();
	res.send(status);
});



// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------
// PAGES 
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------






app.get('/mergeBook',  
	function(req, res) {
		console.log("simBookinfo - Start");
		stateBook="Starting Simulation - LoggingIn"
		//ocLogin()
        res.render('book-merge', 
            { 
                "pod": pod, 
                "aiopsImage": aiopsImage, 
                "background": backgroundImage,
                "stateBook": stateBook, 
                "stateBookColor": stateBookColor, 
                "version": appVersion, 
                "sysInfoStr": sysInfoStr,
                "token": token,
            });
	}
);


app.get('/mergeBookOK',  
	function(req, res) {
	
		console.log("simBookinfo - Simulating");
		stateBook="Simulating Incident"
		result=exec('./scripts/bookinfo/incident-simulate.sh');
		console.log("simBookinfo - Simulating");
		stateBook=" Incident ❌"
		stateBookColor="red"
		console.log("simBookinfo - Done: " + result);
        res.render('book-merge-done', 
            { 
                "pod": pod, 
                "aiopsImage": aiopsImage, 
                "background": backgroundImage,
                "stateBook": stateBook, 
                "stateBookColor": stateBookColor, 
                "version": appVersion, 
                "sysInfoStr": sysInfoStr,
                "token": token,
            });
	}
);

app.get('/maintenance',  
	function(req, res) {
        var token = req.query.token;
		var status = healthStatus();
        res.render('maintenance', 
            { 
                "pod": pod, 
                "aiopsImage": aiopsImage, 
                "background": backgroundImage,
                "stateBook": stateBook, 
                "stateBookColor": stateBookColor, 
                "version": appVersion, 
                "sysInfoStr": sysInfoStr,
                "token": token,
            });
	}
);

app.get('/home',  
	function(req, res) {
		console.log("home");


		
        res.render('home', 
            { 
                "pod": pod, 
                "aiopsImage": aiopsImage, 
                "background": backgroundImage,
                "stateBook": stateBook, 
                "stateBookColor": stateBookColor, 
                "version": appVersion, 
                "sysInfoStr": sysInfoStr,
            });
			console.log("Loading - Done");

	}
);




app.get('/loading',  
	function(req, res) {
		console.log("Loading - Openshift Login - Start");
		ocLogin()
		console.log("Loading - Openshift Login - Done");
		console.log(loggedIn);

		res.redirect('home');
	}
);

app.get('/version', function(req,res){
	res.status(200).send(appVersion);
});

app.get('/',  
	function(req, res) {
		console.log("Loading - Start");
		res.redirect('loading');
	}
);

console.log(`Version: ${appVersion}` );
console.log(sysInfoStr);


app.listen(app.get('port'), '0.0.0.0', function() {
	console.log(pod + ": server starting on port " + app.get('port'));
	console.log("Token    :" + token);	
	console.log("OCP URL  :" + ocp_url);
});



	
