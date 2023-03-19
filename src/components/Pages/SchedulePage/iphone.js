import { h, render, Component } from 'preact';
import Button from '../../button';
import style from '../../iphone/style';
import style_iphone from '../../button/style_iphone';
import preactLocalStorage from 'preact-localstorage';


export default class IphoneSchedulePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            schedule: props.schedule
        };
    }

	render(){
	    return (
		<div>
			<div class={ style.header }>
				<div class={ style.appTitle }>{this.state["schedule"]["title"]}</div>
			</div>
            <div>
                <Button class={ style_iphone.button } clickFunction={()=>{this.state.newScheduleCallback()}} Text="+"/>
            </div>
			<div class= { style_iphone.container }>
			</div>
		</div>
	    );
	}
}