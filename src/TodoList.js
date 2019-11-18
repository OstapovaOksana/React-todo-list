import React, { Component} from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";




class TodoList extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            items: JSON.parse(localStorage.getItem('item')) || [] 
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.toggleTask = this.toggleTask.bind(this);
    }

 

    addItem(e) {
        if (this.newInput.value !== "") {
            var newItem = {
                text: this.newInput.value,
                key: Date.now(),
                completed: false
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };

            }, () => {
                localStorage.setItem('item', JSON.stringify(this.state.items))
            });
        }

        this.newInput.value = "";
        e.preventDefault();
    }

    
    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return(item.key !== key)
        });

        this.setState({
            items: filteredItems
        }, () => {
            localStorage.setItem('item', JSON.stringify(filteredItems))
        });
    }

    toggleTask(item) {
        item.completed = !item.completed;
        this.forceUpdate();
    }

    sumDone(items) {
        var counter = 0;
        items.forEach(items => {
            if ( items.completed  == true) counter = counter + 1;
        })
        return (<text>{counter}</text>)
    }

 

    render() {
        return (
            <div className="todoListMain" >
                <div className="header" >
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this.newInput = a} placeholder="What needs to be done?" />
                        
                    </form>
                </div>
                <div className="panelClass">
                    <text className="panel">All tasks: {this.state.items.length}</text>
                    <text className="panel">Completed tasks: {this.sumDone(this.state.items)}</text>  
                
                    <button class="btn-gradient red mini" className="panelBtn" onClick={() => this.state.items.forEach(items => {
                    if (items.completed === true) this.deleteItem(items.key);
                    })}>Delete completed tasks</button> 
                </div>
                <TodoItems toggleTask={this.toggleTask} entries={this.state.items} delete={this.deleteItem}  />
            </div>
        );
        
    }

}

export default TodoList;