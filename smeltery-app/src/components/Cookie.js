import React,{Component} from 'react';
import Cookies from 'js-cookie';
export class Cookie extends Component{
    componentDidMount() {
        // Установка куки
        //Cookies.set('emloyeeId', '', { expires: 7 })
        //Cookies.set('emloyeeIsLogin', false, { expires: 7 })
      }
    render(){
            // Чтение куки
            const emloyeeId = Cookies.get('emloyeeId')
            return (
              <div>
                <ul>
                    <li>emloyeeId: {emloyeeId}</li>
                </ul>
              </div>
            );
    }
}