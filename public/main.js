var socket = io();
var messages = document.getElementById("messages");

const messageInput = document.getElementById('message_input');

(function() {
    $("form").submit(function(e) {

        let li = document.createElement("li");
        e.preventDefault(); // prevents page reloading
        socket.emit("chat message", $("#message").val());

        messages.appendChild(li).append($("#message").val());
        let span = document.createElement("span");
        messages.appendChild(span).append("by " + "Anonymous" + ": " + "just now");

        $("#message").val("");

        return false;
    });

    socket.on("received", data => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
        console.log("Hello bingo!");
    });
})();

// fetching initial chat messages from the database
(function() {
    fetch("/chats")
        .then(data => {
            return data.json();
        })
        .then(json => {
            json.map(data => {
                var dateStringWithTime = moment(data.createdAt).format('YYYY-MMM-DD h:mm a')
                console.log(dateStringWithTime) // Output: 2020-07-21 07:24:06
                let li = document.createElement("li");
                let span = document.createElement("span");
                messages.appendChild(li).append(data.message);
                messages
                    .appendChild(span)
                    .append("by " + data.sender + ": " + (dateStringWithTime));
            });
        });
})();