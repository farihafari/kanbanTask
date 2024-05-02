$(document).ready(function () {
   
    // target add-item-btn
    $(".add-item-btn").on("click", function () {
        //  show save btn

        $(this).next('button').removeClass("hide");
        // hide add btn

        $(this).addClass("hide");
        // show input div

        let getparentInput = $(this).parent().next(".add-input");
        getparentInput.css("display", "block");

        // create label tag for title

        let labelTitle = document.createElement('label');
        labelTitle.classList.add("input-label");
        labelTitle.textContent = "Title";

        //   create label for description

        let labelDescription = document.createElement('label');
        labelDescription.classList.add("input-label");
        labelDescription.textContent = "Description";

        // create input tag

        let createInput = document.createElement("input");

        // // add type text

        createInput.setAttribute("type", "text");

        // // add class on input

        createInput.classList.add("add-title");

        // create text-area

        let textArea = document.createElement("textarea");
        textArea.classList.add("description");
        textArea.setAttribute("rows", 4);

        // view inputs add webpage

        getparentInput.append(labelTitle);
        getparentInput.append(createInput);
        getparentInput.append(labelDescription);
        getparentInput.append(textArea);



    });
    // for add list 
    $(".save-item-btn").on("click", function () {
        // get add input
        let getparentInput = $(this).parent().next(".add-input");
        // get  input

        let inputTag = $(this).parent().next(".add-input").children("input");

        // get data from input

        let inpuData = inputTag.val();

        // create text node for input

        let textIn = document.createTextNode(inpuData)

        // get textarea

        let textareatag = $(this).parent().next(".add-input").children("textarea");

        // get  textarea text

        let textareaData = textareatag.val();

        // create text node for input

        let textTa = document.createTextNode(textareaData);
        // check input field
        if (inpuData && textareaData) {

            // local storage work start
            // get data from local storage if it null
            if (localStorage.getItem("cardData") == null) {
                localStorage.setItem("cardData", '[]');
            }
            let objectData = {
                "toDo": [],  // Empty array for toDo category
                "backLog": [],  // Empty array for backLog category
                "progress": [],  // Empty array for progress category
                "done": [],  // Empty array for done category
            };
            var previousData = JSON.parse(localStorage.getItem("cardData"));


            if (previousData.length < 1) {
                localStorage.setItem("cardData", JSON.stringify(objectData));

            }
            // console.log(JSON.parse(localStorage.getItem("cardData")))
            let cardName = $(this).attr("id");

            // console.log(cardName);
            let selectedKey = "";
            for (let keys in objectData) {
                if (keys === cardName) {
                    selectedKey = keys;
                    break; // Exit the loop once a match is found
                }
            }
            if (selectedKey) {
                const newCardData = { title: inpuData, description: textareaData }; // Create object for new card data
                previousData[selectedKey].push(newCardData); // Push new data to the selected category array
                localStorage.setItem("cardData", JSON.stringify(previousData)); // Store updated data
            } else {
                console.error("No matching card ID found!");
            }
            // get old local storage data into js data

            // console.log(previousData);

        }
        // hide input

        getparentInput.css("display", "none")
        $(this).hide();
        $(this).siblings(".add-item-btn").show();
        // updatedonload callback
        updatedOnLoad();
        window.location.reload(); // Reload the current page       
    })
    function updatedOnLoad() {
        // get data from local storage
        let localStorageData = JSON.parse(localStorage.getItem("cardData"));

        $(".save-item-btn").each(function () {
            let cardId = $(this).attr("id");

            // Check if the card ID exists in localStorageData
            if (localStorageData.hasOwnProperty(cardId)) {
                localStorageData[cardId].forEach((card, index) => {
                    // console.log(index)
                    // create list item elements and populate them with card data
                    let listItems = document.createElement("li");
                    listItems.classList.add("drag-item");
                    listItems.setAttribute("id", card.title);
                    let titleSpan = document.createElement("span");
                    titleSpan.classList.add("span");
                    titleSpan.appendChild(document.createTextNode("title"));

                    let descriptionSpan = document.createElement("span");
                    descriptionSpan.classList.add("span");
                    descriptionSpan.appendChild(document.createTextNode("description"));

                    let h4 = document.createElement('h4');
                    h4.classList.add("text");
                    h4.appendChild(document.createTextNode(card.title));

                    let p = document.createElement("p");
                    p.classList.add('text');
                    p.appendChild(document.createTextNode(card.description));
                    //  create removal button 
                    let btn = document.createElement("button");
                    btn.classList.add("delete");
                    let btnText = document.createTextNode("delete");
                    btn.appendChild(btnText);

                    // Store card data in dataset
                    btn.dataset.cardData = JSON.stringify(card); //custome dataset attribute to get the collection
                    listItems.appendChild(titleSpan);
                    listItems.appendChild(h4);
                    listItems.appendChild(descriptionSpan);
                    listItems.appendChild(p);
                    listItems.appendChild(btn);
                    // Append the created list item in ul
                    let getUl = $(this).parent().siblings(".dragableItem").children(".drag-item-list");
                    getUl.append(listItems);
                });
            }
        });
    }
    // remove item

    function removeData(cardId) {
        let storedData = JSON.parse(localStorage.getItem("cardData"));

        //   console.log(cardId)
        for (let catKeys in storedData) {
            // console.log(catKeys)
            for (let i = 0; i < storedData[catKeys].length; i++) {
                if (storedData[catKeys][i].title === cardId) {
                    console.log(i)
                    storedData[catKeys].splice(i, 1);
                    localStorage.setItem("cardData", JSON.stringify(storedData));
                //    for reload
                    window.location.reload();

                    break; // Exit the loop once the card is found and removed
                }
            }
        }

    }



    // Attach event listener to dynamically created buttons using event delegation
    $(document).on("click", ".delete", function (event) {
        let cardDataString = $(this).data("cardData");
        // console.log(cardDataString)
        let cardData;
        try {
            cardData = cardDataString.title;
            // console.log(cardData)
        } catch (error) {
            console.error("Error parsing card data:", error);
            return; // Exit the function if there's an error parsing the JSON
        }
        removeData(cardData);
    });

  
    // $("#sort").click(function(){
    //    let h3Data= $(".card").children("h3").text();
    //    console.log(h3Data);
    // })
    updatedOnLoad();

})