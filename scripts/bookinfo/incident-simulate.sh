echo "Pushing Bookinfo to GitHub"


echo "."
oc scale --replicas=0  deployment ratings-v1 -n bookinfo >/dev/null 2>&1
oc delete pod -n bookinfo $(oc get po -n bookinfo|grep ratings-v1|awk '{print$1}') --force --grace-period=0 >/dev/null 2>&1
echo "."




if [[ $NETCOOL_WEBHOOK_GIT == "not_configured" ]] || [[ $NETCOOL_WEBHOOK_GIT == "" ]];
then
      echo "❌ Skipping Git events injection"
else
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

      echo "Done"
      echo ""
      sleep 2
fi




if [[ $NETCOOL_WEBHOOK_METRICS == "not_configured" ]] || [[ $NETCOOL_WEBHOOK_METRICS == "" ]];
then
      echo "❌ Skipping Metrics events injection"
else

      echo "✅ Metrics Push"
      input="./scripts/bookinfo/metrics_push.json"
      while IFS= read -r line
      do
        export my_timestamp=$(date +%s)000
        echo "📥 Injecting Event at: $my_timestamp"

        curl --insecure -X "POST" "$NETCOOL_WEBHOOK_METRICS" \
          -H 'Content-Type: application/json; charset=utf-8' \
          -H 'Cookie: d291eb4934d76f7f45764b830cdb2d63=90c3dffd13019b5bae8fd5a840216896' \
          -d $"${line}"
        echo "----"
      done < "$input"

      echo "Done"
      echo ""
      sleep 2
fi





if [[ $NETCOOL_WEBHOOK_FALCO == "not_configured" ]] || [[ $NETCOOL_WEBHOOK_FALCO == "" ]];
then
      echo "❌ Skipping Falco events injection"
else
      echo "✅ Falco Push"
      input="./scripts/bookinfo/falco_push.json"
      while IFS= read -r line
      do
        export my_timestamp=$(date +%s)000
        echo "📥 Injecting Event at: $my_timestamp"

        curl --insecure -X "POST" "$NETCOOL_WEBHOOK_FALCO" \
          -H 'Content-Type: application/json; charset=utf-8' \
          -H 'Cookie: d291eb4934d76f7f45764b830cdb2d63=90c3dffd13019b5bae8fd5a840216896' \
          -d $"${line}"
        echo "----"
      done < "$input"

      echo "Done"
      echo ""
      echo ""
      echo ""
      echo ""
      echo ""
      sleep 2
fi




if [[ $NETCOOL_WEBHOOK_INSTANA == "not_configured" ]] || [[ $NETCOOL_WEBHOOK_INSTANA == "" ]];
then
      echo "❌ Skipping Instana events injection"
else
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

      echo "Done"
      echo ""
      echo ""
      echo ""
      echo ""
      echo ""
      sleep 2
fi






if [[ $NETCOOL_WEBHOOK_HUMIO == "not_configured" ]] || [[ $NETCOOL_WEBHOOK_HUMIO == "" ]];
then
      echo "❌ Skipping Humio events injection"
else
      echo "✅ Injecting Humio Events"
      input="./scripts/bookinfo/error_event.json"
      while IFS= read -r line
      do
        export my_timestamp=$(date +%s)000
        echo "📥 Injecting Event at: $my_timestamp"

        curl --insecure -X "POST" "$NETCOOL_WEBHOOK_HUMIO" \
          -H 'Content-Type: application/json; charset=utf-8' \
          -H 'Cookie: d291eb4934d76f7f45764b830cdb2d63=90c3dffd13019b5bae8fd5a840216896' \
          -d $"${line}"
        echo "----"
      done < "$input"

      echo "Done"
      echo ""
      echo ""
      echo ""
      echo ""
      echo ""
fi


echo "Pushing Bookinfo to GitHub - DONE"