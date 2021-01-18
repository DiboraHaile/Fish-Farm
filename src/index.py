
from flask import Flask,request
import sqlite3
import time
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_socketio import send,emit
app = Flask(__name__)
CORS(app)
# socketio = SocketIO(app)

def create_table(cur,table_name):
    sql = 'create table if not exists ' + table_name+ ' (ID INTEGER PRIMARY KEY AUTOINCREMENT,Temprature,PH,Water_Level,Time_recorded)'
    cur.execute(sql)
def insert_data(temp,ph,water_level,table_name,cur):
    seconds = time.time()
    localtime = time.ctime(seconds)
    cur.execute("INSERT INTO "+ table_name + "(Temprature,PH,Water_Level,Time_recorded)values(?,?,?,?)",(temp,ph,water_level,localtime))
def select_latest_data(cur,table_name):
    cur.execute("select * from "+table_name + " where ID=(select MAX(ID) from " + table_name+")")
    rows = cur.fetchall()
    return rows

def select_data(cur,table_name):

    rows = cur.execute("select * from "+table_name)
    # rows = cur.fetchall()
    return rows
def select_data_spec(cur,table_name,colmn):

    cur.execute("select "+colmn +" from "+table_name)
    rows = cur.fetchall()
    return rows

@app.route('/')
def manage_data():
    conn = sqlite3.connect('fishfarm.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    create_table(cur,'Pond_1')
    create_table(cur,'Pond_2')
    create_table(cur,'Pond_3')
    create_table(cur,'Pond_4')

    rows1 = select_latest_data(cur,"Pond_1")
    rows2 = select_latest_data(cur,"Pond_2")
    rows3 = select_latest_data(cur,"Pond_3")
    rows4 = select_latest_data(cur,"Pond_4")
    
    # insert_data('30','2.5','22',"Pond_1",cur)
    # insert_data('10','2.2','87',"Pond_2",cur)
    # insert_data('20','4.5','20',"Pond_3",cur)
    # insert_data('68','8.9','50.6',"Pond_4",cur)
    # conn.commit()

    top_rows = {
    "datas":[
    {"ID":rows1[0]["ID"],"pond_number":"1","Temp":rows1[0]["Temprature"],"PH":rows1[0]["PH"],"Water_Level":rows1[0]["Water_Level"],"Time_recorded":rows1[0]["Time_recorded"]},
    {"ID":rows2[0]["ID"],"pond_number":"2","Temp":rows2[0]["Temprature"],"PH":rows2[0]["PH"],"Water_Level":rows2[0]["Water_Level"],"Time_recorded":rows2[0]["Time_recorded"]},
    {"ID":rows3[0]["ID"],"pond_number":"3","Temp":rows3[0]["Temprature"],"PH":rows3[0]["PH"],"Water_Level":rows3[0]["Water_Level"],"Time_recorded":rows3[0]["Time_recorded"]},
    {"ID":rows4[0]["ID"],"pond_number":"4","Temp":rows4[0]["Temprature"],"PH":rows4[0]["PH"],"Water_Level":rows4[0]["Water_Level"],"Time_recorded":rows4[0]["Time_recorded"]}
    ]
    }
    return top_rows

# @socketio.on('connect')
# def handle_event():
#     (json, methods=['GET', 'POST']):
#     print('received my event: ' + str(json))
#     socketio.emit('my response', json, callback=messageReceived)
    # socketio.send('my response', json, callback=messageReceived)
# 

@app.route('/details-Pond')
def pond():
    conn = sqlite3.connect('fishfarm.db')
    # conn.row_factory = sqlite3.Row
    columns = ["Temprature","PH","Water_Level","Time_recorded"]
    tableName = "Pond_"+request.args.get('x')
    cur = conn.cursor()
    rowss = select_data(cur,tableName)
    top_rows = {}
    p =[]
    w=[]
    t=[]
    t_r =[]
    # i =[]
    for row in rowss:
        # i.append(row[0])
        t.append(row[1])
        p.append(row[2])
        w.append(row[3])
        t_r.append(row[4])

    top_rows = {"PH":p, "Water_Level":w,"Temprature":t,"Time_recorded":t_r }
       
    
    return top_rows

if __name__ == '__main__':
    app.run()