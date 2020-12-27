import json

def change(request):
    dic1 = json.loads(request)
    dic1['age'] = 100
    request = json.dumps(dic1)
    print(request)

if __name__ =="__main__":
    dic = {'name':'Lee','age':18}
    js = json.dumps(dic)
    change(js)
    print(js)