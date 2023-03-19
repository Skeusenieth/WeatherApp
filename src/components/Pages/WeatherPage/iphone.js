// import preact
import { h, render, Component } from 'preact';
// import jquery for API calls
import $ from 'jquery';

import Button from '../../button';
import style from '../../iphone/style';
import style_iphone from '../../button/style_iphone';

import APPID from '../../../assets/APPID.json';

import SettingsStorage from '../../SettingsStorage.js';

import nameToLocation from '../../translateNameToLocation.js';


export default class IphoneWeatherPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			settingsStore: new SettingsStorage(),
			serverResponseFailed: false
		};
		if (props.LOCNAME){
			nameToLocation(props.LOCNAME, this.lookupResponse.bind(this), this.serverFailed.bind(this));
		}
		else{
			this.state.loc_id = props.LOCID;
		}
		if (this.state.loc_id){
			this.fetchWeatherData();
		}
	}

	lookupResponse(parsed_json){
		this.state.loc_id = parsed_json["list"][0]["id"];
		this.fetchWeatherData();
	}

	fetchWeatherData() {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?id="+this.state.loc_id+"&units=metric&APPID="+APPID;
/*		this.setState({
			weather:{
				"locate": "London",
				"temp": "27",
				"min_temp": "24",
				"max_temp": "29",
				"cond": "Dry"
			},
			serverResponse:{
				failed: false
			}
		});*/
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse.bind(this),
			error : this.serverFailed.bind(this)
		})
	}

	serverFailed = (req, err) => {
		this.setState({serverResponseFailed:true});
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var min_temp_c = parsed_json['main']['temp_min'];
		var max_temp_c = parsed_json['main']['temp_max'];
		var conditions = parsed_json['weather']['0']['description'];
		var humidity = parsed_json['weather']['0']['description'];

		const targetUnit = this.state["settingsStore"].getTempUnits();
		// set states for fields so they could be rendered later on
		this.setState({
			weather:{
				"locate": location,
				"temp": Math.round(this.translateTempToUnits(temp_c, targetUnit)),
				"min_temp": Math.round(this.translateTempToUnits(min_temp_c, targetUnit)),
				"max_temp": Math.round(this.translateTempToUnits(max_temp_c, targetUnit)),
				"cond": conditions
			}
		});
	}

	translateTempToUnits(temp_c, target){
		if (target === this.state["settingsStore"].TEMP_UNITS.Kelvin){
			return temp_c + 273.15;
		}
		else if (target === this.state["settingsStore"].TEMP_UNITS.Fahrenheit){
			return (temp_c * 9 / 5) + 32;
		}
		return temp_c;
	}

	render(){
		const targetUnit = this.state["settingsStore"].getTempUnits();
		let unitsStyle = style.kelvin;
		if (targetUnit === this.state["settingsStore"].TEMP_UNITS.Celsius){
			unitsStyle = style.celsius;
		}
		else if (targetUnit === this.state["settingsStore"].TEMP_UNITS.Fahrenheit){
			unitsStyle = style.fahrenheit;
		}
		console.log(unitsStyle);
		const tempStyles = `${style.temperature} ${style.filled} ${unitsStyle}`;
		console.log(tempStyles);
		return (this.state.weather ?
			<div>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.weather.locate }</div>
				</div>
				<div class={ style.details }>
					<div class={ style.conditions }>{ this.state.weather.cond }</div>
					<table class={ style.tempsTable }>
						<tr>
							<th>Minimum (today)</th>
							<th>Current (today)</th>
							<th>Maximum (today)</th>
						</tr>
						<tr>
							<td class={tempStyles}>{ this.state.weather.min_temp }</td>
							<td class={tempStyles}>{ this.state.weather.temp }</td>
							<td class={tempStyles}>{ this.state.weather.max_temp }</td>
						</tr>
					</table>
				</div>
				<div class={ style_iphone.container }>
				</div>
			</div> : this.state["serverResponseFailed"] ?  <p>COULD NOT RETREIVE WEATHER DATA</p> : <p>Fetching data...</p>);
	}
}