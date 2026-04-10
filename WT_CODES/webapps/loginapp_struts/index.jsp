<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
    <title>Login - Struts</title>
    <link rel="stylesheet" type="text/css" href="../../phpapps/employeelogin/css/styles.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Sign in</h1>
            <p>Use your account</p>
        </div>
        <s:form action="login">
            <div class="form-group">
                <s:textfield name="name" label="Name" placeholder="Full Name" />
                <s:fielderror fieldName="name" cssClass="error-message" />
            </div>
            <div class="form-group">
                <s:textfield name="mobile" label="Mobile" placeholder="Mobile Number" />
                <s:fielderror fieldName="mobile" cssClass="error-message" />
            </div>
            <div class="form-group">
                <s:textfield name="email" label="Email" placeholder="Email Address" />
                <s:fielderror fieldName="email" cssClass="error-message" />
            </div>
            <s:submit value="Login" cssClass="btn" />
            <div class="clear"></div>
        </s:form>
    </div>
</body>
</html>
