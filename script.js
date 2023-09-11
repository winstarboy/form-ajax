$('#reserve-btn').click(function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the input values
    const locations = $('input[type="text"]').val();
    const seats = $('input[type="number"]').val();
  
    // Disable the button and add spinner animation
    $(this).prop('disabled', true).html('<span class="spinner"></span>Reserving...');
  
    // Create the AJAX request
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      type: 'GET',
      contentType: 'application/json',
      data: JSON.stringify({ locations: locations, seats: seats }),
      success: function(response) {
        // Handle the successful response
        console.log('Response:', response);
        
        // Check if seats input and response are equal
        if (seats === response.seats) {
          console.log('Seats input and response are equal');
        } else {
          // Throw validation error under the seats input box
          $('input[type="number"]').after('<span class="error">Seats input and response are not equal</span>');
        }
        
        // Enable the button and restore the original text
        $('#reserve-btn').prop('disabled', false).html('Reserve');
      },
      error: function(xhr, status, error) {
        // Handle the error
        console.error('Error:', error);
        
        // Enable the button and restore the original text
        $('#reserve-btn').prop('disabled', false).html('Reserve');
      }
    });
});
