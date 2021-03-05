# KubeToy
## v2.6.0

A simple Node.js application that deploys to IBM Cloud Private.  It is used to help 
explore the functionality of Kubernetes.  This toy application has a user interface 
which you can:

* write messages to the log (stdout / stderr)
* intentionally crash the application to view auto repair
* toggle a liveness probe and monitor kuberenetes behavior  
* read config maps and secrets from environment vars and files
* if connected to shared storage, read and write files
* if Cloud Object Storage credentials are provided via ENV VAR in config maps, connect to COS bucket

KubeToy can be installed via helm chart or directly with these [kubernetes definition 
files](https://github.com/IBM-ICP-CoC/KubeToy/tree/master/deployment).  

**[Adding Helm chart repository](documentation/AddHelmRepository.md)**
Add the IBM Cloud Private Center of Competency Helm chart repository to your ICP cluster.

**[Deploying KubeToy from Helm Chart](documentation/DeployHelm.md)** Deploy an older version of the chart 
from the Helm catalog, verify it is working, then upgrade to the latest version.

**[Playing with the logs](documentation/Logs.md)** 
Use the app to write to the logs, then view the logs in the UI and via Kibana.

**[Crash the app](documentation/Crash.md)**
Intentionally crash the application and watch it self heal.

**[ConfigMaps and Secrets](documentation/Config.md)** Explore configuration options for apps deployed to ICP.

**[Shared Filesystem](documentation/Filesystem.md)** Use the shared files system to store and read content across all instances of the application.  File information is persisted even if the app crashes.

**[Network](documentation/Network.md)** Allows you to request an HTTP url (from the pod), and renderes what it gets.


oc create clusterrolebinding default-admin --clusterrole=cluster-admin --serviceaccount=default:default

export TOKEN=eyJhbGciOiJSUzI1NiIsImtpZCI6IlJlWURNU1I4TXZQN2FvbDJDTDR2Tzh5VU9WWGlzOGctLUMwSUNhNUJrUnMifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJ6ZW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlY3JldC5uYW1lIjoiZGVtby1hZG1pbi10b2tlbi1tc2Y5YyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJkZW1vLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiOGNiYjdiZmUtMzQ1ZS00NTgzLWJhMTQtOTkzNDg1MTVhZWU3Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OnplbjpkZW1vLWFkbWluIn0.UFeMxMB6rKcGY9tnmPMxr_Jl3AhI7zW0W9mhw4oRiH4BFpvFCsS1keW_GLS9qgA-ohGMd5jHCKeopDcOT7BwxLoOi0UJ9UetQE34qZ6bYPGUhXnd7B7RA527ItljdhAEMccCyh_0hZkvVVjOl4ra-WiHxi4PbyqKDyWCKvxBu6Pf21WwKcgY8pwBy1V2n-6ZDAYcO54forw33CnNSaAOWjbULcscdTzCDflC0VoiVznKcmNot0tDVu0epLXSBDtYENAPsO--K2XZdmHu9taWEX8My2T3tEK7githN-Pp1XCXk-PLb1VR5gSjkAXeh2Ift6OLouOlCPSan_ecw5ob6Q
export OCP_URL=https://c113-e.eu-de.containers.cloud.ibm.com:32540

export NETCOOL_WEBHOOK_HUMIO=https://netcool.demo-noi.test-a376efc1170b9b8ace6422196c51e491-0000.eu-de.containers.appdomain.cloud/norml/webhook/humio/cfd95b7e-3bc7-4006-a4a8-a73a79c71255/c625548a-2c8b-455c-8ae0-0467a7461ea4/NWe13mawi8R9yizVuDl311NF4K_KxU98SpOo_hNPz7o


export NETCOOL_WEBHOOK_INSTANA=https://netcool.demo-noi.test-a376efc1170b9b8ace6422196c51e491-0000.eu-de.containers.appdomain.cloud/norml/webhook/webhookincomming/cfd95b7e-3bc7-4006-a4a8-a73a79c71255/3c543bca-35e2-4260-966e-29c9f79edc88/Uw34hB680W-gYXjJzDc42q2G6n1Ev4t4nX8-y5h901U