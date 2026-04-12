# Banking Application with EJB

A simple Java Enterprise Edition (Java EE) application demonstrating banking transactions (Deposit and Withdraw) using Enterprise JavaBeans (EJB).

## Project Structure
- `BankBean.java`: A `@Stateful` Session Bean that handles the business logic and maintains the account balance.
- `BankServlet.java`: A Servlet that handles HTTP requests and interacts with the EJB.
- `index.jsp`: The simple, clean user interface following Google-like design principles.
- `web.xml`: Configuration for the web application.

## Prerequisites
- Java Development Kit (JDK) 8 or higher.
- A Java EE Application Server (e.g., GlassFish 5+, WildFly, Payara).

## Deployment Steps
1. **Compile the Sources**: 
   Since this is a standard Java project, you can compile the `.java` files using your IDE or `javac`.
2. **Package the Application**: 
   Create a WAR (Web Application Archive) file. The structure should be:
   ```
   bankapp.war/
   ├── WEB-INF/
   │   ├── web.xml
   │   └── classes/
   │       └── com/bank/
   │           ├── BankBean.class
   │           └── BankServlet.class
   └── index.jsp
   ```
3. **Deploy to GlassFish/WildFly**:
   - Copy the WAR file to the `autodeploy` directory of your application server.
   - Alternatively, use the admin console (typically `localhost:4848` for GlassFish) to upload and deploy the WAR.
4. **Access the App**:
   Open your browser and navigate to: `http://localhost:8080/bankapp/`

## Features
- **Stateless Session Control**: Though designed with a Session Bean, it showcases the injection of business logic tier into the web tier.
- **Validation**: Prevents negative amounts and overdrafts.
- **Modern UI**: Clean, centered card layout with blue accents.
