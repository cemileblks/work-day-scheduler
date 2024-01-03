let currentDay = $('#currentDay');
let saveBtn = $('.saveBtn');
let clearBtn = $('#clearLocalStorage')
let timeBlockContainer = $('.container');
let currentHour = parseInt(dayjs().format('H'));
let hourDescriptions = JSON.parse(localStorage.getItem('hourDescriptions')) || {};
console
currentDay.text(dayjs().format('dddd, MMMM DD'));

$('.time-block').each(function(){
    let timeBlock = parseInt($(this).attr('id').match(/\d+/)[0]);

    if (timeBlock === currentHour) {
        $(this).addClass("present");
    } else if (timeBlock > currentHour) {
        $(this).addClass("future");
    }
});

// to save the data to local storage on save button click
saveBtn.on("click",function(event) {

    let timeBlock = $(event.target).closest('.time-block');
    let timeBlockId = timeBlock.attr('id');

    let textContent = timeBlock.find('.description').val();

    hourDescriptions[timeBlockId] = textContent;

    localStorage.setItem('hourDescriptions', JSON.stringify(hourDescriptions));

    //message for when user saved their todo items
    const savedMessage = $('<div class="alert alert-success text-center mb-1 p-1 small" role="alert">');
    savedMessage.text("Appointment added to Local-Storage");
  
    timeBlockContainer.prepend(savedMessage);
  
    // Remove the message after 1 second
    setTimeout(function () {
      savedMessage.fadeOut(500, function () {
        $(this).remove();
      });
    }, 1000);
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
        $(this).find('.description').val(descriptionOfTimeBlock);
      }
    }
  });

  //Clear local storage for next day
  clearBtn.on("click", function() {
    localStorage.clear();
    hourDescriptions = {};
    $('.time-block .description').val('');
  })
