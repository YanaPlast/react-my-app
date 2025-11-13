import { Component } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import { v4 as uuidv4 } from 'uuid';


//Переделываем на классовый компонент

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, name: 'Alex C.',  salary: 800, increase: false, rise: true},
                {id: 2, name: 'Mark M.',  salary: 3000, increase: true, rise: false},
                {id: 3, name: 'Frank L.',  salary: 5000, increase: true, rise: false},
            ],
            term: '', // строчку получаем из компонента search-pannel
            filter: 'all',
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

    addItem = (e, name, salary, form) => {
        e.preventDefault();
        
        if(name.trim().length > 3 && salary.trim().length > 3) {

            const newId = uuidv4();

            const newItem = {
                id: newId,
                name,
                salary,
                increase: false,
                rise: false
            }

            this.setState(({data}) => {
                return {
                    data: [...data, newItem]
                }
            })
        }

    }

    onToggleProp = (id, prop) => {

        //Громоздкий, но рабочий синтаксис
        /*
        this.setState(({data}) => {            
            const index = data.findIndex(elem => elem.id === id); // получаем индекс элемента, с которым будем работать
            const oldItem = data[index];
            const newItem = {...oldItem, increase: !oldItem.increase};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]; // разворачиваем ... - то есть копируем в новый объект

            return {
                data: newArr
            }             
        })
        */
       //более короткий синтаксис

       this.setState(({data}) => ({
        
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop] }
                }
                return item;
            })
       }))

    }

    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items
        }
        return items.filter(item => item.name.indexOf(term) > -1) // находим все совпадения. Вернет массив элементов, которые подходят под поиск. Далее эти элементы нужно будет отобразить
    }

    onUpdateSearch = (term) => {
        this.setState({term}) // это сокращенная запись от {term: term}
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
        //break в реакте можно не ставить
    }

    onFilterSelect = (filter) => {
        this.setState({filter}) // то есть filter: filter
    }


    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter); // фильтруем уже отфильтрованный по поиску массив. Т.е. конечные данные, которые мы показываем на странице проходят двойную фильтрацию

        return ( 
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployersAddForm onAdd={this.addItem}/>
            </div>        
        )
    }

}

export default App;