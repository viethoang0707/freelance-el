import erppeek
import csv


def objectMarshalOutbound(model, objects, client):
    try:
        fields = client.fields(model)
        objsArr = []
        for object in objects:
            objDict = {}
            for key in object:
                fieldValue = object[key]
                if key in fields:
                    fieldDef = fields[key]
                    if not fieldValue:
                        if  fieldDef["type"] != "float" and fieldDef["type"] != "integer":
                            objDict[key] = ''
                    else:
                        if fieldDef["type"] == "many2one":
                            if fieldValue:
                                objDict[key] = fieldValue[0]
                                objDict[key + '__DESC__'] = fieldValue[1]
                            else:
                                objDict[key] = ''
                                objDict[key + '__DESC__'] = ''
                        else:
                            objDict[key] = fieldValue
            objsArr.append(objDict)
        return objsArr
    except Exception as exc:
        print 'objectMarshalOutbound error ', exc, model


def objectMarshalInbound(model, objects, client):
    try:
        fields = client.fields(model)
        objsArr = []
        for object in objects:
            objDict = {}
            for key in object:
                fieldValue = object[key]
                if key in fields:
                    objDict[key] = fieldValue if fieldValue else None
            objsArr.append(objDict)
        return objsArr
    except Exception as exc:
        print 'objectMarshalInbound error ', exc, model


model = 'res.users'
fields = ["login","name","social_id","group_name","group_code","position","dob","gender","phone","email",
          "create_date", "ban_date", "banned"]
client = erppeek.Client('http://localhost:8069', 'nissan-erp', 'admin', 'nssw1234')
records = client.read(model,[('create_date', '>=', '2018-10-01'), ('create_date', '<', '2018-11-01')], fields=fields)
users = objectMarshalOutbound(model, records, client)
export_users = []
for user in users:
    # print(user['login'], user['name'], user['phone'], user['email'])
    export_users.append([user['login'], user['name'], user['social_id'], user['group_name'], user['group_code'],
                         user['position'], user['dob'], user['gender'], user['phone'], user['email'],
                         user['create_date'], user['ban_date'] user['banned']])

with open('users.csv', 'wb') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(fields)
    for u in export_users:
        print(u)
        csv_writer.writerow([unicode(s).encode("utf-8") for s in u])
