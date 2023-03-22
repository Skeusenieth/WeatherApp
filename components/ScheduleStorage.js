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

    static getRepeatAsText(repeats){
        if (repeats[ScheduleStorage.REPEATS.MON] && repeats[ScheduleStorage.REPEATS.TUE] && repeats[ScheduleStorage.REPEATS.WED]
            && repeats[ScheduleStorage.REPEATS.THU] && repeats[ScheduleStorage.REPEATS.FRI]){
            if (repeats[ScheduleStorage.REPEATS.SAT] && repeats[ScheduleStorage.REPEATS.SUN]){
                return "Every day";
            }
            else{
                return "Weekdays";
            }
        }
        else if (repeats[ScheduleStorage.REPEATS.SAT] && repeats[ScheduleStorage.REPEATS.SUN]){
            return "Weekends";
        }
        else{
            let repeatsText = "";
            let hasRepeat = false;
            if (repeats[ScheduleStorage.REPEATS.MON]){
                repeatsText += "Mon, ";
                hasRepeat = true;
            }
            if (repeats[ScheduleStorage.REPEATS.TUE]){
                repeatsText += "Tue, ";
                hasRepeat = true;
            }
            if (repeats[ScheduleStorage.REPEATS.WED]){
                repeatsText += "Wed, ";
                hasRepeat = true;
            }
            if (repeats[ScheduleStorage.REPEATS.THU]){
                repeatsText += "Thu, ";
                hasRepeat = true;
            }
            if (repeats[ScheduleStorage.REPEATS.FRI]){
                repeatsText += "Fri, ";
                hasRepeat = true;
            }
            if (repeats[ScheduleStorage.REPEATS.SAT]){
                repeatsText += "Sat, ";
                hasRepeat = true;
            }
            if (repeats[ScheduleStorage.REPEATS.SUN]){
                repeatsText += "Sun, ";
                hasRepeat = true;
            }
            if (hasRepeat){
                repeatsText = repeatsText.substring(0, repeatsText.length - 2);
            }
            else{
                return "Does not repeat";
            }
        }
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