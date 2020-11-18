import { AuthController } from "./controller/AuthController";
import {UserController} from "./controller/UserController";  
import { AdminController } from "./controller/AdminController";
import { HomeworkController } from "./controller/HomeworkController";
import { ExerciceController } from "./controller/ExercicesController";
import {MailController} from "./controller/MailController";

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
    }, {
        method: "get",
        route: "/homeworks",
        controller: HomeworkController,
        action: "all"
    }, {
        method: "get",
        route: "/homeworks/:id",
        controller: HomeworkController,
        action: "one"
    }, {
        method: "post",
        route: "/homeworks",
        controller: HomeworkController,
        action: "save"
    }, {
        method: "delete",
        route: "/homeworks/:id",
        controller: HomeworkController,
        action: "remove"
    }, {
        method: "get",
        route: "/exercises",
        controller: ExerciceController,
        action: "all"
    }, {
        method: "get",
        route: "/exercises/:id",
        controller: ExerciceController,
        action: "one"
    },{
    method: "post",
    route: "/mail",
    controller: MailController,
    action: "send"
}
];