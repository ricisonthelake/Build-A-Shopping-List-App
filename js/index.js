/*
The following imports the javascript functions that 
    a) initializes the firebase database app
    b) gets the database named in the databaseURL below
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// ************************************************************************************
const appSettings = {
    databaseURL: "https://realtime-database-b8dd3-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

/*
When you click the 'Add to cart' button, whatever is written in the input field is console logged.
*/
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {

    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

})

onValue(shoppingListInDB, function (snapshot) {
    // Challenge: Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.

    if (snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())
        itemsArray.reverse()
        console.log("Array: " + itemsArray)

        clearShoppingListEl()

        // Challenge: Write a for loop to iterate on itemsArray and console log each item

        for (let i = 0; i < itemsArray.length; i++) {
            // Challenge: Use the appendItemToShoppingListEl(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.

            let currentItem = itemsArray[i]
            console.log("currentItem = " + currentItem)
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "Your shopping list is empty"
    }
})




function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {

    let itemId = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    // Challenge: Attach an event listener to newEl and make it so you console log the id of the item when it's pressed.

    newEl.addEventListener("click", function () {
        // Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)
        // Challenge: Use the remove function to remove the item from the database
        var ok = confirm("Press OK to delete this item?");
        if (ok) {
            remove(exactLocationOfItemInDB);
        }

    })

    shoppingListEl.append(newEl)
}