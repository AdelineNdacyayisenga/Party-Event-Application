//Capture the information submitted to a form. Forms have 'submit' event and it's better to use
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('registrar');
    const input = document.querySelector('input'); //Get the form input element to access what the user enters
    const ul = document.getElementById('invitedList'); //select the ul element

    //create filter check box
    const div = document.createElement('div');
    const filterLabel = document.createElement('Label');
    const filterCheckbox = document.createElement('input');

    filterLabel.textContent = "Hide those who haven't responded";
    filterCheckbox.type = 'checkbox';

    div.appendChild(filterLabel);
    div.appendChild(filterCheckbox);

    //insert the checkbox before the ul

    const mainDiv = document.querySelector('.main');
    mainDiv.insertBefore(div, ul); //insert div before ul

    filterCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const lis = ul.children; //all list items 

        if(isChecked) { //only show those who have responded
            for(let i = 0; i < lis.length; i++) {
                let li = lis[i];
                if (li.className === 'responded') {
                    li.style.display = ''; //pick up previous style
                } else {
                    li.style.display = 'none'; //hide element
                }
            }
        } else { //show everyone no matter if they responded or not
            for(let i = 0; i < lis.length; i++) {
                let li = lis[i];
                li.style.display = ''; 
            }
        }
    });

    //using the submit event on forms is great because that way, a form can be submitted by either clicking the submit button or pressing enter!
    //add the input value as a list under the ul element

    function createLI (inputValue) {
        //Can create functions to refactor my code and remove repeated code

        // function createElement(elementName, property, value) {
        //     const element = document.createElement(elementName);
        //     element[property] = value;
        //     return element;
        // }

        // function appendToLI() {
        //     const element = createElement(elementName, property, value);
        //     li.appendChild(element);
        //      return li;
        // }

        const li = document.createElement('li'); //creates an li html tag

        const span = document.createElement('span'); //helps to edit the names if written wrong
        span.textContent = inputValue; //add the input value to the list!
        li.appendChild(span);

        const label = document.createElement('label');
        label.textContent = 'Confirmed';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        label.appendChild(checkbox);
        li.appendChild(label);

        //Add an edit button
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        li.append(editButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        li.appendChild(removeButton);
        return li;
    }

    form.addEventListener('submit', (e) => { //e is similar to event
        e.preventDefault(); //prevents browser from reloading right after user submits the form
        const inputValue = input.value;
        input.value = ''; //input clears off after entering a value
        
        // const li = document.createElement('li'); //creates an li html tag
        // li.textContent = inputValue; //add the input value to the list!

        // const label = document.createElement('label');
        // label.textContent = 'Confirmed';

        // const checkbox = document.createElement('input');
        // checkbox.type = 'checkbox';

        // label.appendChild(checkbox);
        // li.appendChild(label);

        // const button = document.createElement('button');
        // button.textContent = 'Remove';
        // li.appendChild(button);

        //make a function to do all that commented out, to make it more readable and efficient

        const li = createLI(inputValue);
        
        ul.appendChild(li); //add the tag to ul
        
    });

    //Now we need a handler to be triggered when the checkbox is clicked!
    //with Checkboxes, instead of using the 'click' event, use the 'change' event. that way
    //it's triggered when the box is checked or unchecked

    //If we want to handle checks on every list item, we can use bubbling and apply the event handler 
    //on the parent, which all children would access too

    ul.addEventListener ('change', (e) => {
        //console.log(e.target.checked); returns true is checkbox is checked

        const checkbox = e.target;
        const checked = checkbox.checked;

        //the list item is the grandchild of the checkbox; label is the parent of the checkbox. 
        //to traverse to the list item from checkbox, call parentNode twice!

        const listItem = checkbox.parentNode.parentNode;
        if (checked) {
            listItem.className = 'responded'; //the borders for the 'responded' class are in CSS doc
        } else{
            listItem.className = '';
        }
    });

    //add event handler to remove people from the ul when the remove button is clicked

    ul.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') { //only when a button is clicked
            const button = e.target;
            const li = button.parentNode;
            const ul = li.parentNode;
            if(button.textContent === 'Remove') {
                ul.removeChild(li);
            } else if (button.textContent === 'Edit') {
                //edit the DOM to have the editing state. We need to manipulate the text element
                const span = li.firstElementChild;
                const input = document.createElement('input'); //input element we want to replace the span with
                input.type = 'text';
                input.value = span.textContent; // now we have the original name and can edit

                li.insertBefore(input, span); //insert the input element before the span (old text was inside a span element)
                li.removeChild(span);

                //in editing state, we don't need to see an edit button, we need a save button

                button.textContent = 'Save';
            } else if (button.textContent === 'Save') {
                //Reverses what we did for the Edit state
                const input = li.firstElementChild;
                const span = document.createElement('span'); 
                
                span.textContent = input.value; 

                li.insertBefore(span, input); 
                li.removeChild(input);

                button.textContent = 'Edit';
            }

            
        }
    });

});
