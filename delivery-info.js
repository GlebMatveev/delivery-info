// All select parameters are pre-created in Bitrix backend.
// The script only hides unnecessary parameters "on the fly" in frontend.

function ccStartScript () {

    // getting elements on page:
	
    // <select> of time interval
    let ccDeliveryInterval = document.getElementsByName('ORDER_PROP_24')[0];
    // <select> of replacement field
    let ccDeliveryReplacement = document.getElementsByName('ORDER_PROP_25')[0];
    // <input> of datetime picker
    let ccDeliveryCalendar = document.getElementsByName('ORDER_PROP_26')[0];


    // if elements exist in DOM
    if (ccDeliveryInterval != undefined && ccDeliveryReplacement != undefined && ccDeliveryCalendar != undefined) {
        
        // clearing the date and setting readonly
        ccDeliveryCalendar.innerHTML = '';
        ccDeliveryCalendar.setAttribute("readonly", "");

        // opening datetime picker when click on field
        ccDeliveryCalendar.addEventListener('click', function () {
            let ccElement = document.getElementsByClassName('input-group-addon')[0];
            ccElement.click();
        });

        // setting cursor style
        const ccCss = '#soa-property-26:hover { cursor: pointer; }';
        let ccStyle = document.createElement('style');

        if (ccStyle.styleSheet) {
            ccStyle.styleSheet.cssText = ccCss;
        } else {
            ccStyle.appendChild(document.createTextNode(ccCss));
        }

        ccDeliveryCalendar.appendChild(ccStyle);


        // clearing the intervals
        ccDeliveryInterval.innerHTML = '';


        // clearing the replacement field
        ccDeliveryReplacement.innerHTML = '';

        // filling with new parameters
        // need to set empty field by default, but Bitrix does not allow you to do this
        ccDeliveryReplacement.options[0] = new Option("", "VAR0");
        ccDeliveryReplacement.options[1] = new Option("Связаться со мной. Заменить товар, если не отвечаю", "VAR1");
        ccDeliveryReplacement.options[2] = new Option("Связаться со мной. Удалить товар, если не отвечаю", "VAR2");
        ccDeliveryReplacement.options[3] = new Option("Не связываться со мной. Заменить товар.", "VAR3");
        ccDeliveryReplacement.options[4] = new Option("Не связываться со мной. Удалить товар", "VAR4");


        // listening for datetime picker field changes
        ccDeliveryCalendar.addEventListener('change', function () {

            // getting the time intervals
            let ccDeliveryInterval = document.getElementsByName('ORDER_PROP_24')[0];

            // clearing the intervals
            ccDeliveryInterval.innerHTML = '';

            // current hour
            Data = new Date();
            let ccHour = Data.getHours();
            let ccCurrentHour = parseInt(ccHour, 10);
            
            // getting the selected date and conversion
            // note: date with dots not working in safari
            let ccSelectedDate = ccDeliveryCalendar.value;
            let ccArr = ccSelectedDate.split('.'); 
            let ccArrReversed = ccArr.reverse();
            ccSelectedDate = ccArrReversed.join('/');

            let ccCalendarDate = new Date(ccSelectedDate);

            
            // reset the minutes of the current date and time for correct comparison
            ccCurrentDate = new Date();
            ccCurrentDate.setHours(0,0,0,0);

            // past, leave delivery intervals empty
            if (ccCalendarDate.getTime() < ccCurrentDate.getTime()) {
                console.log("прошлое, не выдаём временные интервалы доставки");
            };
            
            // the future and not today, filling all time intervals of delivery
            if (ccCalendarDate.getTime() > ccCurrentDate.getTime()) {
                console.log("будущее и не сегодня, выдаём все временные интервалы доставки");
                
                ccDeliveryInterval.options[0] = new Option("00:00 - 02:00", "TIME8");
                ccDeliveryInterval.options[1] = new Option("02:00 - 04:00", "TIME9");
                ccDeliveryInterval.options[2] = new Option("04:00 - 06:00", "TIME10");
                ccDeliveryInterval.options[3] = new Option("06:00 - 08:00", "TIME11");
                ccDeliveryInterval.options[4] = new Option("08:00 - 10:00", "TIME12");
                ccDeliveryInterval.options[5] = new Option("10:00 - 12:00", "TIME1");
                ccDeliveryInterval.options[6] = new Option("12:00 - 14:00", "TIME2");
                ccDeliveryInterval.options[7] = new Option("14:00 - 16:00", "TIME3");
                ccDeliveryInterval.options[8] = new Option("16:00 - 18:00", "TIME4");
                ccDeliveryInterval.options[9] = new Option("18:00 - 20:00", "TIME5");
                ccDeliveryInterval.options[10] = new Option("20:00 - 22:00", "TIME6");
                ccDeliveryInterval.options[11] = new Option("22:00 - 00:00", "TIME7");
            };
            
            // today, need to check for the current time
            if (ccCalendarDate.getTime() == ccCurrentDate.getTime()) {
                console.log("сегодняшний день, нужна проверка на текущее время");
                
                if ((ccCurrentHour >= 0) && (ccCurrentHour <= 8)) {
                    ccDeliveryInterval.options[0] = new Option("10:00 - 12:00", "TIME1");
                    ccDeliveryInterval.options[1] = new Option("12:00 - 14:00", "TIME2");
                    ccDeliveryInterval.options[2] = new Option("14:00 - 16:00", "TIME3");
                    ccDeliveryInterval.options[3] = new Option("16:00 - 18:00", "TIME4");
                    ccDeliveryInterval.options[4] = new Option("18:00 - 20:00", "TIME5");
                    ccDeliveryInterval.options[5] = new Option("20:00 - 22:00", "TIME6");
                    ccDeliveryInterval.options[6] = new Option("22:00 - 00:00", "TIME7");
                }
                if ((ccCurrentHour >= 9) && (ccCurrentHour <= 10)) {
                    ccDeliveryInterval.options[0] = new Option("12:00 - 14:00", "TIME2");
                    ccDeliveryInterval.options[1] = new Option("14:00 - 16:00", "TIME3");
                    ccDeliveryInterval.options[2] = new Option("16:00 - 18:00", "TIME4");
                    ccDeliveryInterval.options[3] = new Option("18:00 - 20:00", "TIME5");
                    ccDeliveryInterval.options[4] = new Option("20:00 - 22:00", "TIME6");
                    ccDeliveryInterval.options[5] = new Option("22:00 - 00:00", "TIME7");
                }
                if ((ccCurrentHour >= 11) && (ccCurrentHour <= 12)) {
                    ccDeliveryInterval.options[0] = new Option("14:00 - 16:00", "TIME3");
                    ccDeliveryInterval.options[1] = new Option("16:00 - 18:00", "TIME4");
                    ccDeliveryInterval.options[2] = new Option("18:00 - 20:00", "TIME5");
                    ccDeliveryInterval.options[3] = new Option("20:00 - 22:00", "TIME6");
                    ccDeliveryInterval.options[4] = new Option("22:00 - 00:00", "TIME7");
                }
                if ((ccCurrentHour >= 13) && (ccCurrentHour <= 14)) {
                    ccDeliveryInterval.options[0] = new Option("16:00 - 18:00", "TIME4");
                    ccDeliveryInterval.options[1] = new Option("18:00 - 20:00", "TIME5");
                    ccDeliveryInterval.options[2] = new Option("20:00 - 22:00", "TIME6");
                    ccDeliveryInterval.options[3] = new Option("22:00 - 00:00", "TIME7");
                }
                if ((ccCurrentHour >= 15) && (ccCurrentHour <= 16)) {
                    ccDeliveryInterval.options[0] = new Option("18:00 - 20:00", "TIME5");
                    ccDeliveryInterval.options[1] = new Option("20:00 - 22:00", "TIME6");
                    ccDeliveryInterval.options[2] = new Option("22:00 - 00:00", "TIME7");
                }
                if ((ccCurrentHour >= 17) && (ccCurrentHour <= 18)) {
                    ccDeliveryInterval.options[0] = new Option("20:00 - 22:00", "TIME6");
                    ccDeliveryInterval.options[1] = new Option("22:00 - 00:00", "TIME7");
                }
                if ((ccCurrentHour >= 19) && (ccCurrentHour <= 20)) {
                    ccDeliveryInterval.options[0] = new Option("22:00 - 00:00", "TIME7");
                }
                if ((ccCurrentHour >= 21) && (ccCurrentHour <= 23)) {
                    console.log("пустой список, нужно выбрать следующий день, т.к. доставить уже не успеют");
                }
            };
        });
        console.log("скрипт отработал");
    }
}