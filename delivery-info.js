function ccStartScript () {
    let ccDeliveryInterval = document.getElementsByName('ORDER_PROP_24')[0];
	let ccDeliveryReplacement = document.getElementsByName('ORDER_PROP_25')[0];
	let ccDeliveryCalendar = document.getElementsByName('ORDER_PROP_26')[0];

    if (ccDeliveryInterval != undefined && ccDeliveryReplacement != undefined && ccDeliveryCalendar != undefined) {
        console.log("good");
    }
}