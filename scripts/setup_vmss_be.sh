#!/bin/bash

#Install NodeJS
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs build-essential

#GitHup Source Cloning
git clone https://github.com/microsoft/MCW-Cloud-native-applications.git /home/tony/GitSources

#Copy Source
cp -r /home/tony/GitSources/Hands-on\ lab/lab-files/infrastructure/content-api/ /home/tony/

#Change DB Connection
cd /home/tony/content-api

sudo sed -i 's#/localhost:27017/contentdb#/cosmos-contosoneuro:IpLHR81j4OLhnQ1rWnYJYCdpx7aKQuPrgMXCtg8JidtQxGZv3aSKZ0LHAxkWEyvigv6BWkOVki5Jk8NvXZOrSg==@cosmos-contosoneuro.mongo.cosmos.azure.com:10255/contentdb?ssl=true#g' ./config/config.js

mongodb://cmdb-contosoneuro:QrV3pgfpoKNc0kjbUCnMFHSqj6VySzHvwFn1KCz8rJk9yZhxMSIJytPuUZyAzZCm1GOIueawUrSvcmNX10MjVg==@cmdb-contosoneuro.mongo.cosmos.azure.com:10255/contentdb?ssl=true

#Install Dependency and Start
sudo npm install
node /home/tony/content-api/server.js &
