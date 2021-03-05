#!/bin/bash
echo "."
oc scale --replicas=0  deployment ratings-v1 -n bookinfo >/dev/null 2>&1
oc delete pod -n bookinfo $(oc get po -n bookinfo|grep ratings-v1|awk '{print$1}') --force --grace-period=0
echo "."
