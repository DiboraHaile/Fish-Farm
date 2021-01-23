
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
data_inserted = False
row_values = {}
row = []

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

def retrieveLatestData(number):
    conn = sqlite3.connect('fishfarm.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    tables = len(number["ph"])
    print(tables)
    global data_inserted
    row_values = {}
    
    print(data_inserted)
    row = []
    
    for i in range(tables):
        TableName = 'Pond_'+str(i+1)
        create_table(cur,TableName)
        if data_inserted:
            # print(row[-1]["PH"])
            if (select_latest_data(cur,"Pond_"+str(i+1))[0]["PH"] == number['ph'][i] and select_latest_data(cur,"Pond_"+str(i+1))[0]["Temprature"] == number['temp'][i] and select_latest_data(cur,"Pond_"+str(i+1))[0]["Water_Level"] == number['ultr'][i]):
                 continue
            
        else:
            data_inserted = True
        insert_data(number['ph'][i],number['ultr'][i],number['temp'][i],TableName,cur)
        row_values['pond_number'] = i+1
        row_values['PH'] = select_latest_data(cur,"Pond_"+str(i+1))[0]["PH"]
        row_values['Temp']= select_latest_data(cur,"Pond_"+str(i+1))[0]["Temprature"]
        row_values['Water_Level']=select_latest_data(cur,"Pond_"+str(i+1))[0]["Water_Level"]
        row_values['Time_recorded']=select_latest_data(cur,"Pond_"+str(i+1))[0]["Time_recorded"]
        print('atleast once')
        row.append(row_values)
        row_values = {}
        
    conn.commit()      

    top_rows = { "datas": row}

    return top_rows


def retrievePondData(pondnum):
    conn = sqlite3.connect('fishfarm.db')
    columns = ["Temprature","PH","Water_Level","Time_recorded"]
    tableName = "Pond_"+ str(pondnum)
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
        rec = {}
        ph = round(random()*10, 3)
        temp = round(random()*10, 3)
        ultr = round(random()*10, 3)

        ph1 = round(random()*10, 3)
        temp2 = round(random()*10, 3)
        ultr3 = round(random()*10, 3)

        rec = {
            "ph" : [ph,ph, ph1,ph1],
            "temp" : [ temp,temp, temp2,temp2],
            "ultr" : [ultr,ultr, ultr3,ultr]
        }
        latest_data = retrieveLatestData(rec)
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

@cross_origin(supports_credentials=True)
@socketio.on('switchtoggled')
def toggle_value(checked,toggletype):
    print(toggletype,checked)
    


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
        thread2 = socketio.start_background_task(get_specific(pond_num))

@cross_origin(supports_credentials=True)
@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app,debug=True,host='0.0.0.0')
