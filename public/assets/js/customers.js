$(document).ready(() => {
    $('.tabs').tabs();
});

$(function() {

    $("body").on("submit", "#customer-form", (event) => {
        event.preventDefault();
        let newCustomer = {
            name: $("#customer").val().trim(),
        };
        $.ajax("/api/customers", { 
            method: "POST",
            data: newCustomer 
        }).then(() => {
            console.log("Created new customer");
            window.location.reload();
        });
    });

    $(".view-customer").on("click", function() {
        let id = $(this).data("id");
        console.log(id);
        $.ajax("/api/customers/" + id, {
            method: "GET"
        }).then((data) => {
            
        });
    });

    $(".delete-customer").on("click", function() {
        let id = $(this).data("id");
        console.log(id);
        $.ajax("/api/customers/" + id, {
            method: "DELETE"
        }).then(() => {
            console.log("deleted customer", id);
            location.reload();
        });
    });
});