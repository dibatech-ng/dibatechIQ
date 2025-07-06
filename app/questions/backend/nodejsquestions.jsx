const nodejsQuestions = [
  {
    question: "What is Node.js?",
    options: {
      A: "A front-end library",
      B: "A JavaScript runtime built on Chrome's V8 engine",
      C: "A database",
    },
    correct: "B",
  },
  {
    question: "Which command initializes a new Node.js project?",
    options: { A: "npm install", B: "npm start", C: "npm init" },
    correct: "C"
  },
  {
    question: "Which file is the default entry point for a Node.js app?",
    options: { A: "main.js", B: "app.js", C: "index.js" },
    correct: "C"
  },
  {
    question: "What does the 'fs' module do?",
    options: { A: "Handles file system operations", B: "Starts the server", C: "Parses JSON" },
    correct: "A"
  },
  {
    question: "Which module is used to create a web server in Node.js?",
    options: { A: "http", B: "url", C: "path" },
    correct: "A"
  },
  {
    question: "Which function is used to read a file asynchronously?",
    options: { A: "readFile()", B: "read()", C: "fs.readFile()" },
    correct: "C"
  },
  {
    question: "What does npm stand for?",
    options: { A: "Node Programming Manager", B: "Node Package Manager", C: "New Project Module" },
    correct: "B"
  },
  {
    question: "What is the purpose of 'require' in Node.js?",
    options: { A: "To include external modules", B: "To create a route", C: "To start the server" },
    correct: "A"
  },
  {
    question: "Which method writes data to a file in Node.js?",
    options: { A: "fs.write()", B: "fs.writeFile()", C: "fs.save()" },
    correct: "B"
  },
  {
    question: "What is a callback function?",
    options: { A: "Function called after another function", B: "First function in a file", C: "Main server function" },
    correct: "A"
  },
  {
    question: "Which method removes a file in Node.js?",
    options: { A: "fs.remove()", B: "fs.delete()", C: "fs.unlink()" },
    correct: "C"
  },
  {
    question: "Which module is used to handle file paths?",
    options: { A: "url", B: "path", C: "query" },
    correct: "B"
  },
  {
    question: "What does the 'os' module provide?",
    options: { A: "Web server support", B: "Operating system information", C: "Database connection" },
    correct: "B"
  },
  {
    question: "What is an event-driven architecture?",
    options: { A: "Running tasks synchronously", B: "Handling events asynchronously", C: "Stack-based design" },
    correct: "B"
  },
  {
    question: "Which object represents the current module in Node.js?",
    options: { A: "exports", B: "__dirname", C: "module" },
    correct: "C"
  },
  {
    question: "What does the 'buffer' module handle?",
    options: { A: "Binary data", B: "Text encoding", C: "HTTP requests" },
    correct: "A"
  },
  {
    question: "What is middleware in Express.js?",
    options: { A: "A type of route", B: "A function that processes requests", C: "A data store" },
    correct: "B"
  },
  {
    question: "What is the purpose of 'res.send()' in Express.js?",
    options: { A: "Start server", B: "Send response", C: "Receive request" },
    correct: "B"
  },
  {
    question: "What is the default port for Node.js server?",
    options: { A: "3000", B: "8080", C: "80" },
    correct: "A"
  },
  {
    question: "How do you export a function from a module?",
    options: { A: "module.export = function", B: "export function", C: "module.exports = function" },
    correct: "C"
  }
];

export default nodejsQuestions;
