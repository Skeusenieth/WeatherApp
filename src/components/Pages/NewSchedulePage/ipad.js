import { h, render, Component } from 'preact';
import Button from '../../button';
import style from '../../ipad/style';
import style_ipad from '../../button/style_ipad';
import ScheduleStorage from '../../ScheduleStorage.js';
import ipadSearchPage from '../SearchPage/ipad.js';
import nameToLocation from '../../translateNameToLocation.js';


export default class ipadNewSchedulePage extends Component{
    constructor(props){
        super(props);
        let defaultRepeat = {};
        for (const value of Object.values(ScheduleStorage.REPEATS)){
            defaultRepeat[value] = false;
        }
        this.state = {
            schedule: {
                title: props.title,
                repeat: defaultRepeat,
                entries: []
            },
            cancelCallback: props.onCancel,
            saveCallback: props.onSave,
            scheduleStorage: new ScheduleStorage(),
        };
        this.setContentToEntryInfo();
    }

    addEntry(entry){
        this.state["schedule"]["entries"].push(entry);
    }

    scheduleNameChange(event){
        event.preventDefault();
        this.state["schedule"]["title"] = event.target.value;
    }

    saveSchedule(){
        this.state["scheduleStorage"].addSchedule(this.state["schedule"]);
        this.state["saveCallback"]();
    }

    changeEntryLocation(index){

    }
    changeEntryHour(index, event){

    }
    changeEntryMinute(index, event){

    }

    switchRepeat(day){
        this.state.schedule.repeat[day] = !this.state.schedule.repeat[day];
        this.setContentToEntryInfo();
    }

    addNewEntry(){
        this.setState({
            pageContent: <ipadSearchPage locationCallback={this.addNewEntryLocation.bind(this)} nameCallback={this.addNewEntryName.bind(this)}/>
        });
    }
    addNewEntryLocation(location){
        this.state["schedule"]["entries"].push({
            location: location,
            hour: 0,
            minute: 0
        });
        this.setContentToEntryInfo();
    }
    addNewEntryName(name){
        nameToLocation(name, this.parseLookupResponse.bind(this), this.lookupError.bind(this));
    }
    parseLookupResponse(parsed_json){
		this.addNewEntryLocation(parsed_json["list"][0]);
	}
    lookupError(){
        console.log("API ERROR!");
    }
    setContentToEntryInfo(){
        this.setState({pageContent: <div>
        <div class={ style.header }>
            <div class={ style.appTitle }>New Schedule</div>
        </div>
        <div>
            <label for="schedule-name">Schedule Name: </label>
            <input type="text" id="schedule-name" onInput={this.scheduleNameChange.bind(this)} value={this.state["schedule"]["title"]}></input>
            <div>
            {
                Object.keys(this.state.schedule.repeat).map((key, idx) => {
                    return <button class={(this.state.schedule.repeat[key]) ? style.repeat : style.norepeat} onClick={()=>this.switchRepeat(key)}>{key[0]}</button>;
                })
            }
            </div>
            <Button class={ style_ipad.button } clickFunction={()=>{this.addNewEntry()}} Text="Add new entry"/>
            <div>
            {
                this.state["schedule"]["entries"].map((entry, idx)=>{
                    return <div>
                        <Button class={style_ipad.button} clickFunction={()=>{this.changeEntryLocation(idx)}} Text={entry["location"]["name"]}/>
                        <select name="hour" id="hour" onChange={(event)=>{this.changeEntryHour(idx, event)}}>
                            <option value="0">00</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                        :
                        <select name="minute" id="minute" onChange={(event)=>{this.changeEntryHour(idx, event)}}>
                            <option value="0">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                    </div>;
                })
            }
            </div>
        </div>
        <div class= { style_ipad.container }>
            <Button class={style_ipad.button} clickFunction={this.state["cancelCallback"]} Text="Cancel"></Button>
            <Button class={style_ipad.button} clickFunction={this.saveSchedule.bind(this)} Text="Save"></Button>
        </div>
    </div>});
    }

	render(){
	    return this.state["pageContent"];
	}
}