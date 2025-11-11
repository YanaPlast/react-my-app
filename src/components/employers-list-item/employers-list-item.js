import { Component } from 'react';
import "./employers-list-item.css";

class EmployersListItem  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      increase: false,
      isLike: false,
      
    }
  }

  onIncrease = () => {
    this.setState(({increase}) =>({ // тут мы прямо в аргументе колбека провели деструктуризацию , чтобы потом не писать state.increase. После => круглые скобки - чтобы не прописывать return
      increase: !increase, // внутри объекта ппрописываем новое значение increase - равное противоположному (а вообще, работаем через колбек, так как новое значение четко зависит от предыдущего
    }))
  }

  changeLikeState = () => {
    this.setState(({isLike}) => ({
      isLike: !isLike,
    }))
  }
 
 render () {
  const  {name, salary, onDelete} = this.props;
  const {increase} = this.state; // инкриз приходит не из пропса, а зависит от состояния
  const {isLike} = this.state; // деструктуризируем стейт и вытаскиваем из него  isLike

  let classNames = "list-group-item d-flex justify-content-between";
  if(increase) {
    classNames = classNames + ' increase'
  }

  if(isLike) {
    classNames  = classNames + ' like'
  }

  return (
    <li className={classNames} >
        <span className="list-group-item-label" onClick={this.changeLikeState}>{name}</span>
        <input type="text" className="list-group-item-input" defaultValue={salary + '$'} />

        <div className="d-flex justify-content-center align-items-center">
            <button 
                type="button"  
                className="btn-cookie btn-sm"
                onClick={this.onIncrease}
                >
                <i className="fas fa-cookie"></i>
            </button>

            <button type="button"
                    className="btn-trash btn-sm "
                    onClick={onDelete}
                    >
                <i className="fas fa-trash"></i>
            </button>
            <i className="fas fa-star"></i>
        </div>

    </li>
  )
 }

 
 


} 

export default EmployersListItem;
