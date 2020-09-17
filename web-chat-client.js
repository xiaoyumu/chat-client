(function (global) {
    'use strict';

    const chat_client_wrapper_id = 'chat-client-wrapper-101'
    const chat_button_id = 'chat-send-btn-101';
    const chat_input_box_id = 'chat-input-box-101';
    const chat_conversation_wrapper_id = 'chat-conversation-wrapper-101';

    let elementRootName = 'chat-client'
    let customElementRegistry = global.window.customElements;
    customElementRegistry.define(elementRootName, 
        class extends HTMLElement {            
            // Define the ctor
            constructor() {
                // Call base class ctor
                super(); 
                 
                var title = this.getAttribute("client-title")
                                
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
                sendButton.setAttribute('id', chat_button_id);

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
                let chatFontFamily = "helvetica"

                style.textContent =  this.styleClientWrapper(chatFontFamily, wrapperHeight)  
                   +  this.styleHideInputBorder()
                    + this.styleToggleButton() 
                    + this.styleTitleArea(titleBarHeight)
                    + this.styleConversationWrapper(conversationAreaHeight)
                    + this.styleInputArea(inputAreaHeight)
                    + this.styleChatMessages();


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
                            parent_wrapper.sendMessage(inputBox.value,  conversationArea) 
                            inputBox.value = ""
                    };
                  })
                
                inputBox.addEventListener('keydown', function( event ) {
                    if (event.key  === "Enter") {
                        // Cancel the default action, if needed
                        event.preventDefault();
                        sendButton.click();
                      }
                })
            }

            sendMessage(message, conversationView){
                this.createUserMessageElement(message,  conversationView)       
                this.sendMessageToRemoteService(message,  conversationView)                     
            }

            createUserMessageElement(message, conversationView) {
                // console.log("Adding user message to", conversationView)
                if (conversationView != undefined && conversationView != null) {
                    var userMessageBox = document.createElement('div')
                    userMessageBox.setAttribute('class', 'human messages')                  
                    
                    var msg = document.createElement('div')
                    msg.setAttribute('class', 'message')
                    msg.textContent = message 

                    userMessageBox.appendChild(msg)
                    conversationView.appendChild(userMessageBox) 
                    this.ensureLatestContentVisibleInContainer(conversationView)
                }
            }

            sendMessageToRemoteService(message, conversationView){
                console.log("Sending message To Remote Service: ", message)

                const url = "http://127.0.0.1:8080/talk"
                const REQUEST_FINISHED_RESPONSE_READY = 4
                const HTTP_STATUS_OK = 200
                let parent_wrapper = this
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == REQUEST_FINISHED_RESPONSE_READY && this.status == HTTP_STATUS_OK) {
                        try {
                            var responseBody = JSON.parse(this.responseText);
                            // console.log("Response Body:", responseBody)
                            parent_wrapper.parseChatResponse(responseBody, conversationView)
                        } catch (error) {
                            console.error(error.toString())
                        } 
                        return;
                   }
                   console.log("Failure response retrieved: ", this)
                };

                xhttp.open("POST", url, true);
                xhttp.setRequestHeader("Content-type", "application/json");
                var requestBody = {
                    "message": message
                }
                xhttp.send(JSON.stringify(requestBody));
            }

            parseChatResponse(responseBody, container){
                console.log("Parsing Chat Response :", responseBody)
                if(responseBody.status === "ok"){
                    this.createBotResponseElement(responseBody, container)
                }
            }

            createBotResponseElement(bot_response, container){
                this.createBotMessageElements(bot_response.messages, container)
                let rich_content = bot_response.rich_content
                if (rich_content){
                    this.createBotCardElements(rich_content.card, container)
                    this.createBotListElements(rich_content.list, container)
                    this.createBotSuggestionElements(rich_content.suggestions, container)
                }
            }
            
            createBotMessageElements(messages, container){
                if(messages){
                    messages.forEach(msg => {
                        this.appendBotMessageElement(msg, container)
                    });
                }
            }

            appendBotMessageElement(message, container){
                var botMessageBox = document.createElement('div')
                botMessageBox.setAttribute('class', 'bot messages')                  
                
                var msg = document.createElement('div')
                msg.setAttribute('class', 'message')
                msg.textContent = message 

                botMessageBox.appendChild(msg)
                container.appendChild(botMessageBox) 
                this.ensureLatestContentVisibleInContainer(container)
            }

            createBotCardElements(card, container){

            }

            createBotListElements(list, container){

            }

            createBotSuggestionElements(suggestions, container){

            }

            ensureLatestContentVisibleInContainer(container){
                container.scrollTop = container.scrollHeight;
            }
            
            styleHideInputBorder(){
                let style = `
                input:focus, textarea:focus, select:focus{
                    outline: none;
                }
                `
                return style
            }

            styleToggleButton(){
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

                return style_toggle_button
            }

            styleClientWrapper(chatFontFamily, wrapperHeight){
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
                    font-family: ${chatFontFamily};
                    align-items: center;
                }`   
                return style_wrapper
            }

            styleTitleArea(titleBarHeight){
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

                return style_title_bar + style_close_btn + style_close_btn_icon
            }

            styleConversationWrapper(conversationAreaHeight){
                let style_conversation_area = `
                .chat-client-conversation-area{
                    width: 100%; 
                    height: ${conversationAreaHeight}px;
                    overflow-y: scroll; 
                    background: #F2F6FC; 
                }`
                return style_conversation_area
            }
            styleInputArea(inputAreaHeight){
                let style_input_area = `
                .chat-client-input-area{                     
                    width: 100%; 
                    height: ${inputAreaHeight}px;
                    background: #EBEEF5; 
                    display:flex; flex-direction: row; justify-content: center; align-items: center;
                }`

                return style_input_area + 
                    this.styleInputBox() +
                    this.styleSendButton() 
            }

            styleInputBox(){
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
                 return style_input_box
            }

            styleSendButton(){
                let style_input_button = `
                .chat-send-button{
                    width: 60px; 
                    border: none;
                    cursor: pointer;
                }
                ` 
                return style_input_button
            }

            styleChatMessages(){
                // 
                let style_chat_message = `
                .messages {
                    margin-top: 10px;
                    display: flex;
                    flex-direction: column;
                  }
              
                  .message {
                    padding: 8px 15px;
                    margin-top: 1px;
                    margin-bottom: 1px;
                    display: inline-block;
                  }


                .human {
                    align-items: flex-end;
                }
            
                .human .message {
                    color: white;
                    margin-left: 15%;
                    background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
                    background-attachment: fixed;
                    position: relative;
                    border-radius: 14px 0px 14px 14px;
                }
            
                .human .message.last:before {
                    content: "";
                    position: absolute;
                    z-index: 0;
                    bottom: 0;
                    right: -8px;
                    height: 20px;
                    width: 20px;
                    background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
                    background-attachment: fixed;
                }
            
                .human .message.last:after {
                    content: "";
                    position: absolute;
                    z-index: 1;
                    bottom: 0;
                    right: -10px;
                    width: 10px;
                    height: 20px;
                    background: white; 
                }


                .bot {
                    align-items: flex-start;
                }
            
                .bot .message {
                    margin-right: 15%;
                    background-color: #eee;
                    position: relative;
                    border-radius: 0px 14px 14px 14px;
                }
            
                .bot .message.last:before {
                    content: "";
                    position: absolute;
                    z-index: 0;
                    bottom: 0;
                    left: -7px;
                    height: 20px;
                    width: 20px;
                    background: #eee;
                }
            
                .bot .message.last:after {
                    content: "";
                    position: absolute;
                    z-index: 1;
                    bottom: 0;
                    left: -10px;
                    width: 10px;
                    height: 20px;
                    background: white;
                }
                `
                return style_chat_message
            }
    });
})(window);


