$(document).ready(() => {
    $('.tabs').tabs();
    $('select').formSelect();
});

function getCustomers() {
    $.get("/api/customers", renderCustomerList);
}

function renderCustomerList(data) {
    if (!data.length) {
    window.location.href = "/customers";
    }
}

$(function() {
    getCustomers();

    $(".change-eaten").on("click", function() {
        let id = $(this).data("id");
        let customer = $("#current-customer :selected").data("id");
        let newEaten = $(this).data("neweaten");
        console.log(newEaten);
        let newEatenState = {
            eaten: newEaten,
            eatenBy: customer
        };
        $.ajax("/api/burgers/" + id, {
            method: "PUT",
            data: newEatenState
        }).then(() => {
            console.log("Changed eaten to", newEaten);
            window.location.reload();
        });
    });

    $(".eat-again").on("click", function() {
        let id = $(this).data("id");
        let newEaten = $(this).data("neweaten");
        console.log(newEaten);
        let newEatenState = {
            eaten: newEaten,
        };
        $.ajax("/api/burgers/" + id, {
            method: "PUT",
            data: newEatenState
        }).then(() => {
            console.log("Changed eaten to", newEaten);
            window.location.reload();
        });
    });

    $("body").on("submit", "#create-form", (event) => {
        event.preventDefault();
        let newBurger = {
            name: $("#burger").val().trim(),
            eaten: $("[name=eaten]:checked").val().trim()
        };
        $.ajax("/api/burgers", { 
            method: "POST",
            data: newBurger 
        }).then(() => {
            console.log("Created new burger");
            window.location.reload();
        });
    });

    $(".delete-burger").on("click", function() {
        let id = $(this).data("id");
        console.log(id);
        $.ajax("/api/burgers/" + id, {
            method: "DELETE"
        }).then(() => {
            console.log("deleted burger", id);
            location.reload();
        });
    });
});