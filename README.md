# Sound Equipment Rental Web Application

This is a web application for a sound equipment rental company based in Hungary. The application allows users to browse available sound equipment, add items to their cart, specify rental periods, and submit rental orders. The frontend is built using React, and the application is designed to be responsive and user-friendly.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Browse sound equipment by category (speakers, microphones, DJ equipment, amplifiers)
- View detailed product information, including specifications and rental prices
- Add products to the cart
- Specify rental period using date pickers
- Update quantities and remove items from the cart
- Display subtotals and total rental cost
- Submit rental order with customer information
- Responsive design for optimal viewing on various devices
- Multi-language support (English and Hungarian)
- Toast notifications for user interactions and form validation
- Accessibility features such as ARIA attributes

## Technologies Used
- React: JavaScript library for building user interfaces
- React Router: Library for handling client-side routing in React applications
- Styled Components: CSS-in-JS library for styling React components
- React Datepicker: Lightweight, customizable date picker component for React
- React Toastify: Library for adding toast notifications to React applications
- EmailJS: Service for sending emails directly from client-side JavaScript code
- Vite: Fast build tool and development server for modern web applications
- Node.js: JavaScript runtime environment
- npm: Package manager for the Node.js ecosystem

## Setup and Installation
1. Make sure you have Node.js and npm installed on your machine.
2. Clone the repository:
   ```
   git clone https://github.com/yourusername/sound-equipment-rental.git
   ```
3. Navigate to the project directory:
   ```
   cd sound-equipment-rental
   ```
4. Install the dependencies:
   ```
   npm install
   ```
5. Create a `.env` file in the project root and add the following environment variables:
   ```
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_USER_ID=your_emailjs_user_id
   ```
   Replace the placeholders with your actual EmailJS credentials.
6. Start the development server:
   ```
   npm run dev
   ```
7. Open your browser and visit `http://localhost:5173` to see the application running.

## Usage
1. Browse the sound equipment by navigating through different categories using the navigation menu.
2. Click on a product to view its details, including specifications and rental price.
3. Select the desired rental period using the date pickers.
4. Adjust the quantity if needed, and click the "Add to Cart" button.
5. Review your cart, update quantities, or remove items if necessary.
6. Fill in the customer information form with valid details.
7. Click the "Submit Order" button to place the rental order.
8. You will receive a confirmation toast notification upon successful submission.

## Folder Structure
```
sound-equipment-rental/
  ├── node_modules/
  ├── public/
  │   ├── images/
  │   └── output.json
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   │   ├── Cart.jsx
  │   │   ├── Contact.jsx
  │   │   ├── Footer.jsx
  │   │   ├── Home.jsx
  │   │   ├── Navbar.jsx
  │   │   ├── Products.jsx
  │   │   └── calculateDaysDifference.jsx
  │   ├── App.jsx
  │   ├── CartContext.jsx
  │   ├── CartProvider.jsx
  │   └── main.jsx
  ├── .env
  ├── .gitignore
  ├── index.html
  ├── package-lock.json
  ├── package.json
  ├── README.md
  └── vite.config.js
```

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request. Make sure to follow the existing code style and include appropriate documentation and tests.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).