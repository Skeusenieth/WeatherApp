// import preact 
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_ipad from '../button/style_ipad';
// import jquery for API calls
import $ from 'jquery';
// import the Button component

import NavButton from '../NavButton';
import NavButtonStyle from '../NavButton/style';
import ipadLandingPage from '../Pages/LandingPage/ipad.js';
import ipadWeatherPage from '../Pages/WeatherPage/ipad.js';
import ipadSearchPage from '../Pages/SearchPage/ipad.js';
import ipadSchedulesPage from '../Pages/SchedulesPage/ipad.js';
import ipadSchedulePage from '../Pages/SchedulePage/ipad.js';
import ipadNewSchedulePage from '../Pages/NewSchedulePage/ipad.js';
import ipadSettingsPage from '../Pages/SettingsPage/ipad.js';

import preactLocalStorage from 'preact-localstorage';

export default class Ipad extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState(
			{
				display: true,
				pageContent: <ipadLandingPage onAdvance={this.goToLondonWeatherPage.bind(this)}/>
			}
		);
	}

	setPageContent(newContent){
		this.setState({pageContent: newContent});
	}

	goToHomePage(){
		this.setPageContent(<ipadLandingPage onAdvance={this.goToLondonWeatherPage.bind(this)}/>);
	}
	goToLondonWeatherPage(){
		this.setPageContent(<ipadWeatherPage LOCID="2643743"/>);
	}
	goToSearchPage(){
		this.setPageContent(<ipadSearchPage locationCallback={this.locationCallback.bind(this)} nameCallback={this.nameCallback.bind(this)}/>);
	}
	locationCallback(location){
		this.setPageContent(<ipadWeatherPage LOCID={location["id"]}/>);
	}
	nameCallback(name){
		this.setPageContent(<ipadWeatherPage LOCNAME={name}/>);
	}
	goToSchedulesPage(){
		this.setPageContent(<ipadSchedulesPage onNewSchedule={this.goToNewSchedulePage.bind(this)} onSelectSchedule={this.goToSchedulePage.bind(this)}/>);
	}
	goToNewSchedulePage(){
		this.setPageContent(<ipadNewSchedulePage defaultTitle="New Schedule" onCancel={this.goToHomePage.bind(this)} onSave={this.goToHomePage.bind(this)}/>);
	}
	goToSchedulePage(schedule){
		this.setPageContent(<ipadSchedulePage schedule={schedule}/>);
	}
	goToSettingsPage(){
		this.setPageContent(<ipadSettingsPage/>);
	}

	// the main render method for the ipad component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
//		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div>
					{ this.state.pageContent }
				</div>
				<ol class={style.bottomNavbar}>
					<li><Button class={style_ipad.button} Text="Home" clickFunction={this.goToHomePage.bind(this)}/></li>
					<li><Button class={style_ipad.button} Text="Schedules" clickFunction={this.goToSchedulesPage.bind(this)}/></li>
					<li><Button class={style_ipad.button} Text="Search" clickFunction={this.goToSearchPage.bind(this)}/></li>
					<li><Button class={style_ipad.button} Text="Settings" clickFunction={this.goToSettingsPage.bind(this)}/></li>
				</ol>
			</div>
		);
	}
}
