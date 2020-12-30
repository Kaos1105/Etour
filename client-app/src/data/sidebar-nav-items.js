export default function() {
    if (window.currentUser && window.currentUser.userName.includes("_admin"))
        return [
            {
                title: "Overview",
                htmlBefore: '<i class="material-icons">view_module</i>',
                to: "/overview"
            },

            {
                title: "Places",
                htmlBefore: '<i class="material-icons">place</i>',
                to: "/place"
            },
            {
                title: "Tours",
                htmlBefore: '<i class="material-icons">tour</i>',
                to: "/tour"
            },
            {
                title: "Trips",
                htmlBefore: '<i class="material-icons">trip_origin</i>',
                to: "/trip"
            },
            {
                title: "Tickets",
                htmlBefore: '<i class="material-icons">text_snippet</i>',
                to: "/ticket"
            } 
        ];
    else
        return [
            {
                title: "Your Profile",
                htmlBefore: '<i class="material-icons">person</i>',
                to: "/user-profile"
            },
            {
                title: "Your Tickets",
                htmlBefore: '<i class="material-icons">text_snippet</i>',
                to: "/your-tickets"
            }
        ];
}
