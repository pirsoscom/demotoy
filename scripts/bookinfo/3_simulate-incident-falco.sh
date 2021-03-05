#!/bin/bash
if [[ $NETCOOL_WEBHOOK_FALCO == "not_configured" ]] || [[ $NETCOOL_WEBHOOK_FALCO == "" ]];
then
      echo "❌ Skipping Falco events injection" 
else
      echo "nameserver 8.8.8.8" > /etc/resolv.conf
      echo "🚚 Falco Push"
      input="./scripts/bookinfo/falco_push.json" 
      while IFS= read -r line
      do
        export my_timestamp=$(date +%s)000
        echo "     🔧 Injecting Event at: $my_timestamp" 

        curl --insecure -X "POST" "$NETCOOL_WEBHOOK_FALCO" \
          -H 'Content-Type: application/json; charset=utf-8' \
          -H 'Cookie: d291eb4934d76f7f45764b830cdb2d63=90c3dffd13019b5bae8fd5a840216896' \
          -d $"${line}" 
        echo "----"
      done < "$input"

      echo "Done Falco" 
fi
