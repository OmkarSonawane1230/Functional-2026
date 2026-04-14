# Complete Setup Guide: Digital Marketing Hadoop Ecosystem

This guide contains the exact steps required to set up the Hadoop ecosystem (Hadoop, Hive, HBase, Solr, and Spark) from scratch on a clean Linux environment or Dev Container.

## 1. Install Java & Python
Hadoop ecosystem relies heavily on Java. PySpark requires Python and pip.
```bash
sudo apt update
sudo apt install -y openjdk-11-jdk python3-pip
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
```

## 2. Install & Configure SSH (Crucial for Hadoop)
Hadoop requires passwordless SSH to `localhost` to start its nodes.
```bash
# Install SSH server
sudo apt-get install -y openssh-server

# Configure SSH to listen on port 22 and localhost
sudo su -c 'echo "Port 22" >> /etc/ssh/sshd_config'
sudo su -c 'echo "ListenAddress 127.0.0.1" >> /etc/ssh/sshd_config'

# Restart the SSH service
sudo service ssh restart

# Generate SSH keys and authorize them
mkdir -p ~/.ssh
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys

# Accept localhost key automatically and Test
ssh -o StrictHostKeyChecking=no localhost "echo 'SSH IS WORKING'"
```

## 3. Download the Ecosystem Binaries
```bash
# 1. Hadoop
wget https://archive.apache.org/dist/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz
tar -xzf hadoop-3.3.6.tar.gz

# 2. Hive
wget https://archive.apache.org/dist/hive/hive-3.1.3/apache-hive-3.1.3-bin.tar.gz
tar -xzf apache-hive-3.1.3-bin.tar.gz

# 3. HBase
wget https://archive.apache.org/dist/hbase/2.5.5/hbase-2.5.5-bin.tar.gz
tar -xzf hbase-2.5.5-bin.tar.gz

# 4. Solr
wget https://archive.apache.org/dist/lucene/solr/8.11.2/solr-8.11.2.tgz
tar -xzf solr-8.11.2.tgz
```

## 4. Set Environment Variables
Run this and also paste it into your `~/.bashrc` file for future terminal sessions:
```bash
export HADOOP_HOME=$(pwd)/hadoop-3.3.6
export HIVE_HOME=$(pwd)/apache-hive-3.1.3-bin
export HBASE_HOME=$(pwd)/hbase-2.5.5
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$HIVE_HOME/bin:$HBASE_HOME/bin:$(pwd)/solr-8.11.2/bin
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
```

## 5. Configure Hadoop for Localhost
Configure Hadoop so it binds correctly to localhost.
```bash
cd hadoop-3.3.6

# core-site.xml
cat <<EOF > etc/hadoop/core-site.xml
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>
EOF

# hdfs-site.xml
cat <<EOF > etc/hadoop/hdfs-site.xml
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>
EOF

# Enforce localhost workers and JAVA_HOME
echo "localhost" > etc/hadoop/workers
echo "export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64" >> etc/hadoop/hadoop-env.sh
cd ..
```

## 6. Format HDFS and Start Everything
```bash
# Format HDFS (Do this ONLY ONCE)
hdfs namenode -format -force

# Start Hadoop HDFS and YARN
start-dfs.sh
start-yarn.sh

# Start HBase
start-hbase.sh

# Start Solr
solr start

# Verify running processes
jps
```

## 7. Install PySpark & Initialize Hive
```bash
# Install PySpark
pip3 install pyspark

# Initialize Hive database
cd apache-hive-3.1.3-bin
bin/schematool -dbType derby -initSchema
cd ..
```

Now refer to `README.md` to execute the Case Study programs!
