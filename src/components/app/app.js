import { Component } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';


// function WhoAmI (props) {
//     return (
//         <div>
//             <h1>My name is {props.name()}, surname - {props.surname}</h1>
//             <a href="{props.link}">Мой профиль</a>
//         </div>
//     )
// }


//Переделываем на классовый компонент

class WhoAmI extends Component  {

    constructor(props) {
        super(props);  
        this.state = {
            years: 27,
            text: '+++',
            position: '',
        }
        this.nextYear = this.nextYear.bind(this)
    }

    nextYear() {
        console.log('+++');
        this.setState(state => (
            {years: state.years + 1}
        )) // то, что мы тут обернули всё ещё в круглые скобки - это сокращенный синтаксис return, то есть выражение в скобках возвращает значение
    } // тут мы возвращаем объект-состояния. this убирается!

    commitInputChanges = (e, color) => {
        console.log(color)
        this.setState({
            position: e.target.value
        })
    }

    render() {
        const {name, surname, link } = this.props;
        const {position, years} = this.state;

        return (
            <div>
                <button onClick={this.nextYear}>{this.state.text}</button>
                <h1>
                    My name is {name}, 
                    surname - {surname}, 
                    age - {years},
                    position - {position}
                    </h1>
                <a href={link}>Мой профиль</a>
                <form>
                    <span>Введите должность</span>
                    <input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')}/>
                </form>
            </div>
        )
    }

}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, name: 'Alex C.',  salary: 800, increase: false},
                {id: 2, name: 'Mark M.',  salary: 3000, increase: true},
                {id: 3, name: 'Frank L.',  salary: 5000, increase: true},
            ]
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            //const index = data.findIndex(elem => elem.id === id );
            // далее мы могли бы удалить этот элемент из state, но мы не можем мутировать стейт 
            // поэтому создаем новый массив, который будет содержать все элементы старого, но без удаленного. То есть изначальный объект сохраняем невридимым

            //ПЕРВЫЙ спосб удалить - громоздкий
            //const before = data.slice(0, index); // часть массива до удаляемого элемента/ Slice - копирует, возвращает НОВЫЙ массив, копируя указанный диапазон элементов исходного массива.
            //const after = data.slice(index + 1, ); // часть массива от элемента, следующего за удаляемым и до конца массива

            //const newArr = [...before, ...after];

            //ВТОРОЙ способ удалить с сохранением иммутабельности (покороче)

            const newArr = data.filter(item => item.id !== id);

            return {
                data: newArr
            }
            
        })
    }

    render() {
        return ( 
            <div className="app">
                <AppInfo/>

                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>
                
                <EmployersList 
                    data={this.state.data}
                    onDelete={this.deleteItem}
                />
                <EmployersAddForm />

                <WhoAmI name="Albert" surname='Planck' link='#'/> 
                <WhoAmI name='Albertina' surname='Linden' link='#'/>
            </div>        
        )
    }

}

export default App;