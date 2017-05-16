curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-3.4.4.tgz

tar -zxvf mongodb-linux-x86_64-ubuntu1604-3.4.4.tgz

mv  mongodb-linux-x86_64-ubuntu1604-3.4.4/ /usr/local/mongodb 

rm mongodb-linux-x86_64-ubuntu1604-3.4.4.tgz

export PATH=/usr/local/mongodb/bin:$PATH

mkdir -p /data/db

mkdir -p /data/dbConf

mongod --logpath=/data/dbConf --fork
