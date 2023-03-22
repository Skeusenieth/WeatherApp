import preactLocalStorage from 'preact-localstorage';


export default class SettingsStorage{
    constructor(){
        const settings = preactLocalStorage.getObject("settings");
        this.state = {
            settings: settings === {} ? {tempUnits: "C"} : settings
        };
        this.TEMP_UNITS = {
            Fahrenheit: "F",
            Celsius: "C",
            Kelvin: "K"
        };
    }
/*
    setSettings(settings){
        preactLocalStorage.setObject("settings", settings);
    }

    getSettings(){
        return this.state["settings"];
    }*/

    setTempUnits(unit){
        if (Object.values(this.TEMP_UNITS).indexOf(unit) < 0){
            return false;
        }
        this.state["settings"]["tempUnits"] = unit;
        console.log(this.state["settings"]);
        preactLocalStorage.setObject("settings", this.state["settings"]);
        return true;
    }

    getTempUnits(){
        return this.state["settings"]["tempUnits"];
    }
}