import React, {Component} from 'react';
import './App.css';
import Radium from "radium";
import Person from './Person/Person';

class App extends Component {

    state = {
        persons: [
            {id: 0, name: 'Alex', age: 25},
            {id: 1, name: 'Nicolas', age: 22},
            {id: 2, name: 'Emilie', age: 21}
        ],
        otherState: 'some text',
        showPersons: false
    }

    togglePersonsHandler = () => {
        const doesSHow = this.state.showPersons;
        this.setState({
                showPersons: !doesSHow
            }
        )

    }

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => p.id === id);
        const person = {...this.state.persons[personIndex]};

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons});

    }

    render() {
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover': {
                backgroundColor : 'lightgreen',
                color: 'green'
            }
        }

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            key={person.id}
                            name={person.name}
                            age={person.age}
                            click={() => this.deletePersonHandler(index)}
                            change={(event) => this.nameChangedHandler(event, person.id)}
                        />
                    })}
                </div>
            );

            style.backgroundColor = 'red';
            style[':hover'] = {
                backgroundColor:  'salmon',
                color: 'black'
            }
        }

        const classes = [];
        if (this.state.persons.length <= 2) {
            classes.push('red');
        }

        if (this.state.persons.length <= 1) {
            classes.push('bold');
        }

        return (
            <div className="App">
                <h1>Hi, i am a react app</h1>{

            }
                <p className={classes.join(' ')}>this is really working</p>
                <button
                    style={style}
                    onClick={this.togglePersonsHandler}>Toggle Persons
                </button>
                {persons}
            </div>
        );
    }
}

export default Radium(App);
