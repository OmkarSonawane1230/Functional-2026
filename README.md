# Functional-2026

## To setup Apache Tomcat and MySQL Lib Execute following commands. (Only for Codespace)

cd ~

## before downloading through this link check the version or you might get a 404 not found error (the versions changes frequently)

wget https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.54/bin/apache-tomcat-10.1.54.tar.gz


tar -xzf apache-tomcat-10.1.54.tar.gz

mv apache-tomcat-10.1.54 tomcat

rm apache-tomcat-10.1.54.tar.gz

cd ~/tomcat/lib

wget -nc https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/9.3.0/mysql-connector-j-9.3.0.jar


## To start the server

cd ~/tomcat/bin
chmod +x *.sh
./startup.sh


## To stop the server

cd ~/tomcat/bin
chmod +x *.sh
./shutdown.sh


## To setup MySQL

sudo apt update
sudo apt install -y mysql-server
sudo service mysql start


## Fixing MySQL socket permissions

sudo chown -R mysql:mysql /var/run/mysqld
sudo chmod 755 /var/run/mysqld
sudo service mysql restart


## Setting up MySQL root user and database (execute each line individually)

sudo mysql -u root

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql123';

FLUSH PRIVILEGES;


## Then to use MySQL

sudo mysql -u root -p


## Replace old app in Tomcat

rm -rf /home/codespace/tomcat/webapps/loginapp && \
cp -r /workspaces/Functional-2026/WT_CODES/webapps/loginapp /home/codespace/tomcat/webapps/


## Sync (recommended for frequent updates)

rsync -av --delete /workspaces/Functional-2026/WT_CODES/webapps/loginapp/ /home/codespace/tomcat/webapps/loginapp/


## Compile Java files

javac -cp "/home/codespace/tomcat/lib/*" *.java

# OR

javac -cp "/home/codespace/tomcat/lib/servlet-api.jar" *.java


## Setup for Notebook

pip3 install notebook

jupyter lab --ip=0.0.0.0 --no-browser

sudo apt-get install texlive-xetex texlive-fonts-recommended texlive-plain-generic

jupyter nbconvert --to pdf your_notebook.ipynb --LatexPreprocessor.date=""


## Extra Python Libraries Required

pip3 install pandas numpy seaborn matplotlib scikit-learn nltk


## when setting PHP do following

```
sudo apt-get update
sudo apt-get install php-cli php-mysql

export PATH=/usr/bin:$PATH

#output should be /usr/bin/php

php -v
php -m | grep mysqli

php -S localhost:8000
```

## use to kill portno

fuser -k 4848/tcp