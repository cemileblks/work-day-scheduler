let currentDay = $('#currentDay');
let saveBtn = $('.saveBtn');
let currentHour = "hour-" + dayjs().format('H');



currentDay.text(dayjs().format('dddd, MMMM DD'));

console.log (currentHour);


$('.time-block').each(function(){
    let timeBlock = $(this).attr('id');
    console.log(timeBlock);

    if (timeBlock === currentHour) {
        console.log(true);
        $(this).addClass("present");
    } else if (timeBlock > currentHour) {
        $(this).addClass("future");
    }
});