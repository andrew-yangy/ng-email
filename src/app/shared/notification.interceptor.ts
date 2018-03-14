import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MessageService } from 'primeng/components/common/messageservice';
import { tap, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {
    }

    private handleNotification(res: HttpErrorResponse | HttpResponse<any>) {
        const messageService = this.injector.get(MessageService);
        messageService.clear();
        if (res instanceof HttpErrorResponse && res && res.error) {
            if (Array.isArray(res.error.errors)) {
                const errorMsg = res.error.errors.map(err => ({
                    severity: 'error',
                    detail: err.message
                }));
                messageService.addAll(errorMsg);
            } else {
                messageService.add({
                    severity: 'error',
                    detail: res.error.message || res.message
                });
            }
        } else if (res instanceof HttpResponse) {
            messageService.add({
                severity: 'success',
                detail: res.body
            });
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                tap((event: HttpResponse<any>) => {
                    if (event instanceof HttpResponse &&
                        req.method !== 'GET') {
                        this.handleNotification(event);
                    }
                }),
                catchError((response: HttpErrorResponse) => {
                    this.handleNotification(response);
                    return Observable.throw(response);
                })
            );
    }
}
