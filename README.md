# Functional-2026

## To setup Apache Tomcat and MySQL Lib Execute following commands. `(Only for Codespace)`

```
cd ~

wget https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.52/bin/apache-tomcat-10.1.52.tar.gz

tar -xzf apache-tomcat-10.1.52.tar.gz

mv apache-tomcat-10.1.52 tomcat

rm apache-tomcat-10.1.52.tar.gz

cd ~/tomcat/lib

wget -nc https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/9.3.0/mysql-connector-j-9.3.0.jar
```

To start the server

```
cd ~/tomcat/bin
chmod +x *.sh
./startup.sh
```

To stop the server

```
cd ~/tomcat/bin
chmod +x *.sh
./shutdown.sh
```


open new terminal

## To setup MySQL

```
sudo apt update
sudo apt install -y mysql-server
sudo service mysql start
```

Fixing MySQL socket permissions...

```
sudo chown -R mysql:mysql /var/run/mysqld
sudo chmod 755 /var/run/mysqld
sudo service mysql restart
```

Setting up MySQL root user and database `[execute each line individually]`

```
sudo mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql123';
FLUSH PRIVILEGES;
```

Then to use MySQL

```
sudo mysql -u root -p
```

## And start executing following commands 

To fully replace the old app in Tomcat (delete first, then copy fresh), use this 👇

```
rm -rf /home/codespace/tomcat/webapps/loginapp && \
cp -r /workspaces/Functional-2026/WT_CODES/webapps/loginapp /home/codespace/tomcat/webapps/
```

If you keep updating frequently, use sync instead of delete+copy:

```
rsync -av --delete /workspaces/Functional-2026/WT_CODES/webapps/loginapp/ /home/codespace/tomcat/webapps/loginapp/
```



To run the tomcat code first put the required lib like mysql.jar for java in tomcat/lib folder 
after that use proper path for the servlet api

Both of this work

```
javac -cp "/home/codespace/tomcat/lib/*" *.java
javac -cp "/home/codespace/tomcat/lib/servlet-api.jar" *.java
```
<<<<<<< HEAD


```
=======
>>>>>>> bb32e48b2f1794f0f4bde6eab4feb22a156f7982


## Setup for Notebook

```
pip3 install notebook


jupyter lab --ip=0.0.0.0 --no-browser


sudo apt-get install texlive-xetex texlive-fonts-recommended texlive-plain-generic


jupyter nbconvert --to pdf your_notebook.ipynb --LatexPreprocessor.date=""
```

<<<<<<< HEAD
=======

## Extra Python Libraries Required

```
pip3 install pandas numpy seaborn matplotlib scikit-learn nltk

>>>>>>> bb32e48b2f1794f0f4bde6eab4feb22a156f7982
```