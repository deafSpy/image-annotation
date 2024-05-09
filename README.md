# Image Annotation Platform

## Overview
This is a specialized image annotation platform developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It offers a robust interface for users to upload, annotate, and manage images efficiently. The platform also integrates AWS for cloud storage, allowing for scalable image handling and management.

## Features
- User Authentication: Implements a secure user authentication and authorization system.
- Image Upload and Management: Users can upload images and manage them through a user-friendly interface.
- Annotation Tools: Provides category selection tool with CIFAR10 in mind.
- Cloud Storage: Utilizes AWS S3 (Amazon Web Services Cloud Storage Buckets) for storing images securely and reliably.
- Responsive Design: Ensures a seamless user experience across various devices with a fully responsive design.

## Installation
To install and run the Image Annotation Platform on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repository/image-annotation-platform.git
   cd image-annotation-platform
   ```

2. 

2. **Navigate to the server directory and install dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

4. **Open a new terminal, navigate to the client directory, and install dependencies:**
   ```bash
   cd ../client
   npm install
   ```

5. **Start the client:**
   ```bash
   npm run dev
   ```

After completing these steps, the server and client should be running, and you can access the application through your web browser.



## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or support, please contact [shreyas.palley@outlook.com](mailto:shreyas.palley@outlook.com).
