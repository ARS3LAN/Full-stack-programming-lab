$(document).ready(function() {
    $("#addBtn").click(function() {
        let itemText = $("#itemInput").val();
        if (itemText !== "") {
            $("#itemList").append('<li class="list-item">' + itemText + ' <button class="deleteBtn">Delete</button></li>');
            $("#itemInput").val(""); 
        }
    });

    $("#itemList").on("click", ".deleteBtn", function() {
        $(this).parent().remove();
    });
});