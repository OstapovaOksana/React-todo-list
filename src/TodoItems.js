import React, { Component } from "react";


class TodoItems extends Component {
    constructor(props){
        super(props);
        this.createTasks = this.createTasks.bind(this);

    }

    createTasks(item) {
        return (< li key={item.key} >
            
            <input type="checkbox" onClick={() => this.toggleTask(item)} />
            <text class={item.completed ? 'item done' : 'item'}> {item.text}</text>
            <button onClick={() => this.delete(item.key)} class="fa fa-trash"></button>
            
           
        </li >);
        
    }

    deleteDone(item) {
        this.props.deleteDone(item);
    }

    toggleTask(item) {
        this.props.toggleTask(item);
    }

    delete(key) {
        this.props.delete(key);
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (
            <ul className="theList">
                {listItems}
            </ul>
            );
    }
}

export default TodoItems;