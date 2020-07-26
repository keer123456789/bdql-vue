## API 接口

###1.查询
#### 2.表格数据格式
```json
{
  "code":"20000",
  "data":{
    "field": ["field1","field2","field3"],
    "total": 20,
    "data": [
      {
        "field1": "value1",
        "field2": "value2",
        "field3": "value3"
      },
      {
        "field1": "value1",
        "field2": "value2",
        "field3": "value3"
      },
      {
        "field1": "value1",
        "field2": "value2",
        "field3": "value3"
      }      
    ]
  } 
}
```