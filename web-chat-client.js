(function (global) {
    'use strict';

    let elementRootName = 'chat-client'
    let customElementRegistry = global.window.customElements;
    customElementRegistry.define(elementRootName, 
        class extends HTMLElement {
            // Define the ctor
            constructor() {
                // Call base class ctor
                super(); 
                 
                var title = this.getAttribute("client-title")
                const chat_client_wrapper_id = 'chat-client-wrapper-101'
                const chat_button_id = 'chat-send-btn-101';
                const chat_input_box_id = 'chat-input-box-101';
                const chat_conversation_wrapper_id = 'chat-conversation-wrapper-101';
                
                // Outter wrapper
                var wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'chat-client-wrapper');
                wrapper.setAttribute('id', chat_client_wrapper_id);

                // Toggle button 
                var toggleButton = document.createElement('div');
                toggleButton.setAttribute('class', 'chat-client-toggle-button');

                // Title bar container
                var titleBar = document.createElement('div');
                titleBar.setAttribute('class', 'chat-client-titlebar');

                var title_span = document.createElement('span');
                title_span.textContent = title

                titleBar.appendChild(title_span)

                var closeButton = document.createElement('div');
                closeButton.setAttribute('class', 'chat-client-close-btn');

                var closeIcon = document.createElement('img');
                var closeIconData = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNDQzLjYsMzg3LjFMMzEyLjQsMjU1LjRsMTMxLjUtMTMwYzUuNC01LjQsNS40LTE0LjIsMC0xOS42bC0zNy40LTM3LjZjLTIuNi0yLjYtNi4xLTQtOS44LTRjLTMuNywwLTcuMiwxLjUtOS44LDQgIEwyNTYsMTk3LjhMMTI0LjksNjguM2MtMi42LTIuNi02LjEtNC05LjgtNGMtMy43LDAtNy4yLDEuNS05LjgsNEw2OCwxMDUuOWMtNS40LDUuNC01LjQsMTQuMiwwLDE5LjZsMTMxLjUsMTMwTDY4LjQsMzg3LjEgIGMtMi42LDIuNi00LjEsNi4xLTQuMSw5LjhjMCwzLjcsMS40LDcuMiw0LjEsOS44bDM3LjQsMzcuNmMyLjcsMi43LDYuMiw0LjEsOS44LDQuMWMzLjUsMCw3LjEtMS4zLDkuOC00LjFMMjU2LDMxMy4xbDEzMC43LDEzMS4xICBjMi43LDIuNyw2LjIsNC4xLDkuOCw0LjFjMy41LDAsNy4xLTEuMyw5LjgtNC4xbDM3LjQtMzcuNmMyLjYtMi42LDQuMS02LjEsNC4xLTkuOEM0NDcuNywzOTMuMiw0NDYuMiwzODkuNyw0NDMuNiwzODcuMXoiLz48L3N2Zz4="
                closeIcon.setAttribute("src",  closeIconData)
                closeIcon.setAttribute("style",  'close-button-icon')
                
                closeButton.appendChild(closeIcon)

                titleBar.appendChild(closeButton);

                // Input area
                var inputControlArea = document.createElement('div');
                inputControlArea.setAttribute('class', 'chat-client-input-area');

                var inputBox = document.createElement('input');
                inputBox.setAttribute('class', 'chat-input-box');
                inputBox.setAttribute('placeholder', 'Type something ...');
                inputBox.setAttribute('id',  chat_input_box_id)

                var sendButton = document.createElement('input');
                sendButton.setAttribute('class', 'chat-send-button');
                sendButton.setAttribute('type', 'button');
                sendButton.setAttribute('value', 'Send');
                sendButton.setAttribute('id', chat_button_id)

                inputControlArea.appendChild(inputBox);
                inputControlArea.appendChild(sendButton);

                // conversationArea
                var conversationArea = document.createElement('div');
                conversationArea.setAttribute('class', 'chat-client-conversation-area');
                conversationArea.setAttribute('id', chat_conversation_wrapper_id)
               
                // Add style for outter wrapper (the chat window)
                var style = document.createElement('style');
                style.setAttribute('scope', elementRootName)

                let wrapperHeight = 560;
                let titleBarHeight = 40;
                let inputAreaHeight = 60;
                let conversationAreaHeight = wrapperHeight - titleBarHeight - inputAreaHeight

                let style_wrapper =  `
                .chat-client-wrapper { 
                    border-radius: 4px; 
                    bottom: 100px; 
                    right: 20px; 
                    width: 370px; 
                    height: ${wrapperHeight}px;
                    position: fixed; 
                    overflow: hidden; 
                    display: flex;
                    flex-direction: column;                        
                    box-shadow: rgba(0, 0, 0, 0.24) 1px 4px 15px 0px;
                }`             

                let style_toggle_button = `
                .chat-client-toggle-button{
                    border-radius: 30px; 
                    bottom: 20px; 
                    right: 20px; 
                    width: 60px; 
                    height: 60px; 
                    position: fixed; 
                    overflow: hidden; 
                    display: flex;
                    cursor: pointer;
                    box-shadow: rgba(0, 0, 0, 0.24) 1px 4px 15px 0px;
                }`

                let style_title_bar = `
                .chat-client-titlebar{ 
                    width: 100%; 
                    height: ${titleBarHeight}px;
                    background: #409EFF; 
                     display:flex; flex-direction: row; justify-content: center; align-items: center; 
                }`

                let style_close_btn =`
                .chat-client-close-btn { 
                    margin: 8px; 
                    bottom: 10px; 
                    right: 10px; 
                    width: 20px; 
                    height: 20px; 
                    cursor: pointer;
                    background: #F2F6FC; 
                }`

                let style_close_btn_icon = `
                .close-button-icon {
                    width: 16px;
                    height: 16px;
                }`

                let style_input_area = `
                .chat-client-input-area{                     
                    width: 100%; 
                    height: ${inputAreaHeight}px;
                    background: #EBEEF5; 
                    display:flex; flex-direction: row; justify-content: center; align-items: center;
                }`

                let style_conversation_area = `
                .chat-client-conversation-area{
                    width: 100%; 
                    height: ${conversationAreaHeight}px;
                    overflow-y: scroll; 
                    background: #F2F6FC; 
                }`

                let style_input_box = `
                .chat-input-box {
                    background: #EBEEF5; 
                     border-radius: 0;
                     width: 100%;  
                     border: none; 
                     font-size: 14px;  
                     padding-left: 14px;                          
                 }   
                  text:focus {
                     border: none; 
                 }`

                let style_input_button = `
                    .chat-send-button{
                        width: 60px; 
                        border: none;
                        cursor: pointer;
                    }
                `

                style.textContent =  style_wrapper  
                    + style_toggle_button 
                    + style_title_bar 
                    + style_close_btn  + style_close_btn_icon
                    + style_input_area 
                    + style_input_box + style_input_button
                    + style_conversation_area;


                    // Build element
                var shadow = this.attachShadow({mode: 'open'});

                shadow.appendChild(style);

                wrapper.appendChild(toggleButton);                

                wrapper.appendChild(titleBar);                
                wrapper.appendChild(conversationArea);
                wrapper.appendChild(inputControlArea);                  

                shadow.appendChild(wrapper);
                let parent_wrapper = this
                sendButton.addEventListener('click',  function ( event ) {
                    // console.log("click event triggered.",  event)
                    if( event.target.id == chat_button_id) {
                            console.log("Sending Message: ", inputBox.value)
                            parent_wrapper.createUserMessageElement(inputBox.value)                            
                    };
                  } )
            }

            createUserMessageElement(message) {
                
                var wrapper = this.getElementsByClassName('chat-client-conversation-area')
                console.log("Locating conversation_wrapper", wrapper)
                if (wrapper != undefined && wrapper != null) {
                    var userMessage = document.createElement('div')
                    var messageSpan = document.createElement('span')
                    messageSpan.textContent = message
                    userMessage.appendChild(messageSpan)
                    wrapper.appendChild(userMessage)
                }
            }
    });

    console.log("hello")
})(window);


