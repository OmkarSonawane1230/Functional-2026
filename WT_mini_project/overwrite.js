const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join(__dirname, 'myApp/src/app/app.html');
const newAppHtml = `
<header class="app-bar">
  <div class="app-bar-inner">
    <a routerLink="/" class="app-bar-logo">
      <span class="material-icons" style="vertical-align:bottom; margin-right:4px;">health_and_safety</span>
      Hospital<span>App</span>
    </a>
    <ul class="app-bar-nav" id="mainNav">
      <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
      <li><a routerLink="/doctors" routerLinkActive="active">Doctors</a></li>
      <li><a routerLink="/book" routerLinkActive="active">Book Appointment</a></li>
      <li><a routerLink="/appointments" routerLinkActive="active">My Appointments</a></li>
    </ul>
    <button class="nav-toggle" id="menuBtn">
      <span class="material-icons">menu</span>
    </button>
  </div>
</header>

<div class="page-wrapper">
  <router-outlet></router-outlet>
</div>

<footer style="text-align:center; padding:24px; color:#80868b; font-size:13px; border-top:1px solid #e8eaed; margin-top:40px; background:#fff;">
  &copy; {{ currentYear }} Hospital Appointment System
</footer>
`;
fs.writeFileSync(appHtmlPath, newAppHtml);

const mainStylesDest = path.join(__dirname, 'myApp/src/styles.css');
const stylesSrcPath = path.join(__dirname, 'styles.css');
const mainStyles = fs.readFileSync(stylesSrcPath, 'utf8');

// Update myApp's styles to append index.html additions like global imports
// Angular 15 index.html had this? Let's check. Actually no, index.html just had material icons? I'll append material icons import.

fs.writeFileSync(mainStylesDest, `
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

${mainStyles}
`);

// To fix app.css as it is empty or has default angular styles, we can just clear it.
fs.writeFileSync(path.join(__dirname, 'myApp/src/app/app.css'), '');

