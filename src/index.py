
from flask import Flask,request, copy_current_request_context
import sqlite3
from random import random
from time import sleep
import time
from flask_socketio import SocketIO, emit
async_mode = None
from flask_cors import CORS, cross_origin
from threading import Thread, Event
from flask import jsonify


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, support_credentials=True)

thread1 = Thread()
thread2 = Thread()
thread1_stop_event = Event()
thread2_stop_event = Event()

def retrieveLatestData(number):
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
    
    insert_data(number,number,number,"Pond_1",cur)
    insert_data(number,number,number,"Pond_2",cur)
    insert_data(number,number,number,"Pond_3",cur)
    insert_data(number,number,number,"Pond_4",cur)
    conn.commit()

    top_rows = {
        "datas" : [
    {"ID":rows1[0]["ID"],"pond_number":"1","Temp":rows1[0]["Temprature"],"PH":rows1[0]["PH"],"Water_Level":rows1[0]["Water_Level"],"Time_recorded":rows1[0]["Time_recorded"]},
    {"ID":rows2[0]["ID"],"pond_number":"2","Temp":rows2[0]["Temprature"],"PH":rows2[0]["PH"],"Water_Level":rows2[0]["Water_Level"],"Time_recorded":rows2[0]["Time_recorded"]},
    {"ID":rows3[0]["ID"],"pond_number":"3","Temp":rows3[0]["Temprature"],"PH":rows3[0]["PH"],"Water_Level":rows3[0]["Water_Level"],"Time_recorded":rows3[0]["Time_recorded"]},
    {"ID":rows4[0]["ID"],"pond_number":"4","Temp":rows4[0]["Temprature"],"PH":rows4[0]["PH"],"Water_Level":rows4[0]["Water_Level"],"Time_recorded":rows4[0]["Time_recorded"]}
    ]}
    
    
    return top_rows


def retrievePondData(pondnum):
    conn = sqlite3.connect('fishfarm.db')
    columns = ["Temprature","PH","Water_Level","Time_recorded"]
    tableName = "Pond_"+pondnum
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


def get_latest():
    """
    Generate a random number every 1 second and emit to a socketio instance (broadcast)
    Ideally to be run in a separate thread?
    """
    #infinite loop of magical random numbers
    print("Making random numbers")
    while not thread1_stop_event.isSet():
        number = round(random()*10, 3)
        latest_data = retrieveLatestData(number)
        socketio.emit('latestdata', latest_data )       
        socketio.sleep(5)


def get_specific(data):
    """
    Generate a random number every 1 second and emit to a socketio instance (broadcast)
    Ideally to be run in a separate thread?
    """
    #infinite loop of magical random numbers
    print("getting specific data")
    while not thread2_stop_event.isSet():
        spec_data = retrievePondData(data)
        print(spec_data["PH"][-1])
        socketio.emit('specdata', spec_data )       
        socketio.sleep(5)

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



@cross_origin(supports_credentials=True)
@socketio.on('connect')
#decorator to catch an event called "connect"
def test_connect():
    global thread1
    print('Client connected')

    #Start the thread if it hasn't been started
    if not thread1.is_alive():
        print("Starting Thread")
        thread1 = socketio.start_background_task(get_latest)



@cross_origin(supports_credentials=True)
@socketio.on('arrowclicked')
#decorator to catch an event called "my event"
def create_thread2(pond_num):
    global thread2
    print(pond_num)

    #Start the thread if it hasn't been started
    if not thread2.is_alive():
        print("Starting Thread2")
        thread1 = socketio.start_background_task(get_specific(pond_num))

@cross_origin(supports_credentials=True)
@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app,debug=True,host='0.0.0.0')
