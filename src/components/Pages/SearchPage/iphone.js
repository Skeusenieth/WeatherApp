import { h, render, Component } from 'preact';

import Button from '../../button';
import style from '../../iphone/style';
import style_iphone from '../../button/style_iphone';
import locations from '../../../assets/locations.json';

export default class IphoneSearchPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            input: "",
            suggestions: locations,
            location_callback: props.locationCallback,
            name_callback: props.nameCallback
        };
    }

    inputChange(e){
        e.preventDefault();
        this.setState(
            {
                input: e.target.value,
                suggestions: locations.filter( (country) => {
                    return country["name"].toLowerCase().match(e.target.value.toLowerCase());
                })
            }
        );
    }
	render(){
	console.log(this.props.onAdvance);
	return (
		<div>
			<div class={ style.header }>
				<div class={ style.appTitle }>Search</div>
			</div>
            <div>
                <input type="text" onInput={this.inputChange.bind(this)} value={this.state.input}/>
                <Button class={ style_iphone.button } clickFunction={()=>{this.state.name_callback(this.state.input)}} Text="Display weather"/>
                <ol class={style.suggestionsList}>
                    {
                        this.state.suggestions.map((item, idx) => {
                            if (idx > 20){
                                return null;
                            }
                            const text = item["name"] + "(" + item["country"] + ")";
                            return (<li key={item["id"]}><button onClick={()=>{this.state.location_callback(item)}}>{text}</button></li>);
                        })
                    }
                </ol>
            </div>
			<div class= { style_iphone.container }>
			</div>
		</div>
	);
	}
}