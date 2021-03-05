#!/bin/bash
if [[ $NETCOOL_WEBHOOK_GIT == "not_configured" ]] || [[ $NETCOOL_WEBHOOK_GIT == "" ]];
then
      echo "❌ Skipping Git events injection" 
else
      echo "nameserver 8.8.8.8" > /etc/resolv.conf
      echo "✅ Git Push"
      input="./scripts/bookinfo/git_push.json" 
      while IFS= read -r line
      do
        export my_timestamp=$(date +%s)000
        echo "📥 Injecting Event at: $my_timestamp" 

        curl --insecure -X "POST" "$NETCOOL_WEBHOOK_GIT" \
          -H 'Content-Type: application/json; charset=utf-8' \
          -H 'Cookie: d291eb4934d76f7f45764b830cdb2d63=90c3dffd13019b5bae8fd5a840216896' \
          -d $"${line}" 
        echo "----"
      done < "$input"

      echo "Done Git" 
fi


export NETCOOL_WEBHOOK_INSTANA=https://demo-noi-ibm-cem-normalizer.noi.svc:3901/norml/webhook/webhookincomming/cfd95b7e-3bc7-4006-a4a8-a73a79c71255/3c543bca-35e2-4260-966e-29c9f79edc88/Uw34hB680W-gYXjJzDc42q2G6n1Ev4t4nX8-y5h901U
 
export NETCOOL_WEBHOOK_INSTANA=https://netcool.demo-noi.aiops-a376efc1170b9b8ace6422196c51e491-0000.eu-de.containers.appdomain.cloud/norml/webhook/webhookincomming/cfd95b7e-3bc7-4006-a4a8-a73a79c71255/371480f7-c9f1-422b-acf1-db48d43ccae7/QHhJmKf1StqhPkxQ8yXknwKRTl0arRncrQtZhcjXzWQ


curl --insecure -X "POST" "$NETCOOL_WEBHOOK_INSTANA" -H 'Content-Type: application/json; charset=utf-8' -H 'Cookie: d291eb4934d76f7f45764b830cdb2d63=90c3dffd13019b5bae8fd5a840216896' -d $"${line}" 

curl --insecure -X "GET" "$NETCOOL_WEBHOOK_INSTANA" -H 'Content-Type: application/json; charset=utf-8' -H 'Cookie: d291eb4934d76f7f45764b830cdb2d63=90c3dffd13019b5bae8fd5a840216896' 