import { h, render, Component } from 'preact';

import Button from '../../button';
import style from '../../iphone/style';
import style_iphone from '../../button/style_iphone';

export default class IphoneLandingPage extends Component{
	render(){
	console.log(this.props.onAdvance);
	return (
		<div>
			<div class={ style.header }>
				<div class={ style.appTitle }>Commute Weather</div>
			</div>
			<div class= { style_iphone.container }>
				<Button class={ style_iphone.button } clickFunction={this.props.onAdvance} Text="Display weather here"/>
			</div>
		</div>
	);
	}
}