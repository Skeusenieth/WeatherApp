import { h, render, Component } from 'preact';
import Button from '../../button';
import style from '../../iphone/style';
import style_iphone from '../../button/style_iphone';
import SettingsStorage from '../../SettingsStorage.js';


export default class IphoneSettingsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            store: new SettingsStorage()
        };
    }

    tempUnitChange(event){
        this.state["store"].setTempUnits(event.target.value);
    }

	render(){
        const tempUnits = this.state["store"].TEMP_UNITS;
        const temperatureOptions = {
            "Kelvin": tempUnits.Kelvin,
            "Fahrenheit": tempUnits.Fahrenheit,
            "Celsius": tempUnits.Celsius
        };
        const selectedTempUnits = this.state["store"].getTempUnits();
	    return (
		<div>
			<div class={ style.header }>
				<div class={ style.appTitle }>Settings</div>
			</div>
            <div>
                <label for="temperature-unit">Temperature Units: </label>
                <select name="temperature-unit" id="temperature-unit" onChange={this.tempUnitChange.bind(this)}>
                    {
                        Object.keys(temperatureOptions).map((unitName, idx) => {
                            console.log(unitName);
                            if (temperatureOptions[unitName] === selectedTempUnits)
                                return <option value={temperatureOptions[unitName]} selected>{unitName}</option>
                            else
                                return <option value={temperatureOptions[unitName]}>{unitName}</option>
                        })
                    }
                </select>
            </div>
			<div class= { style_iphone.container }>
			</div>
		</div>
	    );
	}
}