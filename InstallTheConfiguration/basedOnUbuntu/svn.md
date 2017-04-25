#note: Used to configure personal use, no grouping

```
#install
$ sudo apt-get install subversion

#create
$ sudo mkdir /home/svn
$ svnadmin create /home/svn

#Configuration
$ vi /home/svn/conf/svnserve.conf
	Change "# anon-access = read , #auth-access = write , #password-db = passwd" 
	to "anon-access = none , auth-access= write , password-db = passwd"
$ vi /home/svn/conf/passwd
	Under "[users]" add your account and password, follow the example

#start up
$ sudo svnserve -d -r /home/svn

#To view
$ sudo netstat -antp |grep svnserve

#stop
$ pkill svnserve

```