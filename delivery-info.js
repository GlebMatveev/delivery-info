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
    }
}