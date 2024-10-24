// const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema({
//     task: {
//         type: String,
//         required: true,
//     },
//     done:{
//       type:Boolean,
//       default:false,
//     },
   
// }, 
// {
//   timestamps:true,
// }
// );

// const TodoModel = mongoose.model('tasks', todoSchema);

// module.exports = TodoModel;


const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'], // This restricts the value to one of these options
      default: 'Low' // If no priority is specified, it defaults to 'Low'
    },
}, 
{
  timestamps: true, // This option creates createdAt and updatedAt fields automatically
}
);

const TodoModel = mongoose.model('tasks', todoSchema);

module.exports = TodoModel; 
