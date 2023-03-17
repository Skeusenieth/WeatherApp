// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import NavButton from '../NavButton';
import NavButtonStyle from '../NavButton/style';
import APPID from '../../assets/APPID.json';


function IphoneLandingPage(props){
	console.log(props.onAdvance);
	return (
		<div>
			<div class={ style.header }>
				<div class={ style.appTitle }>Commute Weather</div>
			</div>
			<div class= { style_iphone.container }>
				<Button class={ style_iphone.button } clickFunction={props.onAdvance} Text="Display weather"/>
			</div>
		</div>
	);
}



class IphoneWeatherPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			loc_id: props.LOCID,
			serverResponse:{
				failed: false
			}
		};
		this.fetchWeatherData();
	}

	fetchWeatherData() {
		console.log("FETCHED WEATHER DATA!");
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
		// once the data grabbed, hide the button
//		this.setState({ display: false });
	}

	serverFailed = (req, err) => {
		this.setState({serverResponse:{failed:true}});
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var min_temp_c = parsed_json['main']['temp_min'];
		var max_temp_c = parsed_json['main']['temp_max'];
		var conditions = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			weather:{
				"locate": location,
				"temp": temp_c,
				"min_temp": min_temp_c,
				"max_temp": max_temp_c,
				"cond": conditions
			}
		});
	}

	render(){
		const tempStyles = `${style.temperature} ${style.filled}`;
		return this.state.weather ? (
			<div>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.weather.locate }</div>
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
				<div class={ style.details }></div>
				<div class={ style_iphone.container }>
					<Button class={ style_iphone.button } clickFunction={ null } Text="Display schedules"/>
				</div>
			</div>) : this.state.serverResponse.failed ?  <p>COULD NOT RETREIVE WEATHER DATA</p> : <p>Fetching data...</p>;
	}
}
/*
function IphoneWeatherPage(props){
	const tempStyles = `${style.temperature} ${style.filled}`;
	return (<div>
		<div class={ style.header }>
			<div class={ style.city }>{ props.weather.locate }</div>
			<div class={ style.conditions }>{ props.weather.cond }</div>
				<table class={ style.tempsTable }>
					<tr>
						<th>Minimum (today)</th>
						<th>Current (today)</th>
						<th>Maximum (today)</th>
					</tr>
					<tr>
						<td class={tempStyles}>{ props.weather.min_temp }</td>
						<td class={tempStyles}>{ props.weather.temp }</td>
						<td class={tempStyles}>{ props.weather.max_temp }</td>
					</tr>
				</table>
		</div>
		<div class={ style.details }>
		</div>
		<div class={ style_iphone.container }>
			<Button class={ style_iphone.button } clickFunction={ null } Text="Display schedules"/>
		</div>
	</div>);
}*/

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState(
			{
				display: true,
				pageContent: <IphoneLandingPage onAdvance={this.goToLondonWeatherPage.bind(this)}/>
			}
		);
	}

	// a call to fetch weather data via wunderground
	/*fetchWeatherData() {
		console.log("FETCHED WEATHER DATA!");
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID="+APPID;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}*/

	goToHomePage(){
		this.setState({pageContent: <IphoneLandingPage onAdvance={this.goToLondonWeatherPage.bind(this)}/>});
	}
	goToLondonWeatherPage(){
		this.setState({pageContent: <IphoneWeatherPage LOCID="2643743"/>});
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
//		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				{ this.state.pageContent }
				<ol class={style.bottomNavbar}>
					<li><Button class={style_iphone.button} Text="Home" clickFunction={this.goToHomePage.bind(this)}/></li>
					<li><Button class={style_iphone.button} Text="Schedules"/></li>
					<li><Button class={style_iphone.button} Text="Search"/></li>
					<li><Button class={style_iphone.button} Text="Settings"/></li>
				</ol>
			</div>
		);
	}

	/*
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var min_temp_c = parsed_json['main']['temp_min'];
		var max_temp_c = parsed_json['main']['temp_max'];
		var conditions = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			weather:{
				"locate": location,
				"temp": temp_c,
				"min_temp": min_temp_c,
				"max_temp": max_temp_c,
				"cond": conditions
			}
		});
	}*/
}
