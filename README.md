# MandirMart
Mandir Mart is a Dummy E-commerce Project which focused on the theme of devotional shopping, offering products like idols, pooja items, and festival kits, Mandir Structures.
<br>
<br>
TECHSTACK - <br>
1. Frontend - React.js - Building dynamic and responsive UI 
2. Backend -  Node.js + Express.js - Server-side logic & REST API development 
3. Database - MongoDB - Storing users, products, and cart data 
4. Authentication - JWT - Securing user sessions
5. Image Upload - Multer + Cloudinary - Uploading & storing product images on cloud
6. Payment (Test) - Stripe (Test mode) - Integrating dummy checkout functionality
7. Deployment - Vercel(FE) + Render(BE)

CHALLENGES - <br>
1. Image Upload Problems - Initially used Multer for local storage, but images didn’t load after deployment. Switched to Cloudinary and handled async upload issues.
2. Deployment Delay - Render APIs were slow due to cold starts so, fixed using UptimeRobot to keep the server active.









