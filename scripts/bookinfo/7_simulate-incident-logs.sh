#!/bin/bash
if [[ $appid_book == "not_configured" ]] || [[ $appid_book == "" ]];
then
    echo "❌ Skipping Log Anomaly injection"
else
    echo "nameserver 8.8.8.8" > /etc/resolv.conf
    echo "🚚 Injecting Humio Events" 

    export LOGS_TOPIC=logs-humio-$appgroupid_book-$appid_book

    mv ca.crt ca.crt.old  >/dev/null 2>&1
    echo "."
    oc extract secret/strimzi-cluster-cluster-ca-cert -n zen --keys=ca.crt >/dev/null 2>&1
    echo "."

    export sasl_password=$(oc get secret token -n zen --template={{.data.password}} | base64 --decode)
    export BROKER=$(oc get routes strimzi-cluster-kafka-bootstrap -n zen -o=jsonpath='{.status.ingress[0].host}{"\n"}'):443

    echo "SASL PWD: "$sasl_password  
    echo "BROKER: "$BROKER

    input="./scripts/bookinfo/error_log.json"
    while IFS= read -r line
    do
      export my_timestamp=$(date +%s)000
      echo ${line} | sed "s/MY_TIMESTAMP/$my_timestamp/" | kafkacat -v -X security.protocol=SSL -X ssl.ca.location=./ca.crt -X sasl.mechanisms=SCRAM-SHA-512  -X sasl.username=token -X sasl.password=$sasl_password -b $BROKER -t $LOGS_TOPIC >/dev/null 2>&1
      echo ".."
    done < "$input"

fi
