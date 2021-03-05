#!/bin/bash

sudo rm -r demotoy/
git clone https://github.com/pirsoscom/demotoy.git
cd demotoy/
docker build -t niklaushirt/demotoy:1.0.0 .
docker push niklaushirt/demotoy:1.0.0
