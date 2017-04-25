#install

sudo apt-get install mysql-server
### (note: The installation process will be prompted to set the password or something, pay attention to set up Do not forget)

apt-get install mysql-client
sudo apt-get install libmysqlclient-dev

#Check if the installation is successful
sudo netstat -tap | grep mysql


#login mysql
mysql -u root -p 

#Allow remote users to log in to mysql

```
	vi /etc/mysql/mysql.conf.d/mysqld.cnf
		Change "bind-address = 127.0.0.1" to "#bind-address = 127.0.0.1"
	service mysql restart

	mysql -u root -p
	GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
	FLUSH PRIVILEGES;

```


#start up
service mysql start

#stop
service mysql stop

#restart
service mysql restart