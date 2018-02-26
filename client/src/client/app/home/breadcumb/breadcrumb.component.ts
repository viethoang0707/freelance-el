import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MenuItem } from 'primeng/primeng';

export interface IBreadcrumb {
    label: string,
    queryParams: any,
    routerLink: string
}

@Component({
    moduleId: module.id,
    selector: 'etraining-breadcrumb',
    templateUrl: 'breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {

    subscription: Subscription;

    items: MenuItem[];

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            //set breadcrumbs
            let root: ActivatedRoute = this.activatedRoute.root;
            this.items = this.getBreadcrumbs(root);
        });
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

        //get the child routes
        let children: ActivatedRoute[] = route.children;

        //return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        //iterate over each children
        for (let child of children) {
            //verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            //verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            //get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

            //append route URL to URL
            url += `/${routeURL}`;

            //add breadcrumb
            let breadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                queryParams: child.snapshot.params,
                routerLink: url
            };
            breadcrumbs.push(breadcrumb);

            //recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    }
}
