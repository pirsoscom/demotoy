#!/bin/bash
oc scale --replicas=0  deployment catalogue -n sockinfo >/dev/null 2>&1
oc delete pod -n sockinfo $(oc get po -n sockinfo|grep catalogue|awk '{print$1}') --force --grace-period=0

