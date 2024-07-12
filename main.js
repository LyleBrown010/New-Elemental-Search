$(document).ready(function(){
    // Array to hold results
    let elementalNames = []; 

    // GET json
    $.getJSON("data.json", function(data){
        elementalNames = data;
    })

    $("#searchMain").on("input", function(){
        let mainSearch = $(this).val().toLowerCase(); // take value entered, turns to lowercase
        let searchResult = elementalNames.filter(item => item.name.toLowerCase().includes(mainSearch)) // filters through JSON "name" turns it lowercase and checks if it contains the val entered in search. 

        showResults(searchResult); // calls function
    })

    function showResults(results){
        let resultsList = $("#searchResults"); // targets results section, serves as the big section where results are displayed
        resultsList.empty(); // clears whatever data is stored in the "list" before executing function

        if(results.length > 0 ){ //not empty
            results.forEach(item => { //loops through each item in the array
                resultsList.append(`<li>${item.name}</li>`); //appends item result  
            })
            resultsList.show(); //shows results
        }
        else{
            resultsList.hide() // basically display none
        }
    }
    // keyboard nav 
    $("#searchMain").on("keydown", function(keyboard){
        let results = $("#searchResults li"); //gets lists items from search
        let selectedResult = results.filter(".selectedResult"); //filters through results to find the class 

        if(keyboard.key === "ArrowDown"){
            keyboard.preventDefault(); // prevent scrolling
            if(selectedResult.length === 0){ 
                results.first().addClass("selectedResult") //no item selected takes first item and adds a class
            }
            else if (selectedResult.next().length > 0){
                selectedResult.removeClass("selectedResult").next().addClass("selectedResult") // removes class from first selected item and adds it to the next
            }
        }
        else if(keyboard.key === "ArrowUp"){
            keyboard.preventDefault(); //prevent scrolling
            if(selectedResult.length === 0){
                results.last().addClass("selectedResult") //none selected, takes first item
            }
            else if (selectedResult.prev().length > 0){
                selectedResult.removeClass("selectedResult").prev().addClass("selectedResult") //something selected, removes class from first selected, adds class to previous item
            }
        }
        else if(keyboard.key === "Enter"){ //enter key is pressed
            if(selectedResult.length > 0){
                $(this).val(selectedResult.text()); // whatever li its on gets added to search bar, through the given class
                $("#searchResults").hide(); // hides the results, basically a display none
            }
        }
    });

    // click function
    $(document).on("click", "#searchResults li", function() { //clicked on list item, runs similar to enter key
        $("#searchMain").val($(this).text()); //targets search, adds selected value to it
        $("#searchResults").hide();
    });

    // close results when clicking outside the results tab
    $(document).on("click", function(close){ //attach to doc so that function executes on whole doc, not one sectionnn
        if(!$(close.target).closest("#searchMain", "#searchResults").length){
            $("#searchResults").hide();
        }
    })

})