import { ReplaySubject, Subject } from "rxjs";
import { Queue, Worker } from 'bullmq';

export class Downloader {
    chSubject = new Subject<any>();
    private chObs = this.chSubject.asObservable();
    private pagesUrl = new Queue('Pages', { connection: {
        host: "redis",
        password: 'admin1234'
    }});
    constructor(){
        this.chObs
            .subscribe(({baseUrl, chapter}) => {
                const { hash, data } = chapter;
                for (const page of data) {
                    const url = `${baseUrl}/data/${hash}/$replaceMe`;
                    this.pagesUrl.add(hash,url.replace('$replaceMe',page));
                }
            });
    }

    download() {
        new Worker('Pages', async job => {
            console.log('oi workers', job.data)
        }, { connection: {
            host: "redis",
            password: 'admin1234'
        }});
    }
}