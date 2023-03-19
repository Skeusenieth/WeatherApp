// import jquery for API calls
import $ from 'jquery';
import APPID from '../assets/APPID.json';

export default function translateNameToLocation(name, on_success, on_error){
    // API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/find?q="+name+"&units=metric&APPID="+APPID;
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : on_success,
            error : on_error
        })
}