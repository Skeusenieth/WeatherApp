import { h, render, Component } from 'preact';
import Button from '../../button';
import style from '../../iphone/style';
import style_iphone from '../../button/style_iphone';
import ScheduleStorage from '../../ScheduleStorage.js';


export default class IphoneSchedulePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            schedule: props.schedule,
			locationCallback: props.onLocation
        };
    }

	render(){
//		<Button class={ style_iphone.button } clickFunction={()=>{this.state.newScheduleCallback()}} Text="+"/>
		const repeatsText = "Repeats: " + ScheduleStorage.getRepeatAsText(this.state.schedule.repeat);
	    return (
		<div>
			<div class={ style.header }>
				<h2 class={ style.appTitle }>{this.state["schedule"]["title"]}</h2>
			</div>
			<div class={style.details}>
                <h2>{repeatsText}</h2>
            </div>
			<div class= { style_iphone.container }>
				<ol class={style.scrollable}>
					{
						this.state.schedule.entries.map((entry, idx)=>{
							const location = entry.location.name + " (" + entry.location.country + ")";
							const time = ((entry.hour < 10) ? "0" + entry.hour : entry.hour) + ":" + ((entry.minute < 10) ? "0" + entry.minute : entry.minute);
							return <button onClick={()=>{this.state.locationCallback(entry.location)}}>
								<div>{location + " at " + time}</div>
							</button>
						})
					}
				</ol>
			</div>
		</div>
	    );
	}
}