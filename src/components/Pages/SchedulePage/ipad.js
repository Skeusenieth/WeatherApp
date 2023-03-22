import { h, render, Component } from 'preact';
import Button from '../../button';
import style from '../../ipad/style';
import style_ipad from '../../button/style_ipad';
import preactLocalStorage from 'preact-localstorage';


export default class ipadSchedulePage extends Component{
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
                <Button class={ style_ipad.button } clickFunction={()=>{this.state.newScheduleCallback()}} Text="+"/>
            </div>
			<div class= { style_ipad.container }>
			</div>
		</div>
	    );
	}
}