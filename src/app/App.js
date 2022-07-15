import React, {Component} from 'react';


class App extends Component {

    constructor(){
        super();
        this.state ={
            title:'',
            description:'',
            tasks: [],
            _id:''
        };
      this.addTask= this.addTask.bind(this);
      this.handleChange= this.handleChange.bind(this);
    }
    label='SAVE';
    addTask(e) {
        if(this.state.title.length>0&&this.state.description.length>0)
        {if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json()
            .then(data => {
                console.log(data);
                M.toast({html:'Task Updated'});
                this.setState({
                    title:'',
                    description:'',
                    _id:''
                });
                this.fetchTasks();
            }))
            .catch(err => console.log(err));
            this.label='SAVE';
        }
        else{
            fetch('/api/tasks',{
                method:'POST',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json()
            .then(data => {
                console.log(data);
                M.toast({html:'Task Saved'});
                this.setState({
                    title:'',
                    description:''
                });
                this.fetchTasks();
            }))
            .catch(err => console.log(err));
        }}
        
        e.preventDefault();
        
    }

    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
        .then(res => res.json()
        .then(data => {
            this.setState({
                tasks:data
            })
        }));
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });

    }
    
    deleteTask (id) {
        if(confirm('Are you sure you want to delete it')){
            fetch(`/api/tasks/${id}`,{method:'DELETE'})
        .then(res => res.json()
        .then(data => {
            M.toast({html:'Task Deleted'});
            this.fetchTasks();
        }));
        }
    }
    editTask (id) {
        fetch(`/api/tasks/${id}`)
        .then(res => res.json()
        .then(data => {
            
            this.setState({title:data.title,
            description:data.description,
        _id: data._id})
        this.label='UPDATE';
            
        }));
    }

    render() {
        return (
                <div>
                    {/*NAVIGATION */}
                    <nav
                    className='light-blue darken-4'>
                        <div className='container'>
                            <a className='brand-logo' href='/'>MERN Stack</a>
                        </div>
                        </nav>
                        <div className='container'>
                            <div className='row'>
                                <div className='col s5'>
                                    <div className='card'>
                                        <div className='card-content'>
                                            <form onSubmit={this.addTask}>
                                                <div className='row'>
                                                    <div className='input-field col s12'>
                                                        <input name='title' type='text'
                                                        placeholder='Task Tittle' 
                                                        onChange={this.handleChange} 
                                                        value={this.state.title}/>
                                                    </div>
                                                    <div className='input-field col s12'>
                                                        <textarea type='text'
                                                        placeholder='Task Description' className='materialize-textarea'
                                                        name='description' onChange={this.handleChange}
                                                        value={this.state.description}/>
                                                    </div>
                                                </div>
                                                <button  type='submit' className='btn light-blue darken-4'>{this.label}</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='col s7'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.tasks.map(task =>{
                                                return(
                                                    <tr key={task._id}>
                                                        <td>{task.title}</td>
                                                        <td>{task.description}</td>
                                                        <td>
                                                            <button className='material-icons btn light-red' style={{margin:'4px'}} onClick={() => this.deleteTask (task._id)}>delete</button>
                                                            <button className='material-icons btn light-blue' onClick={() => this.editTask (task._id)}>edit</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                </div>
        )
    }
};

export default App;