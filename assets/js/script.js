let currentDay = $('#currentDay');
let saveBtn = $('.saveBtn');
let currentHour = parseInt(dayjs().format('H'));
let hourDescriptions = JSON.parse(localStorage.getItem('hourDescriptions')) || {};


currentDay.text(dayjs().format('dddd, MMMM DD'));

console.log (currentHour);


$('.time-block').each(function(){
    let timeBlock = parseInt($(this).attr('id').match(/\d+/)[0]);
    console.log(timeBlock);

    if (timeBlock === currentHour) {
        console.log(true);
        $(this).addClass("present");
    } else if (timeBlock > currentHour) {
        $(this).addClass("future");
    }
});

// to save the data to local storage on save button click
saveBtn.on("click",function(event) {
    // console.log(event);
    let timeBlock = $(event.target).closest('.time-block');
    // console.log(timeBlock);
    let timeBlockId = timeBlock.attr('id');
    // console.log(timeBlockId);

    let textContent = timeBlock.find('.description').val();
    console.log(textContent);

    hourDescriptions[timeBlockId] = textContent;
    console.log(hourDescriptions);

    localStorage.setItem('hourDescriptions', JSON.stringify(hourDescriptions));
});


// to load data from local storage when page loads
$('.time-block').each(function () {
    let timeBlockId = $(this).attr('id');
    let savedContent = localStorage.getItem('hourDescriptions');

    if (savedContent !== null) {
      // to get the original object
      hourDescriptions = JSON.parse(savedContent);
      // update the text area with saved content
      let descriptionOfTimeBlock = hourDescriptions[timeBlockId];

      if (descriptionOfTimeBlock !== undefined) {
        console.log(this);
        $(this).find('.description').val(descriptionOfTimeBlock);
      }
    }
  });
