// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import the Button component
import Button from '../button';
import NavButton from '../NavButton';
import NavButtonStyle from '../NavButton/style';
import IphoneLandingPage from '../Pages/LandingPage/iphone.js';
import IphoneWeatherPage from '../Pages/WeatherPage/iphone.js';
import IphoneSearchPage from '../Pages/SearchPage/iphone.js';
import IphoneSchedulesPage from '../Pages/SchedulesPage/iphone.js';
import IphoneSchedulePage from '../Pages/SchedulePage/iphone.js';
import IphoneNewSchedulePage from '../Pages/NewSchedulePage/iphone.js';
import IphoneSettingsPage from '../Pages/SettingsPage/iphone.js';

import preactLocalStorage from 'preact-localstorage';

export default class Iphone extends Component {

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

	setPageContent(newContent){
		this.setState({pageContent: newContent});
	}

	goToHomePage(){
		this.setPageContent(<IphoneLandingPage onAdvance={this.goToLondonWeatherPage.bind(this)}/>);
	}
	goToLondonWeatherPage(){
		this.setPageContent(<IphoneWeatherPage LOCID="2643743"/>);
	}
	goToSearchPage(){
		this.setPageContent(<IphoneSearchPage locationCallback={this.locationCallback.bind(this)} nameCallback={this.nameCallback.bind(this)}/>);
	}
	locationCallback(location){
		this.setPageContent(<IphoneWeatherPage LOCID={location["id"]}/>);
	}
	nameCallback(name){
		this.setPageContent(<IphoneWeatherPage LOCNAME={name}/>);
	}
	goToSchedulesPage(){
		this.setPageContent(<IphoneSchedulesPage onNewSchedule={this.goToNewSchedulePage.bind(this)} onSelectSchedule={this.goToSchedulePage.bind(this)}/>);
	}
	goToNewSchedulePage(){
		this.setPageContent(<IphoneNewSchedulePage defaultTitle="New Schedule" onCancel={this.goToHomePage.bind(this)} onSave={this.goToHomePage.bind(this)}/>);
	}
	goToSchedulePage(schedule){
		this.setPageContent(<IphoneSchedulePage schedule={schedule}/>);
	}
	goToSettingsPage(){
		this.setPageContent(<IphoneSettingsPage/>);
	}

	// the main render method for the iphone component
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
					<li><Button class={style_iphone.button} Text="Home" clickFunction={this.goToHomePage.bind(this)}/></li>
					<li><Button class={style_iphone.button} Text="Schedules" clickFunction={this.goToSchedulesPage.bind(this)}/></li>
					<li><Button class={style_iphone.button} Text="Search" clickFunction={this.goToSearchPage.bind(this)}/></li>
					<li><Button class={style_iphone.button} Text="Settings" clickFunction={this.goToSettingsPage.bind(this)}/></li>
				</ol>
			</div>
		);
	}
}
