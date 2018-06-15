import * as _ from 'underscore';

const CACHE_TIMEOUT = 1000 * 60 * 5;

export abstract class Cache {

    private static inlineStorage = {};

    static objectChage(record, method) {
        var model = record.Model;
        if (this.hit(model))
            this.updateCache(model, record, method);
    }

    static updateCache(model:string, record, method:string) {
        var records = this.load(model);
         if (method == 'CREATE')
              records.push(record);
         if (method == 'DELETE') {
            records = _.reject(records, obj=> {
                return obj["id"] == record["id"];
            });
            this.save(model,records);
        }
    }


    static save(key:string, val:any) {
          this.inlineStorage[key] =  {val:val, timestamp:new Date()};
    }


    static load(key:string): any {
        if (key in this.inlineStorage)
            return this.inlineStorage[key]["val"];
        return null;
    }

    static hit(key:string):boolean {
      if (key in this.inlineStorage) {
          var now = new Date();
          let timestamp:Date = this.inlineStorage[key]["timestamp"];
          var success =  (now.getTime() - timestamp.getTime()) <= CACHE_TIMEOUT;
          if (!success)
              this.invalidate(key);
          return success;
      }
      return false;
    }

    static invalidate(key:string) {
        delete this.inlineStorage[key];
    }

    static invalidateAll() {
        this.inlineStorage = [];
    }

}
