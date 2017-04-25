# update
sudo apt-get update

#install
sudo apt-get install build-essential libssl-dev
sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
source ~/.profile

# Use nvm

##View all node versions
nvm ls-remote

##Download the latest node
nvm install stable

##Download other nodes
nvm install 7.9.0

##View the existing version of the node
nvm ls

##Set the node to use the current version
nvm use 7.9.0

## Set the specified node version to default
nvm alias default 7.9.0