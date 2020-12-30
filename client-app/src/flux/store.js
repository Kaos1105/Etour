import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";
import APIHelper from "../app/utils/apihelper";

let _store = {
    menuVisible: false,
    navItems: getSidebarNavItems(),

    places: [],
    tours: [],
    trips: [],
    tickets: [],
    codes: [],
    user_tickets: [],
};

class Store extends EventEmitter {
    constructor() {
        super();

        this.registerToActions = this.registerToActions.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);

        Dispatcher.register(this.registerToActions.bind(this));
    }

    registerToActions({ actionType, payload }) {
        switch (actionType) {
            case Constants.TOGGLE_SIDEBAR:
                this.toggleSidebar();
                break;
            case Constants.LIST_PLACES:
                this.getListPlaces();
                break;
            case Constants.LIST_TOURS:
                this.getListTours();
                break;
            case Constants.LIST_TRIPS:
                this.getListTrips();
                break;
            case Constants.LIST_TICKETS:
                this.getListTickets();
                break;
            case Constants.LIST_CODES:
                this.getListCodes();
                break;
            case Constants.LIST_USER_TICKETS:
                this.getListUserTickets(payload);
                break;
            case Constants.LOAD_SIDEBAR:
                this.loadSidebar();
                break;

            default:
        }
    }



    loadSidebar() {
        _store.navItems = getSidebarNavItems();
        this.emit(Constants.CHANGE);
    }

    toggleSidebar() {
        _store.menuVisible = !_store.menuVisible;
        this.emit(Constants.CHANGE);
    }

    getListUserTickets(payload) {
        APIHelper.get(
                window.API_DOMAIN + "/api/customers/" + payload.customerId
            )
            .then(data => {
                _store.user_tickets = data.tickets;
                this.emit(Constants.CHANGE);
            })
            .catch(err => console.log(err));
    }
    getListCodes() {
        APIHelper.get(
                window.API_DOMAIN + "/api/codes?limit=10000&isActive=true"
            )
            .then(data => {
                _store.codes = data.codes;
                this.emit(Constants.CHANGE);
            })
            .catch(err => console.log(err));
    }

    getListTrips() {
        APIHelper.get(
                window.API_DOMAIN + "/api/trips?limit=10000&isActive=true"
            )
            .then(data => {
                _store.trips = data.trips;
                this.emit(Constants.CHANGE);
            })
            .catch(err => console.log(err));
    }

    getListTickets() {
        APIHelper.get(
                window.API_DOMAIN + "/api/tickets?limit=10000&isActive=true"
            )
            .then(data => {
                _store.tickets = data.tickets;
                this.emit(Constants.CHANGE);
            })
            .catch(err => console.log(err));
    }

    getListPlaces() {
        APIHelper.get(
                window.API_DOMAIN + "/api/places?limit=10000&isActive=true"
            )
            .then(data => {
                _store.places = data.places;
                this.emit(Constants.CHANGE);
            })
            .catch(err => console.log(err));
    }

    getListTours() {
        APIHelper.get(
                window.API_DOMAIN + "/api/tours?limit=10000&isActive=true"
            )
            .then(data => {
                _store.tours = data.tours;
                this.emit(Constants.CHANGE);
            })
            .catch(err => console.log(err));
    }

    getUserTickets() {
        return _store.user_tickets
    }

    getCodes() {
        return _store.codes;
    }

    getTickets() {
        return _store.tickets;
    }

    getTrips() {
        return _store.trips;
    }

    getTours() {
        return _store.tours;
    }

    getPlaces() {
        return _store.places;
    }
    getMenuState() {
        return _store.menuVisible;
    }

    getSidebarItems() {
        return _store.navItems;
    }

    addChangeListener(callback) {
        this.on(Constants.CHANGE, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(Constants.CHANGE, callback);
    }
}

export default new Store();