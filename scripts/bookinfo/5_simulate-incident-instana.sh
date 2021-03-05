#!/bin/bash
if [[ $NETCOOL_WEBHOOK_INSTANA == "not_configured" ]] || [[ $NETCOOL_WEBHOOK_INSTANA == "" ]];
then
      echo "❌ Skipping Instana events injection" 
else
      echo "nameserver 8.8.8.8" > /etc/resolv.conf
      echo "✅ Instana Push" 
      input="./scripts/bookinfo/instana_push.json"
      while IFS= read -r line
      do
        export my_timestamp=$(date +%s)000
        echo "📥 Injecting Event at: $my_timestamp" 

        curl --insecure -X "POST" "$NETCOOL_WEBHOOK_INSTANA" \
          -H 'Content-Type: application/json; charset=utf-8' \
          -H 'Cookie: d291eb4934d76f7f45764b830cdb2d63=90c3dffd13019b5bae8fd5a840216896' \
          -d $"${line}" 
        echo "----"
      done < "$input"

      echo "Done Instana" 

fi


