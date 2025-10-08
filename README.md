# 🧮 IPAD-INSPIRED-AI-MATH CALCULATOR

<a href="https://ipatd-inspired-ai-atanvas.onrender.com/" target="_blank" rel="noopener noreferrer">Visit IPATD Inspired AI Backend</a> <br>
<h3>
This project is a web-based calculator with an interactive feature that allows users to draw mathematical equations or problems on a canvas. The drawn content is captured and sent to the backend for analysis. The backend processes the drawing, interprets the math expressions, and returns the solution using Google's Gemini AI model.
</h3>

---

## Features

- **Interactive Drawing**: Use the canvas to draw mathematical equations or graphical problems.
- **AI-Powered Math Analysis**: The backend uses Google's Gemini AI to interpret and solve the drawn content.
- **Real-Time Results**: Get instant results and solutions from the AI.
- **Responsive Interface**: A user-friendly interface designed for both desktop and mobile devices.

---

## Tech Stack

### Frontend

- **React**: For building the user interface.
- **Vite**: A fast development and build tool.
- **Tailwind CSS**: For styling the application with a modern, utility-first approach.
- **Shadcn & Mantine**: For additional UI components and design.
- **React Router DOM**: For routing and navigation.

### Backend

- **Node.js**: JavaScript runtime for the server-side logic.
- **Express**: Web framework for handling HTTP requests.
- **Google Gemini AI**: The backend uses the Gemini API to solve mathematical problems from the user input.
- **Sharp**: For image processing of the drawn content.

---
| Input (Hand-Drawn Problem) | Output (AI-Generated Solution) |
| :---: | :---: |
| ![Input](https://i.postimg.cc/sXnMjCqW/Screenshot-2025-10-08-233113.png) | ![Output](https://i.postimg.cc/Z5h5hq0z/Screenshot-2025-10-08-233208.png) |

### **Explanation**

1. The user sketches a real-world problem (a right-angled triangle with sides 8m and 6m) directly onto the canvas.  
2. The **Gemini AI** backend analyzes the image, identifies it as a geometry problem, and applies the Pythagorean theorem.  
3. The result is an instant and accurate mathematical solution: √(8² + 6²) = 10.
| :---: | :---: | 
| ![Input](https://i.postimg.cc/WzvscWb7/Screenshot-2025-10-08-233246.png) | ![Output](https://i.postimg.cc/SNZbgN85/Screenshot-2025-10-08-233358.png) |


### **Explanation**

1.  The user draws a problem: a car moving at **160 km/hr** and a distance of **100m** to impact, asking for the time.
2.  The **Gemini AI** backend analyzes the image, determines the problem is $Time = \text{Distance} / \text{Speed}$, and handles the necessary unit conversion (km/hr to m/s).
3.  The result shows the calculation: $100\text{m}$ divided by $(160 \times 1000/3600)\text{ m/s}$ equals $\mathbf{0.225}$ seconds.
   
| :---: | :---: | 
| ![Input](https://i.postimg.cc/HkfKNJLS/Screenshot-2025-10-08-232929.png) | ![Output](https://i.postimg.cc/j2FvJ9w3/Screenshot-2025-10-08-233653.png) |

### **Explanation**

1.  The user draws a simple visual problem, in this case, a set of scores from a game like cricket: **1, 2, 6, and 4 runs**.
2.  The **Gemini AI** recognizes the visual elements as a list of numbers to be combined to find the total.
3.  The result is the simple sum: $1 + 2 + 6 + 4 = \mathbf{15}$.

| :---: | :---: | 
| ![Input](https://i.postimg.cc/RFbwPtSh/Screenshot-2025-10-08-233441.png) | ![Output](https://i.postimg.cc/jdfyXCGS/Screenshot-2025-10-08-233523.png) |

### **Explanation**

1.  The user sketches a simple visual concept: a **person under a tree with a falling apple**.
2.  The **Gemini AI** recognizes the image as a reference to a famous historical anecdote, not a calculation.
3.  The result provides the relevant context: **The story of the apple falling on Newton's head, a discovery of gravity**.


| :---: | :---: | 
| ![MATHS](https://i.postimg.cc/PqS31K7s/Screenshot-2025-10-08-232308.png)  |

### **Explanation**

1.  The user writes a mathematical function, such as **$\sin(30)$**, directly onto the canvas.
2.  The **Gemini AI** accurately performs **OCR (Optical Character Recognition)** on the handwritten equation and solves the function.
3.  The result returns the expected value for sine of 30 degrees: **0.5**.

## Folder Structure

```plaintext
ipad-calculator/
├── frontend/                # React-based frontend code
│   ├── public/              # Static files
│   ├── src/                 # React components and logic
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js-based backend code
│   ├── apps/                # Contains application-specific code for the backend
│   │   └── calculate/       # The calculation-related logic
│   │       ├── utils.js     # Utility functions for backend processing
│   │       └── route.js     # API routes to handle requests
│   ├── constants.js         # Configuration and environment variables
│   ├── main.js              # Entry point for the backend server
│   ├── schema.js            # Defines the database schema (if applicable)
│   └── package.json         # Backend dependencies
└── README.md                # Project documentation
