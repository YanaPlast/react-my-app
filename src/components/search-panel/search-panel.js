import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: '' //это состояние нужно поднять до компонента app
        }
    } 

    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term}); // установка локального состояния
        //теперь пробрасываем состояние наверх - через пропс, который пришел
        this.props.onUpdateSearch(term) // названия одинаковые, но это разные функции. Эта приходит из другого компонента
    }

    render() {
        return (
            <input 
                type="text" 
                className="form-control search-input"
                placeholder="Найти сотрудника"
                value={this.state.term} // становили связывание компонента со стейтом
                onChange={this.onUpdateSearch}
            />
        )
    }

    // инпут у нас - управляемый компонент и инпут номально синхронизируется с локальным стейтом

}

export default SearchPanel;