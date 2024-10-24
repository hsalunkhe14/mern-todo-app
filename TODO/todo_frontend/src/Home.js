// import React, { useEffect, useState } from 'react';
// import Create from './Create';
// import './App.css';
// import axios from 'axios';
// import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencil } from 'react-icons/bs';

// const Home = () => {
//     const [todos, setTodos] = useState([]);
//     const [updatetask, setUpdatetask] = useState('');
//     const [taskid, setTaskid] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5000/get')
//             .then(result => setTodos(result.data))
//             .catch(err => console.log(err));
//     }, []);

//     const edit = (id) => {
//         axios.put(`http://localhost:5000/edit/${id}`)
//             .then(result => {
//                 console.log(result.data);
//                 const updatedTodos = todos.map(todo => {
//                     if (todo._id === id) {
//                         return { ...todo, done: !todo.done };
//                     }
//                     return todo;
//                 });
//                 setTodos(updatedTodos);
//             })
//             .catch(err => console.log(err));
//     };

//     const Update = (id, updatedTask) => {
//         axios.put(`http://localhost:5000/update/${id}`, { task: updatedTask })
//             .then(result => {
//                 console.log(result.data);
//                 const updatedTodos = todos.map(todo => {
//                     if (todo._id === id) {
//                         return { ...todo, task: updatedTask };
//                     }
//                     return todo;
//                 });
//                 setTodos(updatedTodos);
//                 setTaskid('');
//                 setUpdatetask('');
//                 Window.location.reload();
//             })
//             .catch(err => console.log(err));
//     };

//     const Hdelete = (id) => {
//         axios.delete(`http://localhost:5000/delete/${id}`)
//             .then(result => {
//                 console.log(result.data);
//                 const updatedTodos = todos.filter(todo => todo._id !== id);
//                 setTodos(updatedTodos);
//             })
//             .catch(err => console.log(err));
//     };

//     return (
//         <main>
//             <Create />
//             {
//                 todos.length === 0 ? <div className='task'>No tasks found</div> :
//                     todos.map((todo) => (
//                         <div className='task' key={todo._id}>
//                             <div className='checkbox'>
//                                 {todo.done ? <BsFillCheckCircleFill className='icon' /> :
//                                     <BsCircleFill className='icon' onClick={() => edit(todo._id)} />}
//                                 {taskid === todo._id ?
//                                     <input type='text' value={updatetask} onChange={e => setUpdatetask(e.target.value)} />
//                                     :
//                                     <p className={todo.done ? 'through' : 'normal'}>{todo.task}</p>
//                                 }
//                             </div>
//                             <div>
//                                 <span>
//                                     <BsPencil className='icon' onClick={() => {
//                                         if (taskid === todo._id) {
//                                             Update(todo._id, updatetask);
//                                         } else {
//                                             setTaskid(todo._id);
//                                             setUpdatetask(todo.task);
//                                         }
//                                     }} />
//                                     <BsFillTrashFill className='icon' onClick={() => Hdelete(todo._id)} />
//                                 </span>
//                             </div>
//                         </div>
//                     ))
//             }
//         </main>
//     );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencil } from 'react-icons/bs';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [updatetask, setUpdatetask] = useState('');
    const [taskid, setTaskid] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/get')
            .then(result => {
                const sortedTodos = result.data.sort((a, b) => {
                    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                });
                setTodos(sortedTodos);
            })
            .catch(err => console.log(err));
    }, []);

    const edit = (id) => {
        axios.put(`http://localhost:5000/edit/${id}`)
            .then(result => {
                updateTodosState(id, { done: !result.data.done });
            })
            .catch(err => console.log(err));
    };

    const Update = (id, updatedTask) => {
        axios.put(`http://localhost:5000/update/${id}`, { task: updatedTask })
            .then(result => {
                updateTodosState(id, { task: updatedTask });
                setTaskid('');
                setUpdatetask('');
            })
            .catch(err => console.log(err));
    };

    const Hdelete = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    const updateTodosState = (id, changes) => {
        setTodos(prevTodos => prevTodos.map(todo => {
            if (todo._id === id) {
                return { ...todo, ...changes };
            }
            return todo;
        }));
    };

    return (
        <main>
            <Create />
            {todos.length === 0 ? <div className='task'>No tasks found</div> :
                todos.map((todo) => (
                    <div className='task' key={todo._id}>
                        <div className='checkbox'>
                            {todo.done ? <BsFillCheckCircleFill className='icon' /> :
                                <BsCircleFill className='icon' onClick={() => edit(todo._id)} />}
                            {taskid === todo._id ?
                                <input type='text' value={updatetask} onChange={e => setUpdatetask(e.target.value)} />
                                :
                                <p className={todo.done ? 'through' : 'normal'}>{todo.task}</p>
                            }
                            <div className={`priority priority-${todo.priority.toLowerCase()}`}>{todo.priority}</div>
                        </div>
                        <div>
                            <BsPencil className='icon' onClick={() => {
                                if (taskid === todo._id) {
                                    Update(todo._id, updatetask);
                                } else {
                                    setTaskid(todo._id);
                                    setUpdatetask(todo.task);
                                }
                            }} />
                            <BsFillTrashFill className='icon' onClick={() => Hdelete(todo._id)} />
                        </div>
                    </div>
                ))
            }
        </main>
    );
};

export default Home;
