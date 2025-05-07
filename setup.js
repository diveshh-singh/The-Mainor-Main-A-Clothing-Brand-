const { execSync } = require("child_process")
const fs = require("fs")

// Check if .env file exists, if not create it
if (!fs.existsSync("./server/.env")) {
  console.log("Creating .env file in server directory...")
  fs.copyFileSync("./server/.env.example", "./server/.env")
  console.log("Please update the .env file with your MongoDB connection string and other credentials")
}

// Check if .env.local file exists, if not create it
if (!fs.existsSync("./.env.local")) {
  console.log("Creating .env.local file in root directory...")
  fs.writeFileSync(
    "./.env.local",
    `# API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
`,
  )
}

// Install dependencies
console.log("Installing dependencies...")
execSync("npm install", { stdio: "inherit" })

// Install additional dependencies
console.log("Installing additional dependencies...")
execSync("npm install canvas-confetti", { stdio: "inherit" })

console.log("Setup complete! You can now run the following commands:")
console.log("- npm run dev: Start the development server")
console.log("- node server/seeder.js: Seed the database with initial products")
