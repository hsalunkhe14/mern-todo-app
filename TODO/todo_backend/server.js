// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const TodoModel = require('./models/Todo');

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/Todo',
//     console.log('MongoDB connected')
// )

// app.listen(5000,
//     console.log('Server listening on port: 5000')
// )

// app.post('/add', (req, res) => {
//   const { task } = req.body;
//   TodoModel.create({ task })
//       .then(result => res.json(result))
//       .catch(err => console.log(err));
   
// });

// app.get('/get',(req,res)=>{
//   TodoModel.find()
//   .then(result=> res.json(result))
//   .catch(err=>console.log(err));
// });
  
// app.put('/edit/:id',(req,res)=>{
//   const{id} = req.params;
//   TodoModel.findByIdAndUpdate(id,{done:true},{new:true})
//   .then(result=> res.json(result))
//   .catch(err=>res.json(err));
//  });

// app.put('/update/:id',(req,res)=>{
//   const{id} = req.params;
//   const{task} = req.body;
//   TodoModel.findByIdAndUpdate(id,{task:task})
//   .then(result=> res.json(result))
//   .catch(err=>res.json(err));
//  });

// app.delete('/delete/:id',(req,res)=>{
//   const{id} = req.params;
//   TodoModel.findByIdAndDelete({_id:id})
//   .then(result=> res.json(result))
//   .catch(err=>res.json(err));
//  }); 

// module.exports=app;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Improved MongoDB connection handling with error catch
mongoose.connect('mongodb://127.0.0.1:27017/Todo')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(5000, () => {
    console.log('Server listening on port: 5000');
});

// Updated POST route to handle priority
app.post('/add', (req, res) => {
  const { task, priority } = req.body;  // Include priority in the request body
  TodoModel.create({ task, priority })  // Include priority when creating a task
      .then(result => res.json(result))
      .catch(err => res.status(400).json(err));  // Send error status code
});

// GET all tasks
app.get('/get', (req, res) => {
  TodoModel.find()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
});

// Update task completion status
app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { done } = req.body;  // Allow setting 'done' dynamically
  TodoModel.findByIdAndUpdate(id, { done }, { new: true })
  .then(result => res.json(result))
  .catch(err => res.status(404).json(err));  // Handling not found or other errors
});

// Update task content and priority
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { task, priority } = req.body;  // Include priority update
  TodoModel.findByIdAndUpdate(id, { task, priority }, { new: true })
  .then(result => res.json(result))
  .catch(err => res.status(400).json(err));
});

// Delete task
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
  .then(result => res.json(result))
  .catch(err => res.status(404).json(err));  // Handling not found or other errors
});

module.exports = app;
