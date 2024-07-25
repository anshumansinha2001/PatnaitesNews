# React News Website

## Overview

This project is a React-based news website created for a client, utilizing the MERN stack for full-stack development. It includes server-side rendering (SSR) to enhance SEO and improve user experience. The application allows for file uploads and uses Cloudinary for cloud storage.

## Technologies Used

- **Frontend:**

  - React.js
  - Redux
  - React-Router-Dom
  - React-Helmet
  - TailwindCSS
  - React-Toastify
  - React-Hooks
  - React-Query
  - React-Hook-Form
  - Redux-Toolkit

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB
  - Multer (for file uploads)
  - Sharp (for image processing)

- **Cloud Storage:**
  - Cloudinary

## Features

- **SSR Rendering:** Enhances SEO and provides faster initial page loads.
- **File Uploads:** Users can upload files with the help of Multer, and files are stored securely on Cloudinary.
- **Responsive Design:** Styled with TailwindCSS for a modern, responsive layout.
- **Rich Text Editing:** Integrated rich text editor for content management.
- **Dynamic Routing:** Utilizes React-Router-Dom for handling routes.
- **State Management:** Managed with Redux and Redux-Toolkit for a smooth user experience.
- **Error Handling:** Toast notifications for real-time feedback on user actions.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your local machine.
- A Cloudinary account for file storage.
- MongoDB setup for your database.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/react-news-website.git
   cd react-news-website

   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   CLOUDINARY_URL=your-cloudinary-url
   MONGO_URI=your-mongodb-uri
   ```

4. **Start the Development Server:**

   ```bash
   npm run dev
   ```

5. **Build for Production:**

   ```bash
   npm run build
   ```

## Deployment

This project is deployed on Vercel. For custom deployments, ensure you configure the `vercel.json` file to handle dynamic routing appropriately.

## Contributing

Feel free to open issues or submit pull requests if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **React Team:** For the amazing React library.
- **Cloudinary:** For easy cloud storage solutions.
- **Multer:** For handling file uploads.
- **TailwindCSS:** For a great utility-first CSS framework.

```

Feel free to adjust the sections according to your specific needs!
```
