import { AuthController } from "./controller/AuthController";
import {UserController} from "./controller/UserController";  
import { AdminController } from "./controller/AdminController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
    }, {
        method: "post",
        route: "/auth/authenticate",
        controller: AuthController,
        action: "authenticate"
    }, {
        method: "get",
        route: "/auth/get",
        controller: AuthController,
        action: "create_token"
    }, {
        method: "post",
        route: "/admin/fill",
        controller: AdminController,
        action: "fill"



    }
];