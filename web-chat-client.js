(function (global) {
    'use strict';

    const chat_client_wrapper_id = 'chat-client-wrapper-101'
    const chat_button_id = 'chat-send-btn-101';
    const chat_input_box_id = 'chat-input-box-101';
    const chat_conversation_wrapper_id = 'chat-conversation-wrapper-101';

    const SVG_ICON_CLASS = "svg-icon"
    const DEFAULT_ICON_VIEWBOX = "0 0 16 16"
    const SVG_NS = "http://www.w3.org/2000/svg"

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
               
                let wrapperHeight = 560;
                let titleBarHeight = 40;
                let inputAreaHeight = 60;
                let conversationAreaHeight = wrapperHeight - titleBarHeight - inputAreaHeight
                let chatFontFamily = "helvetica"

                wrapper.setAttribute("style", `height: ${wrapperHeight}px; font-family: ${chatFontFamily};`)
                titleBar.setAttribute("style", `height: ${titleBarHeight}px;`)
                conversationArea.setAttribute("style", `height: ${conversationAreaHeight}px;`)
                inputControlArea.setAttribute("style", `height: ${inputAreaHeight}px;`)

                // Add style for outter wrapper (the chat window)
                // var style = document.createElement('style');
                // style.setAttribute('scope', elementRootName)
                // style.textContent =  this.styleClientWrapper(chatFontFamily, wrapperHeight);

                // Build element
                var shadow = this.attachShadow({mode: 'open'});
                // shadow.appendChild(style);

                var linkStyleGeneral = document.createElement('link')
                linkStyleGeneral.setAttribute("rel", "stylesheet")
                linkStyleGeneral.setAttribute("href", "styles.css")
                shadow.appendChild(linkStyleGeneral);

                var chatStyle = document.createElement('link')
                chatStyle.setAttribute("rel", "stylesheet")
                chatStyle.setAttribute("href", "chat.css")
                shadow.appendChild(chatStyle);

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
                if(suggestions == undefined || suggestions == null) return
                if(suggestions.length == 0) return

                var suggestionContainer = document.createElement('div')
                suggestionContainer.setAttribute("class", "suggestion-btn-container")
                suggestions.forEach(sug => {
                     if (sug.link){
                        // Link button
                        var linkButton = document.createElement('a')
                        linkButton.setAttribute("class", "suggestion-btn suggestion-link-btn")
                        linkButton.setAttribute("href", sug.link)
                        linkButton.setAttribute("target", "_blank")

                        var linkText = document.createElement('span')
                        linkText.textContent = sug.title

                        linkButton.appendChild(linkText)
                        linkButton.appendChild(this.createLinkIcon())
                        
                        suggestionContainer.appendChild(linkButton)
                     } else {
                        // Normal button
                        var suggestionBtn = document.createElement('div')
                        suggestionBtn.setAttribute('class', 'suggestion-btn')

                        var btnText = document.createElement('span')                        
                        btnText.textContent = sug.title
                        
                        suggestionBtn.appendChild(btnText)
                        suggestionContainer.appendChild(suggestionBtn)
                     }
                });
                container.appendChild(suggestionContainer)
            }

            ensureLatestContentVisibleInContainer(container){
                container.scrollTop = container.scrollHeight;
            }

            createLinkIcon(){
                const pathA = "M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
                const pathB = "M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"

                var linkIcon = this.createSvgElementByPath(
                    [pathA, pathB], 
                    'link-icon'
                )

                return linkIcon
            }

            createSvgDataPath(pathData, fillRule=null){
                var svgPath = document.createElementNS(SVG_NS, 'path')
                svgPath.setAttributeNS(null, 'd', pathData)
                if(fillRule){
                    svgPath.setAttributeNS(null, 'fill-rule', fillRule)
                }
                return svgPath
            }

            createSvgElementByPath(
                pathData, 
                iconStyleClass=SVG_ICON_CLASS, 
                viewBox=DEFAULT_ICON_VIEWBOX,
                fillRule=null){
                var svg = document.createElementNS(SVG_NS, 'svg')
                svg.setAttributeNS(null, 'width', '1em')
                svg.setAttributeNS(null, 'height', '1em')
                svg.setAttributeNS(null, 'viewBox', viewBox)
                svg.setAttributeNS(null, 'class', iconStyleClass)
                svg.setAttributeNS(null, 'fill', 'currentColor')
                if (Array.isArray(pathData)){
                    pathData.forEach(p=>{
                        var svgPath = this.createSvgDataPath(p, fillRule)
                        svg.appendChild(svgPath)
                    })
                } else {
                    var svgPath = this.createSvgDataPath(pathData, fillRule)
                    svg.appendChild(svgPath)
                }
                return svg
            }

            createSvgByPath(pathData, 
                wrapperStyleClass, 
                iconStyleClass=SVG_ICON_CLASS, 
                viewBox=DEFAULT_ICON_VIEWBOX,
                fillRule=null){
                var svgIcon = document.createElement('div')
                svgIcon.setAttribute('class', wrapperStyleClass)

                svgIcon.appendChild(this.createSvgElementByPath(pathData, iconStyleClass, viewBox, fillRule))
                return svgIcon
            }

    });
})(window);


