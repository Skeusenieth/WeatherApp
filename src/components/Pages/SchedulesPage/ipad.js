import { h, render, Component } from 'preact';
import Button from '../../button';
import style from '../../ipad/style';
import style_ipad from '../../button/style_ipad';
import preactLocalStorage from 'preact-localstorage';


export default class ipadSchedulesPage extends Component{
    constructor(props){
        super(props);
        const schedules = preactLocalStorage.get("schedules");
        this.state = {
            schedules: schedules === undefined ? [] : JSON.parse(schedules),
            newScheduleCallback: props.onNewSchedule,
            selectScheduleCallback: props.onSelectSchedule
        };
    }

	render(){
	    return (
		<div>
			<div class={ style.header }>
				<div class={ style.appTitle }>Schedules</div>
			</div>
            <div>
                <Button class={ style_ipad.button } clickFunction={()=>{this.state.newScheduleCallback()}} Text="Add new schedule"/>
                <ol class={style.suggestionsList}>
                    {
                        this.state.schedules.map((item, idx) => {
                            const text = item["title"];
                            return (
                            <li key={idx}>
                                <button onClick={()=>{this.state.selectScheduleCallback(item)}}>
                                    <div>
                                        <h1>{text}</h1>
                                        {
                                        item.entries.map((item, idx) =>{
                                            let info = item.location["name"] + " (" + item.location["country"] + ") at ";
                                            if (item["hour"] == 0) info += "00";
                                            else info += item["hour"];
                                            info += ":";
                                            if (item["minute"] == 0) info += "00";
                                            else info += item["minute"];

                                            return <p>{info}</p>
                                        })
                                        }
                                    </div>
                                </button>
                            </li>);
                        })
                    }
                </ol>
            </div>
			<div class= { style_ipad.container }>
			</div>
		</div>
	    );
	}
}