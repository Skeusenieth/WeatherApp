import { h, render, Component } from 'preact';

import Button from '../../button';
import style from '../../ipad/style';
import style_ipad from '../../button/style_ipad';

export default class ipadLandingPage extends Component{
	render(){
	console.log(this.props.onAdvance);
	return (
		<div>
			<div class={ style.header }>
				<div class={ style.appTitle }>Commute Weather</div>
			</div>
			<div class= { style_ipad.container }>
				<Button class={ style_ipad.button } clickFunction={this.props.onAdvance} Text="Display weather here"/>
			</div>
		</div>
	);
	}
}