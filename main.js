$(document).ready(function(){
    // Array to hold results
    let elementalNames = []; 

    // GET json
    $.getJSON("data.json", function(data){
        elementalNames = data;
    })

    $("#searchMain").on("input", function(){
        let mainSearch = $(this).val().toLowerCase();
        let searchResult = elementalNames.filter(item => item.name.toLowerCase().includes(mainSearch))

        showResults(searchResult); 
    })

    function showResults(results){
        let resultsList = $("#searchResults"); 
        resultsList.empty();

        if(results.length > 0 ){
            results.forEach(item => {
                resultsList.append(`<li>${item.name}</li>`);
            })
            resultsList.show();
        }
        else{
            resultsList.hide()
        }
    }
    // keyboard nav 
    $("#searchMain").on("keydown", function(keyboard){
        let results = $("#searchResults li");
        let selectedResult = results.filter(".selectedResult");

        if(keyboard.key === "ArrowDown"){
            keyboard.preventDefault();
            if(selectedResult.length === 0){
                results.first().addClass("selectedResult")
            }
            else if (selectedResult.next().length > 0){
                selectedResult.removeClass("selectedResult").next().addClass("selectedResult")
            }
        }
        else if(keyboard.key === "ArrowUp"){
            keyboard.preventDefault();
            if(selectedResult.length === 0){
                results.last().addClass("selectedResult")
            }
            else if (selectedResult.prev().length > 0){
                selectedResult.removeClass("selectedResult").prev().addClass("selectedResult")
            }
        }
        else if(keyboard.key === "Enter"){
            if(selectedResult.length > 0){
                $(this).val(selectedResult.text());
                $("#searchResults").hide();
            }
        }
    });

    // click function
    $(document).on("click", "#searchResults li", function() {
        $("#searchMain").val($(this).text());
        $("#searchResults").hide();
    });

    // close results when clicking outside the results tab
    $(document).on("click", function(close){
        if(!$(close.target).closest("#searchMain", "#searchResults").length){
            $("#searchResults").hide();
        }
    })

})