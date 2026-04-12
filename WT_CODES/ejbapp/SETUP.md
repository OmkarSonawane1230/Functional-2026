# Setup and Run Instructions (MySQL Version)

This guide provides instructions to run the EJB banking application with MySQL persistence.

### 1. Setup MySQL Database
Ensure MySQL is running (default port 3306).
```bash
# Enter MySQL
mysql -u root

# Inside MySQL, run these commands:
CREATE DATABASE bank_db;
USE bank_db;
CREATE TABLE account (id INT PRIMARY KEY AUTO_INCREMENT, balance DOUBLE DEFAULT 0.0);
INSERT INTO account (id, balance) VALUES (1, 5000.0);
```
*Note: If you have a different MySQL password, update it in `BankBean.java`.*

### 2. Include MySQL Driver in GlassFish
The application needs the MySQL Connector JAR to connect to the database.
1. Download `mysql-connector-java-*.jar`.
2. Place it in `/workspaces/Functional-2026/glassfish8/glassfish/lib/` (The main library folder).
3. Restart GlassFish if it was already running.

```bash
# Move to main lib
cp mysql-connector-j-9.3.0.jar /workspaces/Functional-2026/glassfish8/glassfish/lib/
```

### 3. Compile the Application
Use the `jakartaee.jar` library for compilation:

```bash
mkdir -p /workspaces/Functional-2026/WT_CODES/ejbapp/src/main/webapp/WEB-INF/classes
javac -cp "/workspaces/Functional-2026/glassfish8/glassfish/lib/jakartaee.jar" \
-d /workspaces/Functional-2026/WT_CODES/ejbapp/src/main/webapp/WEB-INF/classes \
/workspaces/Functional-2026/WT_CODES/ejbapp/src/main/java/com/bank/*.java
```

### 4. Build and Deploy
```bash
# Build WAR
cd /workspaces/Functional-2026/WT_CODES/ejbapp/src/main/webapp/
zip -r /workspaces/Functional-2026/WT_CODES/ejbapp/ejb-bank-app.war .

# Restart Server & Deploy
/workspaces/Functional-2026/glassfish8/bin/asadmin stop-domain
/workspaces/Functional-2026/glassfish8/bin/asadmin start-domain
/workspaces/Functional-2026/glassfish8/bin/asadmin deploy --force /workspaces/Functional-2026/WT_CODES/ejbapp/ejb-bank-app.war
```

### 3. Create the WAR File
Package the application for deployment:

```bash
cd /workspaces/Functional-2026/WT_CODES/ejbapp/src/main/webapp/
zip -r /workspaces/Functional-2026/WT_CODES/ejbapp/ejb-bank-app.war .
```

### 4. Start the Server and Deploy
Run these commands to start GlassFish and deploy your application:

```bash
# Start GlassFish
/workspaces/Functional-2026/glassfish8/bin/asadmin start-domain

# Deploy the WAR
/workspaces/Functional-2026/glassfish8/bin/asadmin deploy /workspaces/Functional-2026/WT_CODES/ejbapp/ejb-bank-app.war
```

### 5. Access the Application
1. In Codespaces, look for the **Ports** tab (bottom panel).
2. Look for port **8080**.
3. Click the "Open in Browser" globe icon.
4. Append `/ejb-bank-app/` to the URL.
   - Example: `https://something-8080.app.github.dev/ejb-bank-app/`

---
**Tips:**
- To stop the server: `.../asadmin stop-domain`
- To check logs: `tail -f /workspaces/Functional-2026/WT_CODES/ejbapp/server/glassfish5/glassfish/domains/domain1/logs/server.log`
