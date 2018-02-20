import './reflect';
import { FIELD_METADATA_KEY, FieldProperty, IFieldMetaData } from '../models/decorator'
import * as moment from 'moment';
import {SERVER_DATETIME_FORMAT} from '../models/constants';
import { ModelRegister } from '../models/decorator';

export class MapUtils {
    static isPrimitive(obj:any) {
        switch (typeof obj) {
            case "string":
            case "number":
            case "boolean":
                return true;
        }
        return !!(obj instanceof String || obj === String ||
        obj instanceof Number || obj === Number ||
        obj instanceof Boolean || obj === Boolean);
    }

    static isDate(clazz:any) {
        return (clazz instanceof Date);
    }

    static isArray(object:any) {
        if (object === Array) {
            return true;
        } else if (typeof Array.isArray === "function") {
            return Array.isArray(object);
        }
        else {
            return !!(object instanceof Array);
        }
    }

    static getClazz(target: any, propertyKey: string): any {
		return Reflect.getMetadata("design:type", target, propertyKey)
	}

	static getFieldProperty<T>(target: any, propertyKey: string):  IFieldMetaData<T> {
		return Reflect.getMetadata(FIELD_METADATA_KEY, target, propertyKey);
	}

    static getLocalProperty<T>(target: any, propertyKey: string):  IFieldMetaData<T> {
        return Reflect.getMetadata(FIELD_METADATA_KEY, target, propertyKey);
    }

    static deserialize<T>(clazz:{new(): T}, jsonObject:any) {
        if ((clazz === undefined) || (jsonObject === undefined)) return undefined;
        let obj:any = new clazz();
        Object.keys(obj).forEach((key) => {
            let propertyMetadataFn:(IFieldMetaData) => any = (propertyMetadata)=> {
                let propertyName = propertyMetadata.name || key;
                let innerJson = jsonObject ? jsonObject[propertyName] : undefined;
                let clazz = MapUtils.getClazz(obj, key);
                if (!jsonObject[propertyName])
                    return null;
                if (MapUtils.isArray(clazz)) {
                    let metadata = MapUtils.getLocalProperty(obj, key);
                    if (metadata.clazz || MapUtils.isPrimitive(clazz)) {
                        if (innerJson && MapUtils.isArray(innerJson)) {
                            return innerJson.map(
                                (item:any)=> MapUtils.deserialize(metadata.clazz, item)
                            );
                        } else {
                            return undefined;
                        }
                    } else {
                        return innerJson;
                    }

                } else if (MapUtils.isPrimitive(clazz)) {
                    return jsonObject ? jsonObject[propertyName] : undefined;
                } else if (MapUtils.isDate(new clazz())) {
                    return jsonObject ? moment(jsonObject[propertyName],SERVER_DATETIME_FORMAT).toDate(): undefined;
                }
                 else {
                    return MapUtils.deserialize(clazz, innerJson);
                }
            };

            let propertyMetadata = MapUtils.getFieldProperty(obj, key);
            if (propertyMetadata) {
                obj[key] = propertyMetadataFn(propertyMetadata);
            } else {
                if (jsonObject && jsonObject[key] !== undefined) {
                    obj[key] = jsonObject[key];
                }
            }
        });
        return obj;
    }

    static deserializeModel(model:string, jsonObject:any) {
        if (jsonObject === undefined) return undefined;
        let obj:any = ModelRegister.Instance.instantiateObject(model);
        Object.keys(obj).forEach((key) => {
            let propertyMetadataFn:(IFieldMetaData) => any = (propertyMetadata)=> {
                let propertyName = propertyMetadata.name || key;
                let innerJson = jsonObject ? jsonObject[propertyName] : undefined;
                let clazz = MapUtils.getClazz(obj, key);
                if (!jsonObject[propertyName])
                    return null;
                if (MapUtils.isPrimitive(clazz)) {
                    return jsonObject ? jsonObject[propertyName] : undefined;
                } else if (MapUtils.isDate(new clazz())) {
                    return jsonObject ? moment(jsonObject[propertyName],SERVER_DATETIME_FORMAT).toDate(): undefined;
                }
            };

            let propertyMetadata = MapUtils.getFieldProperty(obj, key);
            if (propertyMetadata) {
                obj[key] = propertyMetadataFn(propertyMetadata);
            } else {
                if (jsonObject && jsonObject[key] !== undefined) {
                    obj[key] = jsonObject[key];
                }
            }
        });
        return obj;
    }

    static serialize(object:any):any {
        if (object === undefined) return {};
        let jsonObject:any = {};
        Object.keys(object).forEach((key) => {
            if (MapUtils.isDate(object[key]))
                jsonObject[key] = moment(object[key]).format(SERVER_DATETIME_FORMAT);
            else
                jsonObject[key] = object[key];
        });
        return jsonObject;
    }
}
