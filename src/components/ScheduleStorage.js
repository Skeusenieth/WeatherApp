import preactLocalStorage from 'preact-localstorage';


export default class ScheduleStorage{
    static REPEATS = {
        MON: "M",
        TUE: "Tu",
        WED: "W",
        THU: "Th",
        FRI: "F",
        SAT: "Sa",
        SUN: "Su"
    }
    constructor(){
        const schedulesJSON = preactLocalStorage.get("schedules");
        this.state = {
            schedules: schedulesJSON === undefined ? [] : JSON.parse(schedulesJSON)
        };
    }
/*
    setSettings(settings){
        preactLocalStorage.setObject("settings", settings);
    }

    getSettings(){
        return this.state["settings"];
    }*/

    addSchedule(schedule){
        this.state["schedules"].push(schedule);
        preactLocalStorage.set("schedules", JSON.stringify(this.state["schedules"]));
    }

    getSchedules(){
        return this.state["schedules"];
    }
}