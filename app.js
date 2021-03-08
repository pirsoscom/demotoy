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
const { isUndefined } = require('util');

var stress_cpu_hogs = 2;
var stress_io_hogs = 2;
var stress_vm_hogs = 2;
var stress_vm_bytes = "1G";
var stress_timeout = "15s";
var stateBook="✅ OK"
var stateBookColor="green"
var stateSock="✅ OK"
var stateSockColor="green"
var stateKube="✅ OK"
var stateKubeColor="green"
var loggedIn="ERROR"
var accesstoken = ""
var accessOK=""
var result="test"

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
var sec_token=process.env.SEC_TOKEN;

var slack1 = process.env.SLACK_CHANNEL_1;
var slack2 = process.env.SLACK_CHANNEL_2;
var slack3 = process.env.SLACK_CHANNEL_3;

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




// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------
// BOOKINFO 
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

app.get('/mergeBook',  
	function(req, res) {
		console.log("");
		console.log("---------------------------------------------------------------------------");
		console.log("🚀 simBookinfoGit - Show");
		console.log("---------------------------------------------------------------------------");
		stateBook="Starting Simulation - LoggingIn"
		//ocLogin()

		console.log("");
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
		console.log("");
		console.log("---------------------------------------------------------------------------");
		console.log("🚀 simBookinfoMerge - Start");
		console.log("---------------------------------------------------------------------------");

		console.log("   📥 simBookinfo - Simulating");
		stateBook="Simulating Incident"
		console.log("   📥 simBookinfo - Scaling Deployment");
		result=execSync('./scripts/bookinfo/1_simulate-incident-scale.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Git");
		result=execSync('./scripts/bookinfo/2_simulate-incident-git.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Falco");
		result=execSync('./scripts/bookinfo/3_simulate-incident-falco.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Metric");
		result=execSync('./scripts/bookinfo/4_simulate-incident-metric.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Instana");
		result=execSync('./scripts/bookinfo/5_simulate-incident-instana.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Humio");
		result=execSync('./scripts/bookinfo/6_simulate-incident-humio.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Log Anomalies");
		result=execSync('./scripts/bookinfo/7_simulate-incident-logs.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");

		stateBook=" Incident ❌"
		stateBookColor="red"
		console.log("---------------------------------------------------------------------------");
		console.log("✅ simBookinfo - Done");
		console.log("---------------------------------------------------------------------------");
		console.log("");


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

app.get('/simBookinfo', function(req,res){
		console.log("");
		console.log("---------------------------------------------------------------------------");
		console.log("🚀 simBookinfoMerge - Start");
		console.log("---------------------------------------------------------------------------");

		console.log("   📥 simBookinfo - Simulating");
		stateBook="Simulating Incident"
		console.log("   📥 simBookinfo - Scaling Deployment");
		result=execSync('./scripts/bookinfo/1_simulate-incident-scale.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Git");
		result=execSync('./scripts/bookinfo/2_simulate-incident-git.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Falco");
		result=execSync('./scripts/bookinfo/3_simulate-incident-falco.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Metric");
		result=execSync('./scripts/bookinfo/4_simulate-incident-metric.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Instana");
		result=execSync('./scripts/bookinfo/5_simulate-incident-instana.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Humio");
		result=execSync('./scripts/bookinfo/6_simulate-incident-humio.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simBookinfo - Simulating Log Anomalies");
		result=execSync('./scripts/bookinfo/7_simulate-incident-logs.sh');
		console.log("   ✅ simBookinfo -  " + result);
		console.log("");
		console.log("");

		stateBook=" Incident ❌"
		stateBookColor="red"
		console.log("---------------------------------------------------------------------------");
		console.log("✅ simBookinfo - Done");
		console.log("---------------------------------------------------------------------------");
		console.log("");


		res.redirect('home');
});


app.get('/mitigateBookinfo', function(req,res){
		console.log("");
		console.log("---------------------------------------------------------------------------");

		console.log("🚀 mitigateBookinfo - Start");

		//ocLogin()
		result=execSync('./scripts/bookinfo/incident-remove.sh');

		stateBook="OK"
		stateBookColor="green"

		console.log("✅ mitigateBookinfo - Done: " + result);

		console.log("---------------------------------------------------------------------------");
		console.log("");

		res.redirect('home');
});







// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------
// SOCKSHOP 
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------


app.get('/simSockshop', function(req,res){
		console.log("");
		console.log("---------------------------------------------------------------------------");
		console.log("🚀 simSockshop - Start");
		stateSock="Starting Simulation - LoggingIn"
		ocLogin()
		console.log("   📥 simSockshop - Simulating");
		console.log("   📥 simSockshop - Scaling Deployment");
		result=execSync('./scripts/sockshop/1_simulate-incident-scale.sh');
		console.log("   ✅ simSockshop -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simSockshop - Simulating Humio");
		result=execSync('./scripts/sockshop/6_simulate-incident-humio.sh');
		console.log("   ✅ simSockshop -  " + result);
		console.log("");
		console.log("");
		console.log("   📥 simSockshop - Simulating Log Anomalies");
		result=execSync('./scripts/sockshop/7_simulate-incident-logs.sh');
		console.log("   ✅ simSockshop -  " + result);
		console.log("");
		console.log("");

		stateSock="❌ Incident"
		stateSockColor="red"



		console.log("---------------------------------------------------------------------------");
		console.log("✅ simSockshop - Done");
		console.log("---------------------------------------------------------------------------");
		console.log("");

		res.redirect('home');
});


app.get('/mitigateSockshop', function(req,res){
		console.log("");
		console.log("---------------------------------------------------------------------------");

		console.log("🚀 mitigateSockshop - Start");
		ocLogin()
		result=execSync('./scripts/sockshop/incident-remove.sh');
		stateSock="OK"
		stateSockColor="green"

		console.log("✅ mitigateSockshop - Done: " + result);

		console.log("---------------------------------------------------------------------------");
		console.log("");

		res.redirect('home');
});





app.get('/maintenance',  
	function(req, res) {
		if( accessOK.toString() =="GoodToGo" ) {
			ocLogin()
			res.render('maintenance', 
				{ 
					"pod": pod, 
					"aiopsImage": aiopsImage, 
					"background": backgroundImage,
					"stateBook": stateBook, 
					"stateBookColor": stateBookColor, 
					"stateSock": stateSock, 
					"stateSockColor": stateSockColor, 
					"stateKube": stateKube, 
					"stateKubeColor": stateKubeColor, 
					"version": appVersion, 
					"sysInfoStr": sysInfoStr,
					"slack1": slack1,
					"slack2": slack2,
					"slack3": slack3,
				});
				console.log("Loading Home - Done");
		} else {
			res.status(500);
			console.log("NOT OK........");
			res.redirect('error');
		}


	}
);




app.get('/delSlack1',  
	function(req, res) {
		console.log("");
		console.log("---------------------------------------------------------------------------");
		console.log("🚀 deleteSlack channel 1 - Start");
		console.log("---------------------------------------------------------------------------");
		console.log("env" + slack1);
		process.env.SLACK_CHANNEL=slack1;
		console.log("call");

		result=execSync('./scripts/maintenance/2_slack_delete.sh');
		console.log("done" + result);

		res.redirect('maintenance');
	}
);


app.get('/delSlack2',  
	function(req, res) {
		console.log("");
		console.log("---------------------------------------------------------------------------");
		console.log("🚀 deleteSlack channel 2 - Start");
		console.log("---------------------------------------------------------------------------");
		console.log("env" + slack1);
		process.env.SLACK_CHANNEL=slack2;
		console.log("call");

		result=execSync('./scripts/maintenance/2_slack_delete.sh');
		console.log("done" + result);

		res.redirect('maintenance');
	}
);


app.get('/delSlack3',  
	function(req, res) {
		console.log("");
		console.log("---------------------------------------------------------------------------");
		console.log("🚀 deleteSlack channel 3 - Start");
		console.log("---------------------------------------------------------------------------");
		console.log("env" + slack1);
		process.env.SLACK_CHANNEL=slack3;
		console.log("call");

		result=execSync('./scripts/maintenance/2_slack_delete.sh');
		console.log("done" + result);

		res.redirect('maintenance');
	}
);



app.get('/home',  
	function(req, res) {
		console.log("Loading Home");
		if( accessOK.toString() =="GoodToGo" ) {
			ocLogin()
			res.render('home', 
				{ 
					"pod": pod, 
					"aiopsImage": aiopsImage, 
					"background": backgroundImage,
					"stateBook": stateBook, 
					"stateBookColor": stateBookColor, 
					"stateSock": stateSock, 
					"stateSockColor": stateSockColor, 
					"stateKube": stateKube, 
					"stateKubeColor": stateKubeColor, 
					"version": appVersion, 
					"sysInfoStr": sysInfoStr,
				});
				console.log("Loading Home - Done");
		} else {
			res.status(500);
			console.log("NOT OK........");
			res.redirect('error');
		}


	
	}
);


app.get('/about',  
	function(req, res) {
		console.log("Loading About");
        res.render('about', 
            { 
                "pod": pod, 
                "aiopsImage": aiopsImage, 
                "background": backgroundImage,
                "stateBook": stateBook, 
                "stateBookColor": stateBookColor, 
                "version": appVersion, 
                "sysInfoStr": sysInfoStr,
            });
			console.log("Loading About - Done");
	}
);


app.get('/error',  
	function(req, res) {
		console.log("Loading Error");
        res.render('error', 
            { 
                "pod": pod, 
                "aiopsImage": aiopsImage, 
                "background": backgroundImage,
                "stateBook": stateBook, 
                "stateBookColor": stateBookColor, 
                "version": appVersion, 
                "sysInfoStr": sysInfoStr,
            });
			console.log("Loading About - Done");
	}
);

app.get('/loading',  
	function(req, res) {
		
		if( accessOK.toString() =="GoodToGo" ) {
			res.status(200);
			res.redirect('home');
		} else {
			res.status(500);
			console.log("NOT OK........");
			res.redirect('error');
		}
		console.log("Loading - Openshift Login - Start");
		//ocLogin()
		console.log("Loading - Openshift Login - Done");



	}
);

app.get('/version', function(req,res){
	res.status(200).send(appVersion);
});

app.get('/',  
	function(req, res) {
		accesstoken = req.query.accesstoken;

		if( accesstoken==null ) {
			console.log("NOT OK........");
			res.redirect('error');
		} else {
			if( accesstoken.toString() ==sec_token.toString() ) {
				console.log("Loading - Start");
				accessOK="GoodToGo"
				res.redirect('loading');
			} else {
				console.log("NOT OK........");
				res.redirect('error');
			}	
		}
	}
);

console.log(`Version: ${appVersion}` );
console.log(sysInfoStr);


app.listen(app.get('port'), '0.0.0.0', function() {
	console.log(pod + ": server starting on port " + app.get('port'));
	console.log("Token    :" + token);	
	console.log("OCP URL  :" + ocp_url);
});



	
