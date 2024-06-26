# Image Annotation Platform

## Overview
This is a specialized image annotation platform developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It offers a robust interface for users to upload, annotate, and manage images efficiently. The platform utilizes JWT tokens for secure user authentication and integrates AWS for cloud storage, allowing for scalable image handling and management.

## Features
- User Authentication: Implements a secure user authentication and authorization system.
- Image Upload and Management: Users can upload images and manage them through a user-friendly interface.
- Annotation Tools: Provides category selection tool with CIFAR10 in mind.
- Cloud Storage: Utilizes AWS S3 (Amazon Web Services Cloud Storage Buckets) for storing images securely and reliably.
- Toast Notification System: A toast notification system is implemented to display messages to the user.
- Responsive Design: Ensures a seamless user experience across various devices with a fully responsive design.
- JWT Tokens: The platform uses JSON Web Tokens (JWT) for handling the authentication of users securely.
- Batch Image Upload and Queue: Users can upload multiple images at once and annotate them in in a queue.
- Large Image Upload: Images larger than a threshold are downloaded in chunks to prevent memory overflow.
- Advanced Image Processing: The image annotation platform ensures that all images are in the same resolution and square format. This is to ensure consistency and ease of annotation.
- Search Functionality: In the Gallery page, one can search for the images based on their annotated categories.


## Installation
To install and run the Image Annotation Platform on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repository/image-annotation-platform.git
   cd image-annotation-platform
   ```

2. **Update the .env file in the root directory of both client and server folders and include AWS credentials and other sensitive information:**
   ```bash
   cp .env.example .env
   ```

3. **Navigate to the server directory and install dependencies:**
   ```bash
   cd server
   npm install
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

5. **Open a new terminal, navigate to the client directory, and install dependencies:**
   ```bash
   cd ../client
   npm install
   ```

6. **Start the client:**
   ```bash
   npm run start
   ```

After completing these steps, the server and client should be running, and you can access the application through your web browser.

## UML
![alt text](screenshots/uml.png)

## Screens
* **Homepage**
![alt text](screenshots/home.png)
<br></br>


* **Register**
![alt text](screenshots/register.png)
<br></br>

* **Login**
![alt text](screenshots/login.png)
<br></br>

* **Upload**
![alt text](screenshots/upload1.png)
<br></br>

* **Upload**
![alt text](screenshots/upload2.png)
<br></br>

* **Gallery**
![alt text](screenshots/gallery.png)
<br></br>

* **Logout**
![alt text](screenshots/logout_home.png)
<br></br>

* **Guest**
![alt text](screenshots/login_home.png)


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or support, please contact [shreyas.palley@outlook.com](mailto:shreyas.palley@outlook.com).
