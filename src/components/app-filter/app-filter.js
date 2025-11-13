import './app-filter.css';

//кнопки никакого внутреннего состояния содержать не должны, поэтому оставляем функциональный компонент. Все данные - из пропсов

const AppFilter = (props) => {

    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'moreThen1000', label: 'З/п больше 1000$'}
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = name === props.filter;
        const clazz = active ? 'btn-light' : 'btn-outline-light';

        return (
            <button 
                key={name}
                className={`btn ${clazz}`}
                type="button"
                onClick={() => props.onFilterSelect(name)} // делаем через стрелочную функцию, так как нам нужно передать аргумент
                >
                    {label}
            </button>
        )
    })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        )

}

export default AppFilter;