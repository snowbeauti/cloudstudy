#!/bin/bash

#Install NodeJS
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs build-essential

#Install Angular
sudo npm install -g @angular/cli

#GitHup Source Cloning
git clone https://github.com/microsoft/MCW-Cloud-native-applications.git /home/tony/GitSources

#Copy Source
cp -r /home/tony/GitSources/Hands-on\ lab/lab-files/infrastructure/content-web/ /home/tony/

#Setup Front-End Web Service
sudo npm install --prefix /home/tony/content-web
cd /home/tony/content-web
sudo sed -i 's/localhost/172.16.4.44/g' app.js
sudo npm run build --prefix /home/tony/content-web
node app.js &